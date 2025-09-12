# Django URLs for Hospital Management System

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# API URL patterns
urlpatterns = [
    # Authentication
    path('api/auth/login/', views.CustomAuthToken.as_view(), name='api_token_auth'),
    path('api/auth/register/', views.register_user, name='register_user'),
    
    # Appointments
    path('api/appointments/', views.create_appointment, name='create_appointment'),
    path('api/appointments/<uuid:appointment_id>/approve/', views.approve_appointment, name='approve_appointment'),
    path('api/appointments/<uuid:appointment_id>/reject/', views.reject_appointment, name='reject_appointment'),
    path('api/appointments/<uuid:appointment_id>/complete/', views.complete_appointment, name='complete_appointment'),
    
    # Bills
    path('api/bills/', views.create_bill, name='create_bill'),
    
    # Dashboards
    path('api/dashboard/admin/', views.admin_dashboard, name='admin_dashboard'),
    path('api/dashboard/doctor/', views.doctor_dashboard, name='doctor_dashboard'),
    path('api/dashboard/patient/', views.patient_dashboard, name='patient_dashboard'),
]