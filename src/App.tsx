import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminGuard from "./components/AdminGuard";
import HospitalChatbot from "./components/HospitalChatbot";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminLogin from "./pages/admin/AdminLogin";
import DoctorDashboardNew from "./pages/doctors/DoctorDashboardNew";
import DoctorsList from "./pages/doctors/DoctorsList";
import PatientDashboardNew from "./pages/patients/PatientDashboardNew";
import PatientsList from "./pages/patients/PatientsList";
import NotFound from "./pages/NotFound";
import Emergency from "./pages/Emergency";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <HospitalChatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          } />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/admin/patients" element={
            <AdminGuard>
              <AdminPatients />
            </AdminGuard>
          } />
          <Route path="/admin/doctors" element={
            <AdminGuard>
              <AdminDoctors />
            </AdminGuard>
          } />
          <Route path="/doctors/dashboard" element={<DoctorDashboardNew />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/dashboard" element={<PatientDashboardNew />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
