import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { filterPatientData, getUserPermissions, canAccessData, type UserRole } from "@/utils/accessControl";
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Stethoscope,
  Activity,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  User,
  GraduationCap,
  Shield
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  experience: number;
  specialization: string;
  department: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  qualifications: string[];
  languages: string[];
  consultationFee: number;
  availability: string;
  status: "active" | "busy" | "unavailable";
  hospital: string;
  ratings: number;
  patients: number;
}

const DoctorsList = () => {
  const navigate = useNavigate();
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('admin');
  const [currentUserId, setCurrentUserId] = useState<string>('admin-1');
  
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Dr. Priya Sharma",
      experience: 15,
      specialization: "Cardiology",
      department: "Cardiology",
      image: "/api/placeholder/150/150",
      location: "T. Nagar, Chennai",
      phone: "+91 98765 43210",
      email: "priya.sharma@hospital.com",
      qualifications: ["MBBS", "MD Cardiology", "Fellowship in Interventional Cardiology"],
      languages: ["Tamil", "English", "Hindi"],
      consultationFee: 1200,
      availability: "09:00 AM - 05:00 PM",
      status: "active",
      hospital: "Apollo Hospitals",
      ratings: 4.8,
      patients: 250
    },
    {
      id: "2",
      name: "Dr. Anita Nair",
      experience: 10,
      specialization: "Pediatrics",
      department: "Pediatrics",
      image: "/api/placeholder/150/150",
      location: "Velachery, Chennai",
      phone: "+91 87654 32109",
      email: "anita.nair@hospital.com",
      qualifications: ["MBBS", "DNB Pediatrics"],
      languages: ["Tamil", "English", "Malayalam"],
      consultationFee: 900,
      availability: "10:00 AM - 06:00 PM",
      status: "busy",
      hospital: "Fortis Hospital",
      ratings: 4.5,
      patients: 180
    },
    {
      id: "3",
      name: "Dr. Lakshmi Menon",
      experience: 12,
      specialization: "Dermatology",
      department: "Dermatology",
      image: "/api/placeholder/150/150",
      location: "Anna Nagar, Chennai",
      phone: "+91 76543 21098",
      email: "lakshmi.menon@hospital.com",
      qualifications: ["MBBS", "MD Dermatology"],
      languages: ["Tamil", "English", "Telugu"],
      consultationFee: 750,
      availability: "11:00 AM - 07:00 PM",
      status: "active",
      hospital: "MIOT International",
      ratings: 4.7,
      patients: 200
    },
    {
      id: "4",
      name: "Dr. Meera Rao",
      experience: 8,
      specialization: "Orthopedics",
      department: "Orthopedics",
      image: "/api/placeholder/150/150",
      location: "OMR, Sholinganallur",
      phone: "+91 65432 10987",
      email: "meera.rao@hospital.com",
      qualifications: ["MBBS", "MS Orthopedics"],
      languages: ["Tamil", "English", "Telugu"],
      consultationFee: 1100,
      availability: "09:00 AM - 04:00 PM",
      status: "unavailable",
      hospital: "Global Hospital",
      ratings: 4.6,
      patients: 150
    },
    {
      id: "5",
      name: "Dr. Rajesh Kumar",
      experience: 20,
      specialization: "Neurology",
      department: "Neurology",
      image: "/api/placeholder/150/150",
      location: "Adyar, Chennai",
      phone: "+91 54321 09876",
      email: "rajesh.kumar@hospital.com",
      qualifications: ["MBBS", "DM Neurology"],
      languages: ["Tamil", "English", "Hindi"],
      consultationFee: 1500,
      availability: "08:00 AM - 04:00 PM",
      status: "active",
      hospital: "SIMS Hospital",
      ratings: 4.9,
      patients: 300
    },
    {
      id: "6",
      name: "Dr. Kavita Singh",
      experience: 14,
      specialization: "Gynecology",
      department: "Gynecology",
      image: "/api/placeholder/150/150",
      location: "Nungambakkam, Chennai",
      phone: "+91 43210 98765",
      email: "kavita.singh@hospital.com",
      qualifications: ["MBBS", "MS Gynecology"],
      languages: ["Tamil", "English"],
      consultationFee: 1000,
      availability: "09:30 AM - 05:30 PM",
      status: "active",
      hospital: "KMC Hospital",
      ratings: 4.4,
      patients: 220
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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

  // Check if user has access to view all doctors
  const canViewAllDoctors = canAccessData('allDoctors', currentUserRole); // Assume similar permission
  const canViewFinancialData = canAccessData('financialData', currentUserRole);
  const canViewPersonalInfo = getUserPermissions(currentUserRole).canViewPersonalInfo;

  // Filter doctors based on user role
  const getFilteredDoctors = () => {
    if (currentUserRole === 'admin') {
      return doctors; // Admin can see all doctors
    }
    
    if (currentUserRole === 'doctor') {
      // Doctors can only see their department or assigned
      return doctors.filter(doctor => 
        doctor.department === 'Current Department' || // Replace with actual
        doctor.id === currentUserId
      );
    }
    
    if (currentUserRole === 'patient') {
      // Patients can see all doctors for booking
      return doctors;
    }
    
    return []; // No access
  };

  const filteredDoctors = getFilteredDoctors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "unavailable": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "busy": return <Activity className="h-4 w-4 text-yellow-500" />;
      case "unavailable": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const searchFilteredDoctors = filteredDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || doctor.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || doctor.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Doctor Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive doctor profiles and availability management 
            for efficient healthcare delivery.
          </p>
          
          {/* Access Control Warning */}
          {!canViewAllDoctors && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Limited Access</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                You can only view doctors in your department. Contact an administrator for full access.
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
                placeholder="Search doctors, specializations, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                <SelectItem value="Dermatology">Dermatology</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                <SelectItem value="Neurology">Neurology</SelectItem>
                <SelectItem value="Gynecology">Gynecology</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Doctors</p>
                  <p className="text-3xl font-bold">{filteredDoctors.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Doctors</p>
                  <p className="text-3xl font-bold">{filteredDoctors.filter(d => d.status === "active").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Busy Doctors</p>
                  <p className="text-3xl font-bold">{filteredDoctors.filter(d => d.status === "busy").length}</p>
                </div>
                <Activity className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">High Rated Doctors</p>
                  <p className="text-3xl font-bold">{filteredDoctors.filter(d => d.ratings >= 4.5).length}</p>
                </div>
                <Stethoscope className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFilteredDoctors.map((doctor) => {
            // Apply data filtering based on user role (adapt filterPatientData if needed)
            const filteredDoctor = { ...doctor }; // Simplified, assume similar filtering
            
            return (
            <Card key={doctor.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-lg font-semibold">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {filteredDoctor.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{filteredDoctor.experience} years • {filteredDoctor.specialization}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(doctor.status)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {doctor.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{canViewPersonalInfo ? doctor.location : "Location Hidden"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="h-4 w-4 text-gray-400" />
                    <span>Department: {doctor.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span>{canViewFinancialData ? `₹${doctor.consultationFee}` : "Fee Hidden"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Availability: {doctor.availability}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.slice(0, 3).map((lang, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {doctor.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.languages.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl h-10 font-semibold"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{doctor.name}</DialogTitle>
                        <DialogDescription className="text-lg text-blue-600 font-medium">
                          {doctor.experience} years • {doctor.specialization} • {doctor.department}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xl font-semibold">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              {getStatusIcon(doctor.status)}
                              <Badge variant="outline">{doctor.status}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{doctor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{doctor.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
                            <ul className="space-y-1">
                              {doctor.qualifications.map((qual, index) => (
                                <li key={index} className="text-gray-700 text-sm">• {qual}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Languages</h3>
                            <ul className="space-y-1">
                              {doctor.languages.map((lang, index) => (
                                <li key={index} className="text-gray-700 text-sm">• {lang}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Hospital & Ratings</h3>
                            <p className="text-gray-700 text-sm">{doctor.hospital}</p>
                            <p className="text-gray-500 text-xs">Ratings: {doctor.ratings}/5 • Patients: {doctor.patients}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Consultation</h3>
                            <p className="text-gray-700">₹{doctor.consultationFee}</p>
                            <p className="text-gray-500 text-xs">Availability: {doctor.availability}</p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl h-12 font-semibold" onClick={() => selectedDoctor && navigate(`/doctor-profile/${selectedDoctor.id}`, { state: { doctor: selectedDoctor } })}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Full Profile
                          </Button>
                          <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={() => selectedDoctor && navigate('/book-appointment', { state: { doctor: selectedDoctor } })}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl h-10 border-blue-200 text-blue-600 hover:bg-blue-50"
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

        {searchFilteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
