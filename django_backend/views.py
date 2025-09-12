# Django Views for Hospital Management System

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.conf import settings
import json
from datetime import datetime, date
from twilio.rest import Client

from .models import *
from .serializers import *

# Authentication Views
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_type': user.user_type,
            'email': user.email,
            'name': f"{user.first_name} {user.last_name}"
        })

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        data = request.data
        user_type = data.get('userType', 'patient')
        
        # Create user
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data['firstName'],
            last_name=data['lastName'],
            user_type=user_type,
            phone=data.get('phone', ''),
            address=data.get('address', '')
        )
        
        # Create role-specific profile
        if user_type == 'patient':
            Patient.objects.create(
                user=user,
                emergency_contact=data.get('emergencyContact', '')
            )
        elif user_type == 'doctor':
            department, _ = Department.objects.get_or_create(name=data['specialization'])
            Doctor.objects.create(
                user=user,
                specialization=data['specialization'],
                license_number=data['licenseNumber'],
                experience_years=int(data['experience']),
                department=department
            )
        elif user_type == 'admin':
            Admin.objects.create(
                user=user,
                employee_id=data['employeeId'],
                department=data['department']
            )
        
        return Response({'message': 'User registered successfully'}, status=201)
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Appointment Views
@api_view(['POST'])
@permission_classes([AllowAny])
def create_appointment(request):
    try:
        data = request.data
        
        # Get or create patient
        user_email = data['email']
        try:
            user = User.objects.get(email=user_email)
            patient = Patient.objects.get(user=user)
        except User.DoesNotExist:
            # Create guest patient
            user = User.objects.create_user(
                username=user_email,
                email=user_email,
                password='temp123',  # Temporary password
                first_name=data['name'].split()[0],
                last_name=' '.join(data['name'].split()[1:]) if len(data['name'].split()) > 1 else '',
                user_type='patient',
                phone=data['phone'],
                address=data['address']
            )
            patient = Patient.objects.create(
                user=user,
                emergency_contact=data.get('emergencyContact', '')
            )
        
        # Get department
        department, _ = Department.objects.get_or_create(name=data['department'])
        
        # Create appointment
        appointment = Appointment.objects.create(
            patient=patient,
            department=department,
            preferred_doctor=data.get('doctor', ''),
            appointment_date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            appointment_time=datetime.strptime(data['time'], '%I:%M %p').time(),
            symptoms=data['symptoms'],
            status='pending'
        )
        
        # Send notification to admins
        send_appointment_notification(appointment, 'booking')
        
        return Response({
            'message': 'Appointment created successfully',
            'appointment_id': str(appointment.id)
        }, status=201)
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_appointment(request, appointment_id):
    try:
        appointment = get_object_or_404(Appointment, id=appointment_id)
        assigned_doctor_name = request.data.get('assigned_doctor')
        
        # Find doctor
        doctor = Doctor.objects.filter(
            user__first_name__icontains=assigned_doctor_name.split()[-1]
        ).first()
        
        if doctor:
            appointment.doctor = doctor
            appointment.status = 'approved'
            appointment.save()
            
            # Send notifications
            send_appointment_notification(appointment, 'approval')
            
            return Response({'message': 'Appointment approved successfully'})
        else:
            return Response({'error': 'Doctor not found'}, status=400)
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_appointment(request, appointment_id):
    try:
        appointment = get_object_or_404(Appointment, id=appointment_id)
        appointment.status = 'cancelled'
        appointment.save()
        
        # Send notification
        send_appointment_notification(appointment, 'rejection')
        
        return Response({'message': 'Appointment rejected'})
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_appointment(request, appointment_id):
    try:
        appointment = get_object_or_404(Appointment, id=appointment_id)
        appointment.status = 'completed'
        appointment.save()
        
        return Response({'message': 'Appointment marked as completed'})
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Bill Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bill(request):
    try:
        data = request.data
        appointment = get_object_or_404(Appointment, id=data['appointment_id'])
        
        # Create medical record
        medical_record = MedicalRecord.objects.create(
            patient=appointment.patient,
            doctor=appointment.doctor,
            appointment=appointment,
            diagnosis=data['diagnosis'],
            treatment=data['treatment']
        )
        
        # Create bill
        bill = Bill.objects.create(
            patient=appointment.patient,
            doctor=appointment.doctor,
            appointment=appointment,
            medical_record=medical_record,
            consultation_fee=float(data['consultation_fee']),
            medication_cost=float(data.get('medication_cost', 0)),
            test_cost=float(data.get('tests_cost', 0)),
            other_charges=float(data.get('other_charges', 0))
        )
        
        # Send bill notification
        send_bill_notification(bill)
        
        return Response({
            'message': 'Bill generated successfully',
            'bill_id': str(bill.id),
            'total_amount': float(bill.total_amount)
        })
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Dashboard Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    try:
        pending_appointments = Appointment.objects.filter(status='pending')
        approved_today = Appointment.objects.filter(
            status='approved',
            created_at__date=date.today()
        ).count()
        
        doctors = Doctor.objects.all()
        available_doctors = doctors.filter(is_available=True).count()
        
        return Response({
            'pending_appointments': AppointmentSerializer(pending_appointments, many=True).data,
            'stats': {
                'pending_count': pending_appointments.count(),
                'approved_today': approved_today,
                'total_doctors': doctors.count(),
                'available_doctors': available_doctors
            }
        })
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def doctor_dashboard(request):
    try:
        doctor = Doctor.objects.get(user=request.user)
        today_appointments = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=date.today()
        )
        
        return Response({
            'appointments': AppointmentSerializer(today_appointments, many=True).data,
            'stats': {
                'total_today': today_appointments.count(),
                'completed': today_appointments.filter(status='completed').count(),
                'scheduled': today_appointments.filter(status='approved').count()
            }
        })
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def patient_dashboard(request):
    try:
        patient = Patient.objects.get(user=request.user)
        appointments = Appointment.objects.filter(patient=patient)
        bills = Bill.objects.filter(patient=patient)
        
        return Response({
            'appointments': AppointmentSerializer(appointments, many=True).data,
            'bills': BillSerializer(bills, many=True).data,
            'stats': {
                'upcoming': appointments.filter(status='approved', appointment_date__gte=date.today()).count(),
                'pending': appointments.filter(status='pending').count(),
                'completed': appointments.filter(status='completed').count(),
                'unpaid_bills': bills.filter(payment_status='pending').count()
            }
        })
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Notification Functions
def send_appointment_notification(appointment, notification_type):
    """Send email and SMS notifications for appointments"""
    try:
        patient_email = appointment.patient.user.email
        patient_phone = appointment.patient.user.phone
        
        if notification_type == 'booking':
            subject = 'Appointment Booking Confirmation'
            message = f"Your appointment has been booked for {appointment.appointment_date} at {appointment.appointment_time}. Waiting for admin approval."
        elif notification_type == 'approval':
            subject = 'Appointment Approved'
            message = f"Your appointment with {appointment.doctor} on {appointment.appointment_date} at {appointment.appointment_time} has been approved."
        elif notification_type == 'rejection':
            subject = 'Appointment Cancelled'
            message = f"Your appointment for {appointment.appointment_date} has been cancelled. Please contact us for rescheduling."
        
        # Send Email
        if patient_email:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [patient_email],
                fail_silently=True,
            )
        
        # Send SMS via Twilio
        if patient_phone and hasattr(settings, 'TWILIO_ACCOUNT_SID'):
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(
                body=message,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=patient_phone
            )
        
        # Create notification record
        Notification.objects.create(
            recipient=appointment.patient.user,
            notification_type=f'appointment_{notification_type}',
            title=subject,
            message=message,
            email_sent=bool(patient_email),
            sms_sent=bool(patient_phone)
        )
        
    except Exception as e:
        print(f"Notification error: {e}")

def send_bill_notification(bill):
    """Send bill notification via email and SMS"""
    try:
        patient_email = bill.patient.user.email
        patient_phone = bill.patient.user.phone
        
        subject = 'Medical Bill Generated'
        message = f"Your medical bill for ${bill.total_amount} has been generated. Please log into your account to view details and make payment."
        
        # Send Email
        if patient_email:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [patient_email],
                fail_silently=True,
            )
        
        # Send SMS
        if patient_phone and hasattr(settings, 'TWILIO_ACCOUNT_SID'):
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(
                body=message,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=patient_phone
            )
        
        # Create notification record
        Notification.objects.create(
            recipient=bill.patient.user,
            notification_type='bill_generated',
            title=subject,
            message=message,
            email_sent=bool(patient_email),
            sms_sent=bool(patient_phone)
        )
        
    except Exception as e:
        print(f"Bill notification error: {e}")