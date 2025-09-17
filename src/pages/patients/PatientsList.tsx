import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { filterPatientData, getUserPermissions, canAccessData, maskSensitiveData, type UserRole } from "@/utils/accessControl";
import { 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Heart,
  Activity,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  User,
  Cake,
  Shield
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodType: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  emergencyContact: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  lastVisit: string;
  nextAppointment: string;
  status: "active" | "inactive" | "critical";
  insuranceProvider: string;
  insuranceNumber: string;
  primaryDoctor: string;
  conditions: string[];
  address: string;
}

const PatientsList = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('admin');
  const [currentUserId, setCurrentUserId] = useState<string>('admin-1');
  
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Smith",
      age: 45,
      gender: "Male",
      bloodType: "O+",
      image: "/api/placeholder/150/150",
      location: "New York, NY",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      emergencyContact: "+1 (555) 987-6543 (Jane Smith)",
      medicalHistory: ["Hypertension", "Diabetes Type 2", "High Cholesterol"],
      allergies: ["Penicillin", "Shellfish"],
      currentMedications: ["Metformin", "Lisinopril", "Atorvastatin"],
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-15",
      status: "active",
      insuranceProvider: "Blue Cross Blue Shield",
      insuranceNumber: "BC123456789",
      primaryDoctor: "Dr. Sarah Johnson",
      conditions: ["Hypertension", "Diabetes Type 2"]
    },
    {
      id: "2",
      name: "Emily Davis",
      age: 32,
      gender: "Female",
      bloodType: "A-",
      image: "/api/placeholder/150/150",
      location: "Los Angeles, CA",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      phone: "+1 (555) 234-5678",
      email: "emily.davis@email.com",
      emergencyContact: "+1 (555) 876-5432 (Mike Davis)",
      medicalHistory: ["Asthma", "Seasonal Allergies"],
      allergies: ["Pollen", "Dust Mites"],
      currentMedications: ["Albuterol Inhaler", "Fluticasone"],
      lastVisit: "2024-01-08",
      nextAppointment: "2024-02-20",
      status: "active",
      insuranceProvider: "Aetna",
      insuranceNumber: "AET987654321",
      primaryDoctor: "Dr. Michael Chen",
      conditions: ["Asthma"]
    },
    {
      id: "3",
      name: "Robert Johnson",
      age: 67,
      gender: "Male",
      bloodType: "B+",
      image: "/api/placeholder/150/150",
      location: "Chicago, IL",
      address: "789 Pine St, Chicago, IL 60601",
      phone: "+1 (555) 345-6789",
      email: "robert.johnson@email.com",
      emergencyContact: "+1 (555) 765-4321 (Mary Johnson)",
      medicalHistory: ["Heart Disease", "Arthritis", "High Blood Pressure"],
      allergies: ["None"],
      currentMedications: ["Aspirin", "Metoprolol", "Ibuprofen"],
      lastVisit: "2024-01-05",
      nextAppointment: "2024-01-25",
      status: "critical",
      insuranceProvider: "Medicare",
      insuranceNumber: "MED123456789",
      primaryDoctor: "Dr. James Wilson",
      conditions: ["Heart Disease", "Arthritis"]
    },
    {
      id: "4",
      name: "Sarah Wilson",
      age: 28,
      gender: "Female",
      bloodType: "AB+",
      image: "/api/placeholder/150/150",
      location: "Miami, FL",
      address: "321 Beach Blvd, Miami, FL 33101",
      phone: "+1 (555) 456-7890",
      email: "sarah.wilson@email.com",
      emergencyContact: "+1 (555) 654-3210 (Tom Wilson)",
      medicalHistory: ["Migraine", "Anxiety"],
      allergies: ["Sulfa Drugs"],
      currentMedications: ["Sumatriptan", "Sertraline"],
      lastVisit: "2024-01-12",
      nextAppointment: "2024-02-10",
      status: "active",
      insuranceProvider: "Cigna",
      insuranceNumber: "CIG456789123",
      primaryDoctor: "Dr. Emily Rodriguez",
      conditions: ["Migraine", "Anxiety"]
    },
    {
      id: "5",
      name: "Michael Brown",
      age: 55,
      gender: "Male",
      bloodType: "O-",
      image: "/api/placeholder/150/150",
      location: "Seattle, WA",
      address: "654 Cedar Way, Seattle, WA 98101",
      phone: "+1 (555) 567-8901",
      email: "michael.brown@email.com",
      emergencyContact: "+1 (555) 543-2109 (Lisa Brown)",
      medicalHistory: ["Prostate Cancer", "Depression"],
      allergies: ["Latex"],
      currentMedications: ["Tamoxifen", "Fluoxetine"],
      lastVisit: "2024-01-03",
      nextAppointment: "2024-01-30",
      status: "active",
      insuranceProvider: "Kaiser Permanente",
      insuranceNumber: "KP789123456",
      primaryDoctor: "Dr. Lisa Park",
      conditions: ["Prostate Cancer", "Depression"]
    },
    {
      id: "6",
      name: "Jennifer Taylor",
      age: 41,
      gender: "Female",
      bloodType: "A+",
      image: "/api/placeholder/150/150",
      location: "Boston, MA",
      address: "987 Elm St, Boston, MA 02101",
      phone: "+1 (555) 678-9012",
      email: "jennifer.taylor@email.com",
      emergencyContact: "+1 (555) 432-1098 (David Taylor)",
      medicalHistory: ["Thyroid Disorder", "Osteoporosis"],
      allergies: ["Iodine"],
      currentMedications: ["Levothyroxine", "Calcium", "Vitamin D"],
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-05",
      status: "inactive",
      insuranceProvider: "UnitedHealth",
      insuranceNumber: "UHC321654987",
      primaryDoctor: "Dr. Robert Taylor",
      conditions: ["Thyroid Disorder", "Osteoporosis"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Detect user role from localStorage
  useEffect(() => {
    const userType = localStorage.getItem('userType') as UserRole;
    const userId = localStorage.getItem('userId');
    if (userType) {
      setCurrentUserRole(userType);
    }
    if (userId) {
      setCurrentUserId(userId);
    }
  }, []);

  // Check if user has access to view all patients
  const canViewAllPatients = canAccessData('allPatients', currentUserRole);
  const canViewFinancialData = canAccessData('financialData', currentUserRole);
  const canViewPersonalInfo = getUserPermissions(currentUserRole).canViewPersonalInfo;

  // Filter patients based on user role
  const getFilteredPatients = () => {
    if (currentUserRole === 'admin') {
      return patients; // Admin can see all patients
    }
    
    if (currentUserRole === 'doctor') {
      // Doctors can only see their assigned patients
      return patients.filter(patient => 
        patient.primaryDoctor === 'Dr. Current User' || // Replace with actual doctor name
        patient.id === currentUserId
      );
    }
    
    if (currentUserRole === 'patient') {
      // Patients can only see their own data
      return patients.filter(patient => patient.id === currentUserId);
    }
    
    return []; // No access
  };

  const filteredPatients = getFilteredPatients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive": return <Clock className="h-4 w-4 text-gray-500" />;
      case "critical": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAgeGroup = (age: number) => {
    if (age < 18) return "Pediatric";
    if (age < 30) return "Young Adult";
    if (age < 50) return "Adult";
    if (age < 65) return "Middle Age";
    return "Senior";
  };

  const searchFilteredPatients = filteredPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.primaryDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
    const matchesAgeGroup = selectedAgeGroup === "all" || getAgeGroup(patient.age) === selectedAgeGroup;
    
    return matchesSearch && matchesStatus && matchesAgeGroup;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Patient Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive patient records and medical history management 
            for better healthcare outcomes.
          </p>
          
          {/* Access Control Warning */}
          {!canViewAllPatients && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Limited Access</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                You can only view patients assigned to you. Contact an administrator for full access.
              </p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search patients, doctors, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="Pediatric">Pediatric (0-17)</SelectItem>
                <SelectItem value="Young Adult">Young Adult (18-29)</SelectItem>
                <SelectItem value="Adult">Adult (30-49)</SelectItem>
                <SelectItem value="Middle Age">Middle Age (50-64)</SelectItem>
                <SelectItem value="Senior">Senior (65+)</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Patients</p>
                  <p className="text-3xl font-bold">{filteredPatients.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Patients</p>
                  <p className="text-3xl font-bold">{filteredPatients.filter(p => p.status === "active").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Critical Cases</p>
                  <p className="text-3xl font-bold">{filteredPatients.filter(p => p.status === "critical").length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Upcoming Appointments</p>
                  <p className="text-3xl font-bold">{filteredPatients.filter(p => p.nextAppointment).length}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFilteredPatients.map((patient) => {
            // Apply data filtering based on user role
            const filteredPatient = filterPatientData(patient, currentUserRole, currentUserId);
            
            return (
            <Card key={patient.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 ring-4 ring-green-100">
                      <AvatarImage src={patient.image} alt={patient.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-lg font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {filteredPatient.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{filteredPatient.age} years • {filteredPatient.gender}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {patient.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{canViewPersonalInfo ? patient.location : "Location Hidden"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span>Blood Type: {filteredPatient.bloodType || "Hidden"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span>{canViewFinancialData ? patient.insuranceProvider : "Insurance Hidden"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Current Conditions</h4>
                  <div className="flex flex-wrap gap-1">
                    {(filteredPatient.conditions || patient.conditions).slice(0, 2).map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                    {(filteredPatient.conditions || patient.conditions).length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{(filteredPatient.conditions || patient.conditions).length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl h-10 font-semibold"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{patient.name}</DialogTitle>
                        <DialogDescription className="text-lg text-green-600 font-medium">
                          {patient.age} years • {patient.gender} • {patient.bloodType}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={patient.image} alt={patient.name} />
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xl font-semibold">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              {getStatusIcon(patient.status)}
                              <Badge variant="outline">{patient.status}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{patient.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{patient.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Medical History</h3>
                            <ul className="space-y-1">
                              {patient.medicalHistory.map((condition, index) => (
                                <li key={index} className="text-gray-700 text-sm">• {condition}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
                            <ul className="space-y-1">
                              {patient.currentMedications.map((med, index) => (
                                <li key={index} className="text-gray-700 text-sm">• {med}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
                            <div className="flex flex-wrap gap-2">
                              {patient.allergies.length > 0 ? (
                                patient.allergies.map((allergy, index) => (
                                  <Badge key={index} variant="destructive">{allergy}</Badge>
                                ))
                              ) : (
                                <span className="text-gray-500 text-sm">No known allergies</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Insurance</h3>
                            <p className="text-gray-700 text-sm">{patient.insuranceProvider}</p>
                            <p className="text-gray-500 text-xs">Policy: {patient.insuranceNumber}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
                          <p className="text-gray-700">{patient.emergencyContact}</p>
                        </div>

                        <div className="flex space-x-4">
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl h-12 font-semibold">
                            <FileText className="h-4 w-4 mr-2" />
                            View Full Records
                          </Button>
                          <Button variant="outline" className="flex-1 rounded-xl h-12">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Visit
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl h-10 border-green-200 text-green-600 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {searchFilteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No patients found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
