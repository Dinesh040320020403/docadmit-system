# Django Serializers for Hospital Management System

from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type', 'phone', 'address']
        extra_kwargs = {'password': {'write_only': True}}

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    rating_avg = serializers.FloatField(source='ratings__avg', read_only=True)
    rating_count = serializers.IntegerField(source='ratings__count', read_only=True)
    
    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialization', 'license_number', 'experience_years',
                 'department', 'department_name', 'is_available', 'consultation_fee',
                 'available_from', 'available_to', 'rating_avg', 'rating_count']

class DoctorRatingSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)

    class Meta:
        model = DoctorRating
        fields = ['id', 'rating', 'comment', 'patient_name', 'created_at']

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Patient
        fields = ['id', 'user', 'emergency_contact', 'blood_group', 'medical_history']

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Admin
        fields = ['id', 'user', 'employee_id', 'department']

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    patient_email = serializers.CharField(source='patient.user.email', read_only=True)
    patient_phone = serializers.CharField(source='patient.user.phone', read_only=True)
    patient_address = serializers.CharField(source='patient.user.address', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'patient_email', 'patient_phone', 'patient_address',
                 'doctor_name', 'department_name', 'preferred_doctor', 'appointment_date',
                 'appointment_time', 'symptoms', 'status', 'notes', 'created_at']

class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    
    class Meta:
        model = MedicalRecord
        fields = ['id', 'patient_name', 'doctor_name', 'diagnosis', 'treatment',
                 'prescription', 'next_visit', 'created_at']

class BillSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    appointment_date = serializers.DateField(source='appointment.appointment_date', read_only=True)
    
    class Meta:
        model = Bill
        fields = ['id', 'patient_name', 'doctor_name', 'appointment_date',
                 'consultation_fee', 'medication_cost', 'test_cost', 'other_charges',
                 'total_amount', 'payment_status', 'payment_date', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    recipient_name = serializers.CharField(source='recipient.get_full_name', read_only=True)
    
    class Meta:
        model = Notification
        fields = ['id', 'recipient_name', 'notification_type', 'title', 'message',
                 'is_read', 'email_sent', 'sms_sent', 'created_at']