import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, FileText, DollarSign, Plus } from "lucide-react";

interface Appointment {
  id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  symptoms: string;
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
}

const PatientDashboard = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctor: "Dr. Smith",
      department: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "approved",
      symptoms: "Chest pain and shortness of breath"
    },
    {
      id: "2",
      doctor: "Dr. Johnson",
      department: "Dermatology",
      date: "2024-01-20",
      time: "02:00 PM",
      status: "pending",
      symptoms: "Skin rash and itching"
    },
    {
      id: "3",
      doctor: "Dr. Brown",
      department: "General Medicine",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      symptoms: "Regular checkup"
    }
  ]);

  const [bills] = useState<Bill[]>([
    {
      id: "1",
      appointmentId: "3",
      doctor: "Dr. Brown",
      date: "2024-01-10",
      diagnosis: "General health checkup - All vitals normal",
      treatment: "Routine examination, blood pressure check, basic blood tests",
      amount: 150.00,
      status: "pending"
    }
  ]);

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === "approved" && new Date(apt.date) >= new Date()
  );
  const pendingAppointments = appointments.filter(apt => apt.status === "pending");
  const completedAppointments = appointments.filter(apt => apt.status === "completed");
  const unpaidBills = bills.filter(bill => bill.status === "pending");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground">Manage your appointments and medical records</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="flex items-center space-x-2">
                  <Link to="/book-appointment">
                    <Plus className="h-4 w-4" />
                    <span>Book New Appointment</span>
                  </Link>
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Medical Records
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Bills Online
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Visits</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unpaid Bills</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unpaidBills.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>
                Your upcoming and recent medical appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold">{appointment.doctor}</p>
                        <Badge 
                          variant={
                            appointment.status === "pending" ? "secondary" : 
                            appointment.status === "approved" ? "default" : 
                            appointment.status === "completed" ? "outline" : "destructive"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.department}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <div className="text-right">
                      {appointment.status === "approved" && (
                        <Badge variant="default" className="bg-success">
                          Confirmed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medical Bills */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Bills</CardTitle>
              <CardDescription>
                Your recent medical bills and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <div key={bill.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold">{bill.doctor}</p>
                          <Badge 
                            variant={bill.status === "paid" ? "default" : "secondary"}
                          >
                            {bill.status}
                          </Badge>
                        </div>
                        <p className="font-semibold text-lg">${bill.amount.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Date: {bill.date}
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Diagnosis:</strong> {bill.diagnosis}
                      </p>
                      <p className="text-sm mb-3">
                        <strong>Treatment:</strong> {bill.treatment}
                      </p>
                      {bill.status === "pending" && (
                        <Button size="sm" className="w-full">
                          Pay Now
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bills available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;