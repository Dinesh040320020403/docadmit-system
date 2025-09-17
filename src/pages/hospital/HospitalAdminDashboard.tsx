import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, User, Stethoscope, CheckCircle, XCircle, Calendar } from "lucide-react";

interface PatientAppointment {
	id: string;
	patientName: string;
	phone: string;
	email: string;
	disease: string;
	preferredDate: string;
	status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
	scheduledDoctor?: string;
	scheduledTime?: string;
}

interface Doctor {
	id: string;
	name: string;
	specialization: string;
	availability: string[];
}

const HospitalAdminDashboard: React.FC = () => {
	const [appointments, setAppointments] = useState<PatientAppointment[]>([
		{
			id: "1",
			patientName: "Sarah Johnson",
			phone: "+1-234-567-8901",
			email: "sarah.j@email.com",
			disease: "Fever and headache for 3 days",
			preferredDate: "2024-01-15",
			status: "pending"
		},
		{
			id: "2",
			patientName: "Mike Chen",
			phone: "+1-234-567-8902",
			email: "mike.chen@email.com",
			disease: "Chest pain and shortness of breath",
			preferredDate: "2024-01-16",
			status: "pending"
		},
		{
			id: "3",
			patientName: "Emma Davis",
			phone: "+1-234-567-8903",
			email: "emma.d@email.com",
			disease: "Skin rash and itching",
			preferredDate: "2024-01-17",
			status: "scheduled",
			scheduledDoctor: "Dr. Wilson",
			scheduledTime: "10:00 AM"
		}
	]);

	const [doctors] = useState<Doctor[]>([
		{
			id: "1",
			name: "Dr. Smith",
			specialization: "General Medicine",
			availability: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"]
		},
		{
			id: "2",
			name: "Dr. Wilson",
			specialization: "Cardiology",
			availability: ["11:00 AM", "1:00 PM", "4:00 PM"]
		},
		{
			id: "3",
			name: "Dr. Brown",
			specialization: "Dermatology",
			availability: ["9:30 AM", "2:30 PM", "3:30 PM"]
		}
	]);

	const scheduleAppointment = (appointmentId: string, doctorName: string, time: string) => {
		setAppointments(prev => prev.map(apt => 
			apt.id === appointmentId 
				? { ...apt, status: 'scheduled', scheduledDoctor: doctorName, scheduledTime: time }
				: apt
		));
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending': return 'bg-yellow-500';
			case 'scheduled': return 'bg-blue-500';
			case 'completed': return 'bg-green-500';
			case 'cancelled': return 'bg-red-500';
			default: return 'bg-gray-500';
		}
	};

	const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
	const scheduledCount = appointments.filter(apt => apt.status === 'scheduled').length;
	const completedCount = appointments.filter(apt => apt.status === 'completed').length;

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground">Hospital Admin Dashboard</h1>
					<p className="text-muted-foreground">Manage patient appointments and doctor schedules</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Pending Appointments</p>
									<p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
								</div>
								<Clock className="h-8 w-8 text-yellow-600" />
							</div>
						</CardContent>
					</Card>
					
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Scheduled Today</p>
									<p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
								</div>
								<Calendar className="h-8 w-8 text-blue-600" />
							</div>
						</CardContent>
					</Card>
					
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Completed</p>
									<p className="text-2xl font-bold text-green-600">{completedCount}</p>
								</div>
								<CheckCircle className="h-8 w-8 text-green-600" />
							</div>
						</CardContent>
					</Card>
					
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Available Doctors</p>
									<p className="text-2xl font-bold text-primary">{doctors.length}</p>
								</div>
								<Stethoscope className="h-8 w-8 text-primary" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="pending" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="pending">Pending Appointments</TabsTrigger>
						<TabsTrigger value="scheduled">Scheduled Appointments</TabsTrigger>
					</TabsList>

					<TabsContent value="pending">
						<Card>
							<CardHeader>
								<CardTitle>Patient Appointments Awaiting Schedule</CardTitle>
								<CardDescription>Review and assign doctors to patient appointments</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{appointments.filter(apt => apt.status === 'pending').map((appointment) => (
									<div key={appointment.id} className="border rounded-lg p-4 space-y-3">
										<div className="flex items-start justify-between">
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<User className="h-4 w-4 text-primary" />
													<h3 className="font-semibold">{appointment.patientName}</h3>
													<Badge className={getStatusColor(appointment.status)}>
														{appointment.status}
													</Badge>
												</div>
												<p className="text-sm text-muted-foreground">📞 {appointment.phone}</p>
												<p className="text-sm text-muted-foreground">📧 {appointment.email}</p>
												<p className="text-sm"><strong>Symptoms:</strong> {appointment.disease}</p>
												<p className="text-sm text-muted-foreground">
													<CalendarDays className="inline h-4 w-4 mr-1" />
													Preferred Date: {appointment.preferredDate}
												</p>
											</div>
										</div>
										
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t">
											<div>
												<label className="text-sm font-medium">Assign Doctor</label>
												<Select onValueChange={(doctorName) => {
													const doctor = doctors.find(d => d.name === doctorName);
													if (doctor && doctor.availability.length > 0) {
														scheduleAppointment(appointment.id, doctorName, doctor.availability[0]);
													}
												}}>
													<SelectTrigger>
														<SelectValue placeholder="Select doctor" />
													</SelectTrigger>
													<SelectContent>
														{doctors.map((doctor) => (
															<SelectItem key={doctor.id} value={doctor.name}>
																{doctor.name} - {doctor.specialization}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="scheduled">
						<Card>
							<CardHeader>
								<CardTitle>Scheduled Appointments</CardTitle>
								<CardDescription>Currently scheduled patient appointments</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{appointments.filter(apt => apt.status === 'scheduled').map((appointment) => (
									<div key={appointment.id} className="border rounded-lg p-4">
										<div className="flex items-start justify-between">
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<User className="h-4 w-4 text-primary" />
													<h3 className="font-semibold">{appointment.patientName}</h3>
													<Badge className={getStatusColor(appointment.status)}>
														{appointment.status}
													</Badge>
												</div>
												<p className="text-sm text-muted-foreground">📞 {appointment.phone}</p>
												<p className="text-sm"><strong>Symptoms:</strong> {appointment.disease}</p>
												<div className="flex gap-4 text-sm text-muted-foreground">
													<span><Stethoscope className="inline h-4 w-4 mr-1" />Dr: {appointment.scheduledDoctor}</span>
													<span><Clock className="inline h-4 w-4 mr-1" />Time: {appointment.scheduledTime}</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* Doctor Availability */}
				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Doctor Availability</CardTitle>
						<CardDescription>Current doctor schedules and availability</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{doctors.map((doctor) => (
								<div key={doctor.id} className="border rounded-lg p-4">
									<h3 className="font-semibold">{doctor.name}</h3>
									<p className="text-sm text-muted-foreground mb-2">{doctor.specialization}</p>
									<div className="space-y-1">
										<p className="text-sm font-medium">Available Times:</p>
										{doctor.availability.map((time, index) => (
											<Badge key={index} variant="secondary" className="mr-1 mb-1">
												{time}
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default HospitalAdminDashboard;