# Django Models for Hospital Management System

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import uuid

class User(AbstractUser):
    USER_TYPES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('admin', 'Admin'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='patient')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    experience_years = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    is_available = models.BooleanField(default=True)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)
    available_from = models.TimeField(null=True, blank=True)
    available_to = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Dr. {self.user.first_name} {self.user.last_name}"

class DoctorRating(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='ratings')
    patient = models.ForeignKey('Patient', on_delete=models.SET_NULL, null=True, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Rating {self.rating} for {self.doctor}"

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    emergency_contact = models.CharField(max_length=20, blank=True)
    blood_group = models.CharField(max_length=5, blank=True)
    medical_history = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"Admin {self.user.first_name} {self.user.last_name}"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    preferred_doctor = models.CharField(max_length=100, blank=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    symptoms = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Appointment {self.id} - {self.patient} with {self.doctor}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    diagnosis = models.TextField()
    treatment = models.TextField()
    prescription = models.TextField(blank=True)
    next_visit = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Medical Record - {self.patient} - {self.created_at.date()}"

class Bill(models.Model):
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('overdue', 'Overdue'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    medical_record = models.OneToOneField(MedicalRecord, on_delete=models.CASCADE)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    medication_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    test_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_charges = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    payment_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.total_amount = self.consultation_fee + self.medication_cost + self.test_cost + self.other_charges
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Bill {self.id} - {self.patient} - ${self.total_amount}"

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('appointment_booking', 'Appointment Booking'),
        ('appointment_approval', 'Appointment Approval'),
        ('appointment_reminder', 'Appointment Reminder'),
        ('bill_generated', 'Bill Generated'),
        ('payment_received', 'Payment Received'),
    ]
    
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    email_sent = models.BooleanField(default=False)
    sms_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification - {self.recipient} - {self.title}"