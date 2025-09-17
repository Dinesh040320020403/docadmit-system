import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Clock, Ambulance, Stethoscope, HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center py-16" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop')" }}>
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ambulance className="h-5 w-5" />
            <p className="text-sm sm:text-base font-medium">Emergency? Call 911-HELP (24/7) or visit our Emergency Care</p>
          </div>
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex text-red-700">
            <Link to="/emergency">Get Emergency Care</Link>
          </Button>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Priyan Medical Agency</h1>
          <p className="text-muted-foreground text-lg">
            Get in touch with our healthcare team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Healthcare Avenue<br />
                  Medical District<br />
                  City, State 12345
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Phone Numbers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Emergency:</strong> (555) 911-HELP
                </p>
                <p className="text-muted-foreground">
                  <strong>Appointments:</strong> (555) 123-4567
                </p>
                <p className="text-muted-foreground">
                  <strong>General Info:</strong> (555) 123-4568
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  info@priyanmedical.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM
                </p>
                <p className="text-muted-foreground">
                  <strong>Saturday:</strong> 9:00 AM - 5:00 PM
                </p>
                <p className="text-muted-foreground">
                  <strong>Sunday:</strong> 10:00 AM - 4:00 PM
                </p>
                <p className="text-muted-foreground">
                  <strong>Emergency:</strong> 24/7
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <span>Departments</span>
                </CardTitle>
                <CardDescription>Reach specific care units directly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-2">
                      <HeartPulse className="h-4 w-4 text-primary" />
                      <span>Cardiology</span>
                    </div>
                    <Badge variant="secondary">Ext. 2101</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <span>General Medicine</span>
                    </div>
                    <Badge variant="secondary">Ext. 1105</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-2">
                      <Ambulance className="h-4 w-4 text-primary" />
                      <span>Emergency</span>
                    </div>
                    <Badge variant="secondary">Ext. 0100</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-2">
                      <HeartPulse className="h-4 w-4 text-primary" />
                      <span>Maternity & Neonatal</span>
                    </div>
                    <Badge variant="secondary">Ext. 3302</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Find Us</span>
                </CardTitle>
                <CardDescription>Parking available. Public transit within 200m.</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    title="Hospital Location"
                    className="rounded-md w-full h-full border"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531664!3d-37.81627974262757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHospital!5e0!3m2!1sen!2s!4v1614030000000"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                We'll respond to your inquiry as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Patient Relations Officer */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Relations Officer</CardTitle>
              <CardDescription>Your dedicated point of contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=256&auto=format&fit=crop" alt="Officer" />
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold leading-none">Priya Raman</p>
                  <p className="text-sm text-muted-foreground">Patient Relations Officer</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4 text-primary" />(555) 123-7788</span>
                    <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4 text-primary" />priya.r@priyanmedical.com</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-primary" />Mon–Fri 9:00–17:00</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild variant="default">
                  <a href="tel:+15551237788" className="inline-flex items-center"><Phone className="h-4 w-4 mr-2" />Call Now</a>
                </Button>
                <Button asChild variant="secondary">
                  <a href="mailto:priya.r@priyanmedical.com" className="inline-flex items-center"><Mail className="h-4 w-4 mr-2" />Send Email</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers about appointments, insurance, and visiting</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I book or reschedule an appointment?</AccordionTrigger>
                  <AccordionContent>
                    Use the Book Appointment page or call the Appointments line above. You will receive an SMS confirmation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Which insurance providers do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept most major providers. Bring a valid insurance card and a government ID at check-in.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Where should I go for emergencies?</AccordionTrigger>
                  <AccordionContent>
                    For life-threatening conditions, call emergency services or proceed to our Emergency Care via the banner above.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;