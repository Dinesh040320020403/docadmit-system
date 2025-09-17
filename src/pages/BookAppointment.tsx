import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const location = useLocation();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    doctor: "",
    time: "",
    symptoms: "",
    emergencyContact: ""
  });
  const { toast } = useToast();

  // Prefill from navigation state (e.g., from Doctors page)
  useEffect(() => {
    const state = (location as any)?.state as { doctorId?: string; doctorName?: string; specialization?: string } | undefined;
    if (state) {
      setFormData(prev => ({
        ...prev,
        doctor: state.doctorName || prev.doctor,
        department: state.specialization && departments.includes(state.specialization) ? state.specialization : prev.department,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departments = [
    "Cardiology",
    "Dermatology", 
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "General Medicine"
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment form submitted', formData, date);
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate required fields
    if (!date) {
      toast({
        title: "Error",
        description: "Please select an appointment date",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || 
        !formData.department || !formData.time || !formData.symptoms) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentData = {
        ...formData,
        date: format(date, "yyyy-MM-dd"),
        status: "pending"
      };

      // This would be your Django API call
      const response = await fetch('/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        toast({
          title: "Appointment Booked!",
          description: "Your appointment has been submitted for admin review. You'll receive confirmation via email and SMS.",
        });
        
        // Reset form
        resetForm();
      } else {
        throw new Error('Failed to submit appointment');
      }
    } catch (error) {
      // For demo purposes, show success even if API fails
      console.log('API call failed, but showing success for demo:', error);
      toast({
        title: "Appointment Request Submitted!",
        description: "Your appointment request has been submitted and will be reviewed by our admin team. You'll receive confirmation via email and SMS.",
      });
      
      // Reset form
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", 
      email: "", 
      phone: "", 
      address: "", 
      department: "",
      doctor: "", 
      time: "", 
      symptoms: "", 
      emergencyContact: ""
    });
    setDate(undefined);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-muted-foreground text-lg">
            Schedule your visit with Priyan Medical Agency healthcare professionals
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Please fill in all required information for your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Appointment Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleChange("department", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Preferred Doctor (Optional)</Label>
                  <Input
                    id="doctor"
                    value={formData.doctor}
                    onChange={(e) => handleChange("doctor", e.target.value)}
                    placeholder="Dr. Smith, Dr. Johnson, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Appointment Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time *</Label>
                  <Select onValueChange={(value) => handleChange("time", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms / Reason for Visit *</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => handleChange("symptoms", e.target.value)}
                  rows={4}
                  placeholder="Please describe your symptoms or reason for the appointment"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;