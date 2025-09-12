# Django Admin Configuration for Hospital Management System

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_type', 'is_staff')
    list_filter = ('user_type', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('user_type', 'phone', 'address')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('user_type', 'phone', 'address')}),
    )

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name',)

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'department', 'is_available', 'consultation_fee')
    list_filter = ('specialization', 'department', 'is_available')
    search_fields = ('user__first_name', 'user__last_name', 'license_number')

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'blood_group', 'emergency_contact')
    search_fields = ('user__first_name', 'user__last_name', 'user__email')

@admin.register(Admin)
class AdminModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'employee_id', 'department')
    search_fields = ('user__first_name', 'user__last_name', 'employee_id')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'department', 'appointment_date', 'appointment_time', 'status')
    list_filter = ('status', 'department', 'appointment_date')
    search_fields = ('patient__user__first_name', 'patient__user__last_name', 'doctor__user__first_name')
    date_hierarchy = 'appointment_date'

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'created_at', 'next_visit')
    list_filter = ('created_at', 'next_visit')
    search_fields = ('patient__user__first_name', 'patient__user__last_name', 'diagnosis')

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'total_amount', 'payment_status', 'created_at')
    list_filter = ('payment_status', 'created_at')
    search_fields = ('patient__user__first_name', 'patient__user__last_name')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'notification_type', 'title', 'is_read', 'email_sent', 'sms_sent', 'created_at')
    list_filter = ('notification_type', 'is_read', 'email_sent', 'sms_sent')
    search_fields = ('recipient__first_name', 'recipient__last_name', 'title')

# Register the custom user admin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)