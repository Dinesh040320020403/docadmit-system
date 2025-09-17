// Access Control Utilities for Role-Based Data Filtering

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface UserPermissions {
  canViewAllPatients: boolean;
  canViewAllDoctors: boolean;
  canViewAllAppointments: boolean;
  canViewFinancialData: boolean;
  canViewPersonalInfo: boolean;
  canViewMedicalHistory: boolean;
  canViewSystemReports: boolean;
  canManageUsers: boolean;
  canManageAppointments: boolean;
  canViewConfidentialNotes: boolean;
}

export interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  gender: string;
  bloodType: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: string;
  conditions: string[];
  confidentialNotes?: string;
  financialInfo?: {
    outstandingBills: number;
    paymentHistory: any[];
  };
  personalInfo?: {
    ssn?: string;
    dateOfBirth: string;
    maritalStatus: string;
  };
}

export interface DoctorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  rating: number;
  patientsCount: number;
  salary?: number;
  performanceMetrics?: any;
  personalInfo?: {
    address: string;
    emergencyContact: string;
    licenseNumber: string;
  };
}

export interface AppointmentData {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  symptoms: string;
  diagnosis?: string;
  treatment?: string;
  status: string;
  confidentialNotes?: string;
  billingInfo?: {
    amount: number;
    insuranceCoverage: number;
    patientPayment: number;
  };
}

// Get user permissions based on role
export const getUserPermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'admin':
      return {
        canViewAllPatients: true,
        canViewAllDoctors: true,
        canViewAllAppointments: true,
        canViewFinancialData: true,
        canViewPersonalInfo: true,
        canViewMedicalHistory: true,
        canViewSystemReports: true,
        canManageUsers: true,
        canManageAppointments: true,
        canViewConfidentialNotes: true,
      };
    case 'doctor':
      return {
        canViewAllPatients: false, // Only their patients
        canViewAllDoctors: false, // Only basic info
        canViewAllAppointments: false, // Only their appointments
        canViewFinancialData: false, // No financial data
        canViewPersonalInfo: true, // Only for their patients
        canViewMedicalHistory: true, // Only for their patients
        canViewSystemReports: false, // No system reports
        canManageUsers: false, // No user management
        canManageAppointments: true, // Only their appointments
        canViewConfidentialNotes: false, // No confidential notes
      };
    case 'patient':
      return {
        canViewAllPatients: false, // Only their own data
        canViewAllDoctors: true, // Can view doctor listings
        canViewAllAppointments: false, // Only their appointments
        canViewFinancialData: true, // Only their own bills
        canViewPersonalInfo: true, // Only their own
        canViewMedicalHistory: true, // Only their own
        canViewSystemReports: false, // No system reports
        canManageUsers: false, // No user management
        canManageAppointments: false, // Can only book, not manage
        canViewConfidentialNotes: false, // No confidential notes
      };
    default:
      return {
        canViewAllPatients: false,
        canViewAllDoctors: false,
        canViewAllAppointments: false,
        canViewFinancialData: false,
        canViewPersonalInfo: false,
        canViewMedicalHistory: false,
        canViewSystemReports: false,
        canManageUsers: false,
        canManageAppointments: false,
        canViewConfidentialNotes: false,
      };
  }
};

// Filter patient data based on user role and permissions
export const filterPatientData = (patient: PatientData, userRole: UserRole, requestingUserId?: string): Partial<PatientData> => {
  const permissions = getUserPermissions(userRole);
  
  const baseData = {
    id: patient.id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    bloodType: patient.bloodType,
    conditions: patient.conditions,
  };

  // Admin can see everything
  if (userRole === 'admin') {
    return patient;
  }

  // Doctor can see medical info for their patients
  if (userRole === 'doctor') {
    return {
      ...baseData,
      email: patient.email,
      phone: patient.phone,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      currentMedications: patient.currentMedications,
      emergencyContact: patient.emergencyContact,
      // No confidential notes, financial info, or personal details
    };
  }

  // Patient can only see their own data
  if (userRole === 'patient') {
    return {
      ...baseData,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      currentMedications: patient.currentMedications,
      insuranceProvider: patient.insuranceProvider,
      emergencyContact: patient.emergencyContact,
      // No confidential notes or detailed financial info
    };
  }

  return baseData;
};

// Filter doctor data based on user role
export const filterDoctorData = (doctor: DoctorData, userRole: UserRole): Partial<DoctorData> => {
  const permissions = getUserPermissions(userRole);
  
  const baseData = {
    id: doctor.id,
    name: doctor.name,
    specialization: doctor.specialization,
    experience: doctor.experience,
    rating: doctor.rating,
  };

  // Admin can see everything
  if (userRole === 'admin') {
    return doctor;
  }

  // Doctors and patients can see basic info
  if (userRole === 'doctor' || userRole === 'patient') {
    return {
      ...baseData,
      email: doctor.email,
      phone: doctor.phone,
      patientsCount: doctor.patientsCount,
      // No salary, performance metrics, or personal info
    };
  }

  return baseData;
};

// Filter appointment data based on user role
export const filterAppointmentData = (appointment: AppointmentData, userRole: UserRole, requestingUserId?: string): Partial<AppointmentData> => {
  const permissions = getUserPermissions(userRole);
  
  const baseData = {
    id: appointment.id,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
  };

  // Admin can see everything
  if (userRole === 'admin') {
    return appointment;
  }

  // Doctor can see their appointments with medical info
  if (userRole === 'doctor') {
    return {
      ...baseData,
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      symptoms: appointment.symptoms,
      diagnosis: appointment.diagnosis,
      treatment: appointment.treatment,
      // No confidential notes or billing info
    };
  }

  // Patient can see their appointments
  if (userRole === 'patient') {
    return {
      ...baseData,
      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      symptoms: appointment.symptoms,
      diagnosis: appointment.diagnosis,
      treatment: appointment.treatment,
      // No confidential notes or detailed billing info
    };
  }

  return baseData;
};

// Check if user can access specific data
export const canAccessData = (dataType: string, userRole: UserRole): boolean => {
  const permissions = getUserPermissions(userRole);
  
  switch (dataType) {
    case 'allPatients':
      return permissions.canViewAllPatients;
    case 'allDoctors':
      return permissions.canViewAllDoctors;
    case 'financialData':
      return permissions.canViewFinancialData;
    case 'systemReports':
      return permissions.canViewSystemReports;
    case 'userManagement':
      return permissions.canManageUsers;
    case 'confidentialNotes':
      return permissions.canViewConfidentialNotes;
    default:
      return false;
  }
};

// Mask sensitive information
export const maskSensitiveData = (data: string, userRole: UserRole): string => {
  if (userRole === 'admin') {
    return data; // Admin can see everything
  }
  
  // Mask phone numbers for non-admin users
  if (data.includes('+') && data.length > 10) {
    return data.replace(/(\+\d{1,3})\d{6,}/, '$1******');
  }
  
  // Mask email addresses for non-admin users
  if (data.includes('@')) {
    const [username, domain] = data.split('@');
    const maskedUsername = username.length > 2 
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  }
  
  return data;
};

// Get user's accessible data based on role
export const getAccessibleData = (dataType: 'patients' | 'doctors' | 'appointments', userRole: UserRole, allData: any[], requestingUserId?: string) => {
  if (userRole === 'admin') {
    return allData; // Admin can see everything
  }
  
  // Filter data based on role and permissions
  return allData.filter((item) => {
    if (userRole === 'doctor') {
      // Doctors can only see their own patients/appointments
      return requestingUserId ? item.doctorId === requestingUserId : false;
    }
    
    if (userRole === 'patient') {
      // Patients can only see their own data
      return requestingUserId ? item.patientId === requestingUserId : false;
    }
    
    return false;
  });
};

// Check if user is admin
export const isAdmin = (userRole: UserRole | null): boolean => {
  return userRole === 'admin';
};

// Check if user can access admin features
export const canAccessAdminFeatures = (userRole: UserRole | null): boolean => {
  return isAdmin(userRole);
};

// Check if admin links should be visible in navigation
export const shouldShowAdminLinks = (isLoggedIn: boolean, userRole: UserRole | null): boolean => {
  // Show admin login link when not logged in (for admin login access)
  // Show admin dashboard link only when logged in as admin
  return !isLoggedIn || isAdmin(userRole);
};

// Get user role from localStorage
export const getUserRole = (): UserRole | null => {
  const role = localStorage.getItem('userType');
  return role as UserRole | null;
};

// Check if current user has admin privileges
export const hasAdminPrivileges = (): boolean => {
  const userRole = getUserRole();
  const token = localStorage.getItem('token');
  return isAdmin(userRole) && !!token;
};

