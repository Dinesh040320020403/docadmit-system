import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  DollarSign, 
  Plus,
  Heart,
  Activity,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Bell,
  Settings,
  Search,
  Filter,
  Eye,
  Download,
  Share,
  BookOpen,
  Shield,
  Stethoscope,
  Pill,
  Thermometer,
  Zap
} from "lucide-react";

interface Appointment {
  id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  symptoms: string;
  doctorImage?: string;
  location: string;
  notes?: string;
}

interface Bill {
  id: string;
  appointmentId: string;
  doctor: string;
  date: string;
  diagnosis: string;
  treatment: string;
  amount: number;
  status: "paid" | "pending";
  dueDate: string;
}

interface HealthRecord {
  id: string;
  type: "blood_pressure" | "heart_rate" | "temperature" | "weight" | "height";
  value: string;
  unit: string;
  date: string;
  notes?: string;
}

const PatientDashboardNew = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "approved",
      symptoms: "Chest pain and shortness of breath",
      doctorImage: "/api/placeholder/150/150",
      location: "Main Hospital - Room 205",
      notes: "Regular follow-up appointment"
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      department: "Neurology",
      date: "2024-01-20",
      time: "02:00 PM",
      status: "pending",
      symptoms: "Headaches and dizziness",
      doctorImage: "/api/placeholder/150/150",
      location: "Main Hospital - Room 310"
    },
    {
      id: "3",
      doctor: "Dr. Emily Rodriguez",
      department: "Dermatology",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      symptoms: "Skin rash and itching",
      doctorImage: "/api/placeholder/150/150",
      location: "Main Hospital - Room 150",
      notes: "Treatment completed successfully"
    }
  ]);

  const [bills] = useState<Bill[]>([
    {
      id: "1",
      appointmentId: "3",
      doctor: "Dr. Emily Rodriguez",
      date: "2024-01-10",
      diagnosis: "Contact dermatitis - Allergic reaction to new soap",
      treatment: "Prescribed topical corticosteroid cream and antihistamines",
      amount: 150.00,
      status: "pending",
      dueDate: "2024-02-10"
    }
  ]);

  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: "1",
      type: "blood_pressure",
      value: "120/80",
      unit: "mmHg",
      date: "2024-01-15",
      notes: "Normal range"
    },
    {
      id: "2",
      type: "heart_rate",
      value: "72",
      unit: "bpm",
      date: "2024-01-15",
      notes: "Resting heart rate"
    },
    {
      id: "3",
      type: "temperature",
      value: "98.6",
      unit: "°F",
      date: "2024-01-15",
      notes: "Normal body temperature"
    },
    {
      id: "4",
      type: "weight",
      value: "165",
      unit: "lbs",
      date: "2024-01-15",
      notes: "Stable weight"
    }
  ]);

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === "approved" && new Date(apt.date) >= new Date()
  );
  const pendingAppointments = appointments.filter(apt => apt.status === "pending");
  const completedAppointments = appointments.filter(apt => apt.status === "completed");
  const unpaidBills = bills.filter(bill => bill.status === "pending");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "approved": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getHealthIcon = (type: string) => {
    switch (type) {
      case "blood_pressure": return <Activity className="h-5 w-5" />;
      case "heart_rate": return <Heart className="h-5 w-5" />;
      case "temperature": return <Thermometer className="h-5 w-5" />;
      case "weight": return <Zap className="h-5 w-5" />;
      case "height": return <TrendingUp className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Patient Dashboard
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Welcome back, John! Manage your health and appointments.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="rounded-xl">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Upcoming Appointments</p>
                  <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Completed Visits</p>
                  <p className="text-3xl font-bold">{completedAppointments.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Pending Approval</p>
                  <p className="text-3xl font-bold">{pendingAppointments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Unpaid Bills</p>
                  <p className="text-3xl font-bold">{unpaidBills.length}</p>
                </div>
                <DollarSign className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
            <CardDescription>Common tasks and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center space-y-2">
                <Plus className="h-6 w-6" />
                <span className="text-sm font-semibold">Book Appointment</span>
              </Button>
              <Button variant="outline" className="h-20 rounded-xl flex flex-col items-center space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-semibold">View Records</span>
              </Button>
              <Button variant="outline" className="h-20 rounded-xl flex flex-col items-center space-y-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                <DollarSign className="h-6 w-6" />
                <span className="text-sm font-semibold">Pay Bills</span>
              </Button>
              <Button variant="outline" className="h-20 rounded-xl flex flex-col items-center space-y-2 border-orange-200 text-orange-600 hover:bg-orange-50">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm font-semibold">Contact Doctor</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl">
            <TabsTrigger value="appointments" className="rounded-lg">Appointments</TabsTrigger>
            <TabsTrigger value="health" className="rounded-lg">Health Records</TabsTrigger>
            <TabsTrigger value="bills" className="rounded-lg">Bills & Payments</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-lg">Messages</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">My Appointments</CardTitle>
                    <CardDescription>Track your medical appointments and visits</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16 ring-4 ring-green-100">
                            <AvatarImage src={appointment.doctorImage} alt={appointment.doctor} />
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-lg font-semibold">
                              {appointment.doctor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                                <p className="text-blue-600 font-medium">{appointment.department}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${getStatusColor(appointment.status)}`}></div>
                                <Badge 
                                  variant={appointment.status === "pending" ? "secondary" : 
                                          appointment.status === "approved" ? "default" : 
                                          appointment.status === "completed" ? "outline" : "destructive"}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Symptoms</h4>
                              <p className="text-gray-700">{appointment.symptoms}</p>
                              {appointment.notes && (
                                <div className="mt-2">
                                  <h4 className="font-semibold text-gray-900 mb-1">Notes</h4>
                                  <p className="text-gray-700 text-sm">{appointment.notes}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" className="rounded-xl">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              {appointment.status === "approved" && (
                                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Add to Calendar
                                </Button>
                              )}
                              <Button variant="outline" className="rounded-xl">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Doctor
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Records Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Health Records</CardTitle>
                <CardDescription>Track your vital signs and health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthRecords.map((record) => (
                    <Card key={record.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            {getHealthIcon(record.type)}
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 capitalize mb-2">
                          {record.type.replace('_', ' ')}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {record.value} <span className="text-sm text-gray-500">{record.unit}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                        {record.notes && (
                          <p className="text-xs text-gray-500">{record.notes}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Record
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bills Tab */}
          <TabsContent value="bills" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Bills & Payments</CardTitle>
                <CardDescription>View and manage your medical bills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bills.length > 0 ? (
                    bills.map((bill) => (
                      <Card key={bill.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{bill.doctor}</h3>
                              <p className="text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">${bill.amount.toFixed(2)}</div>
                              <Badge 
                                variant={bill.status === "paid" ? "default" : "destructive"}
                                className="mt-1"
                              >
                                {bill.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">Diagnosis</h4>
                              <p className="text-gray-700 text-sm">{bill.diagnosis}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">Treatment</h4>
                              <p className="text-gray-700 text-sm">{bill.treatment}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Due Date: {new Date(bill.dueDate).toLocaleDateString()}</span>
                              <span>Bill ID: #{bill.id}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            {bill.status === "pending" && (
                              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                                <DollarSign className="h-4 w-4 mr-2" />
                                Pay Now
                              </Button>
                            )}
                            <Button variant="outline" className="rounded-xl">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" className="rounded-xl">
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <DollarSign className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No bills available</h3>
                      <p className="text-gray-500">Your medical bills will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Messages</CardTitle>
                <CardDescription>Communicate with your healthcare team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Messages Coming Soon</h3>
                  <p className="text-gray-500">Secure messaging with your doctors will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboardNew;

