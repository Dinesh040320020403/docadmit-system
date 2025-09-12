import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Stethoscope, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  department: string;
  preferredDoctor: string;
  date: string;
  time: string;
  symptoms: string;
  status: "pending" | "approved" | "rejected";
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientEmail: "john@example.com",
      patientPhone: "+1234567890",
      department: "Cardiology",
      preferredDoctor: "Dr. Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      symptoms: "Chest pain and shortness of breath",
      status: "pending"
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientEmail: "jane@example.com",
      patientPhone: "+1234567891",
      department: "Dermatology",
      preferredDoctor: "",
      date: "2024-01-16",
      time: "02:00 PM",
      symptoms: "Skin rash and itching",
      status: "pending"
    }
  ]);

  const [doctors] = useState([
    { id: "1", name: "Dr. Smith", specialization: "Cardiology", available: true },
    { id: "2", name: "Dr. Johnson", specialization: "Dermatology", available: true },
    { id: "3", name: "Dr. Brown", specialization: "Neurology", available: false },
  ]);

  const { toast } = useToast();

  const handleApproveAppointment = async (appointmentId: string, assignedDoctor: string) => {
    try {
      // This would be your Django API call
      const response = await fetch(`/api/appointments/${appointmentId}/approve/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ assigned_doctor: assignedDoctor })
      });

      if (response.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: "approved" as const, preferredDoctor: assignedDoctor }
              : apt
          )
        );

        toast({
          title: "Appointment Approved",
          description: "Patient will be notified via email and SMS",
        });
      }
    } catch (error) {
      // Simulate approval for demo
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: "approved" as const, preferredDoctor: assignedDoctor }
            : apt
        )
      );

      toast({
        title: "Appointment Approved",
        description: "Patient will be notified via email and SMS",
      });
    }
  };

  const handleRejectAppointment = async (appointmentId: string) => {
    try {
      // This would be your Django API call
      const response = await fetch(`/api/appointments/${appointmentId}/reject/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: "rejected" as const }
              : apt
          )
        );

        toast({
          title: "Appointment Rejected",
          description: "Patient will be notified",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Simulate rejection for demo
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: "rejected" as const }
            : apt
        )
      );

      toast({
        title: "Appointment Rejected",
        description: "Patient will be notified",
        variant: "destructive"
      });
    }
  };

  const pendingCount = appointments.filter(apt => apt.status === "pending").length;
  const approvedCount = appointments.filter(apt => apt.status === "approved").length;
  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(doc => doc.available).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage appointments and hospital operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableDoctors}/{totalDoctors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Management */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Requests</CardTitle>
            <CardDescription>
              Review and approve patient appointment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="border">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                          <Badge 
                            variant={
                              appointment.status === "pending" ? "secondary" : 
                              appointment.status === "approved" ? "default" : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>📧 {appointment.patientEmail}</p>
                          <p>📞 {appointment.patientPhone}</p>
                          <p>🏥 {appointment.department}</p>
                          <p>📅 {appointment.date} at {appointment.time}</p>
                        </div>
                        <p className="text-sm"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                        {appointment.preferredDoctor && (
                          <p className="text-sm"><strong>Preferred Doctor:</strong> {appointment.preferredDoctor}</p>
                        )}
                      </div>

                      {appointment.status === "pending" && (
                        <div className="flex flex-col space-y-2 lg:w-64">
                          <Select onValueChange={(doctorName) => handleApproveAppointment(appointment.id, doctorName)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Assign Doctor & Approve" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctors
                                .filter(doc => doc.available)
                                .filter(doc => doc.specialization === appointment.department)
                                .map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.name}>
                                  {doctor.name} ({doctor.specialization})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectAppointment(appointment.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;