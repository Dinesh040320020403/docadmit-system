import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, User, Phone, MapPin, FileText, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAddress: string;
  date: string;
  time: string;
  symptoms: string;
  status: "scheduled" | "completed" | "cancelled";
  diagnosis?: string;
  treatment?: string;
  billAmount?: number;
}

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientEmail: "john@example.com",
      patientPhone: "+1234567890",
      patientAddress: "123 Main St, City, State 12345",
      date: "2024-01-15",
      time: "10:00 AM",
      symptoms: "Chest pain and shortness of breath",
      status: "scheduled"
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientEmail: "jane@example.com",
      patientPhone: "+1234567891",
      patientAddress: "456 Oak Ave, City, State 12345",
      date: "2024-01-15",
      time: "11:00 AM",
      symptoms: "Skin rash and itching",
      status: "scheduled"
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [billForm, setBillForm] = useState({
    diagnosis: "",
    treatment: "",
    consultationFee: "",
    medicationCost: "",
    testsCost: "",
    totalAmount: ""
  });

  const { toast } = useToast();

  const handleCompleteAppointment = async (appointmentId: string) => {
    try {
      // This would be your Django API call
      const response = await fetch(`/api/appointments/${appointmentId}/complete/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: "completed" as const }
              : apt
          )
        );

        toast({
          title: "Appointment Completed",
          description: "Patient has been marked as treated",
        });
      }
    } catch (error) {
      // Simulate completion for demo
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: "completed" as const }
            : apt
        )
      );

      toast({
        title: "Appointment Completed",
        description: "Patient has been marked as treated",
      });
    }
  };

  const handleGenerateBill = async (appointmentId: string) => {
    const totalAmount = parseFloat(billForm.consultationFee || "0") + 
                       parseFloat(billForm.medicationCost || "0") + 
                       parseFloat(billForm.testsCost || "0");

    try {
      // This would be your Django API call
      const response = await fetch(`/api/bills/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          diagnosis: billForm.diagnosis,
          treatment: billForm.treatment,
          consultation_fee: billForm.consultationFee,
          medication_cost: billForm.medicationCost,
          tests_cost: billForm.testsCost,
          total_amount: totalAmount
        })
      });

      if (response.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { 
                  ...apt, 
                  diagnosis: billForm.diagnosis,
                  treatment: billForm.treatment,
                  billAmount: totalAmount
                }
              : apt
          )
        );

        toast({
          title: "Bill Generated Successfully",
          description: "Bill has been sent to patient via email and SMS",
        });

        // Reset form
        setBillForm({
          diagnosis: "", treatment: "", consultationFee: "",
          medicationCost: "", testsCost: "", totalAmount: ""
        });
        setSelectedAppointment(null);
      }
    } catch (error) {
      // Simulate bill generation for demo
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { 
                ...apt, 
                diagnosis: billForm.diagnosis,
                treatment: billForm.treatment,
                billAmount: totalAmount
              }
            : apt
        )
      );

      toast({
        title: "Bill Generated Successfully",
        description: "Bill has been sent to patient via email and SMS",
      });

      setBillForm({
        diagnosis: "", treatment: "", consultationFee: "",
        medicationCost: "", testsCost: "", totalAmount: ""
      });
      setSelectedAppointment(null);
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === "2024-01-15");
  const completedToday = todayAppointments.filter(apt => apt.status === "completed").length;
  const scheduledToday = todayAppointments.filter(apt => apt.status === "scheduled").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your appointments and patient care</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedToday}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledToday}</div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Appointments</CardTitle>
            <CardDescription>
              View scheduled appointments and patient information
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
                              appointment.status === "scheduled" ? "secondary" : 
                              appointment.status === "completed" ? "default" : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {appointment.patientPhone}
                          </p>
                          <p className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {appointment.patientAddress}
                          </p>
                        </div>
                        <p className="text-sm">
                          <strong>Symptoms:</strong> {appointment.symptoms}
                        </p>
                        {appointment.diagnosis && (
                          <p className="text-sm">
                            <strong>Diagnosis:</strong> {appointment.diagnosis}
                          </p>
                        )}
                        {appointment.treatment && (
                          <p className="text-sm">
                            <strong>Treatment:</strong> {appointment.treatment}
                          </p>
                        )}
                        {appointment.billAmount && (
                          <p className="text-sm font-semibold text-success">
                            Bill Generated: ${appointment.billAmount}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 lg:w-48">
                        {appointment.status === "scheduled" && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => handleCompleteAppointment(appointment.id)}
                            >
                              Mark as Completed
                            </Button>
                          </>
                        )}
                        
                        {appointment.status === "completed" && !appointment.billAmount && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedAppointment(appointment)}>
                                <DollarSign className="h-4 w-4 mr-2" />
                                Generate Bill
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Generate Bill for {appointment.patientName}</DialogTitle>
                                <DialogDescription>
                                  Create a detailed bill for the patient's treatment
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="diagnosis">Diagnosis</Label>
                                  <Textarea
                                    id="diagnosis"
                                    value={billForm.diagnosis}
                                    onChange={(e) => setBillForm(prev => ({...prev, diagnosis: e.target.value}))}
                                    placeholder="Enter patient diagnosis"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="treatment">Treatment Provided</Label>
                                  <Textarea
                                    id="treatment"
                                    value={billForm.treatment}
                                    onChange={(e) => setBillForm(prev => ({...prev, treatment: e.target.value}))}
                                    placeholder="Enter treatment details"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                                    <Input
                                      id="consultationFee"
                                      type="number"
                                      value={billForm.consultationFee}
                                      onChange={(e) => setBillForm(prev => ({...prev, consultationFee: e.target.value}))}
                                      placeholder="100"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="medicationCost">Medication Cost ($)</Label>
                                    <Input
                                      id="medicationCost"
                                      type="number"
                                      value={billForm.medicationCost}
                                      onChange={(e) => setBillForm(prev => ({...prev, medicationCost: e.target.value}))}
                                      placeholder="50"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="testsCost">Tests/Procedures ($)</Label>
                                    <Input
                                      id="testsCost"
                                      type="number"
                                      value={billForm.testsCost}
                                      onChange={(e) => setBillForm(prev => ({...prev, testsCost: e.target.value}))}
                                      placeholder="200"
                                    />
                                  </div>
                                </div>
                                <div className="text-lg font-semibold">
                                  Total: ${(parseFloat(billForm.consultationFee || "0") + 
                                           parseFloat(billForm.medicationCost || "0") + 
                                           parseFloat(billForm.testsCost || "0")).toFixed(2)}
                                </div>
                                <Button 
                                  onClick={() => handleGenerateBill(appointment.id)}
                                  className="w-full"
                                >
                                  Generate & Send Bill
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
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

export default DoctorDashboard;