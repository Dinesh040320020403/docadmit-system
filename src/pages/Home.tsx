import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Clock, 
  Award, 
  Users, 
  Star, 
  Stethoscope, 
  Calendar,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Activity,
  Zap,
  Globe
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-orange-50 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-medium">
                  <Activity className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ Patients
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                    Priyan Medical Agency
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Your trusted healthcare partner providing comprehensive medical services. 
                  Book appointments, connect with expert doctors, and experience quality healthcare.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <Link to="/book-appointment" className="flex items-center">
                    Book Appointment
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  <Link to="/doctors">Find Doctors</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Emergency Care</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Specializations</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image/Illustration */}
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Stethoscope className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-sm">Expert Care</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-sm">Easy Booking</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-sm">Secure Data</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-sm">24/7 Support</h3>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Background Tiles */}
      <section className="py-14 bg-gradient-to-b from-green-50 via-orange-50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Explore Our Hospital Services</h2>
            <p className="text-muted-foreground mt-2">Tap a card to navigate</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book Appointment */}
            <Link to="/book-appointment" className="group relative overflow-hidden rounded-2xl shadow-lg border bg-white">
              <div
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-semibold">Book Appointment</h3>
                <p className="text-white/80 text-sm">Schedule your visit in minutes</p>
              </div>
            </Link>

            {/* Find Doctors */}
            <Link to="/doctors" className="group relative overflow-hidden rounded-2xl shadow-lg border bg-white">
              <div
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1600&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-semibold">Find Doctors</h3>
                <p className="text-white/80 text-sm">Browse specialists and experts</p>
              </div>
            </Link>

            {/* Patient Services */}
            <Link to="/patients" className="group relative overflow-hidden rounded-2xl shadow-lg border bg-white">
              <div
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580281657527-47f249e8f3c7?q=80&w=1600&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-semibold">Patient Services</h3>
                <p className="text-white/80 text-sm">View patient resources</p>
              </div>
            </Link>

            {/* Emergency */}
            <Link to="/emergency" className="group relative overflow-hidden rounded-2xl shadow-lg border bg-white">
              <div
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584367369853-8b966cf22347?q=80&w=1600&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-semibold">Emergency</h3>
                <p className="text-white/80 text-sm">Immediate assistance 24/7</p>
              </div>
            </Link>

            {/* Contact Us */}
            <Link to="/contact" className="group relative overflow-hidden rounded-2xl shadow-lg border bg-white">
              <div
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="text-white/80 text-sm">We are here to help</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 via-green-50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Advanced Healthcare <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience cutting-edge healthcare technology at Priyan Medical Agency designed to provide the best patient care and medical management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Expert Medical Care</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Access to board-certified doctors and specialists with years of experience in their fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Board-certified specialists
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Advanced medical equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Personalized treatment plans
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Secure & Private</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  HIPAA compliant platform with end-to-end encryption ensuring your medical data stays private
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Secure data storage
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">24/7 Support</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Round-the-clock medical assistance and emergency care when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Emergency hotline
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Live chat support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Urgent care access
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-orange-500 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-green-100 text-lg">
              Join our growing community of satisfied patients and healthcare providers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                10,000+
              </div>
              <div className="text-green-100 font-medium">Happy Patients</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-green-100 font-medium">Expert Doctors</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-green-100 font-medium">Specializations</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-green-100 font-medium">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Comprehensive <span className="text-primary">Healthcare</span> Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From routine check-ups to emergency care, Priyan Medical Agency provides a full spectrum of medical services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl">Primary Care</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive primary healthcare services for all ages
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl">Appointment Booking</CardTitle>
                <CardDescription className="text-base">
                  Easy online appointment scheduling with your preferred doctors
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl">Specialist Care</CardTitle>
                <CardDescription className="text-base">
                  Access to specialists across various medical disciplines
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-green-50 via-orange-50 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Patient Reviews
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our <span className="text-primary">Patients</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">Sarah Johnson</CardTitle>
                <CardDescription className="text-sm">Patient since 2022</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "Excellent service and professional staff. The online booking system made everything so convenient! 
                  I can easily schedule appointments and manage my health records from anywhere."
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">Michael Chen</CardTitle>
                <CardDescription className="text-sm">Patient since 2021</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "Top-notch medical care with modern facilities. Highly recommend to everyone! 
                  The doctors are knowledgeable and the staff is incredibly helpful and caring."
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">Emily Rodriguez</CardTitle>
                <CardDescription className="text-sm">Patient since 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "The digital health records and appointment reminders are game-changers! 
                  It's so easy to keep track of my medical history and never miss an appointment."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-orange-500 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join thousands of patients who trust Priyan Medical Agency with their healthcare needs. 
              Book your appointment today and experience the future of healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 group"
              >
                <Link to="/book-appointment" className="flex items-center">
                  Book Appointment Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;