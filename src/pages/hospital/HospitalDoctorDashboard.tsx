import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Clock, Calendar, FileText, DollarSign, Send } from "lucide-react";

interface ScheduledAppointment {
	id: string;
	patientName: string;
	phone: string;
	email: string;
	symptoms: string;
	scheduledTime: string;
	status: 'scheduled' | 'in-progress' | 'completed';
	diagnosis?: string;
	treatment?: string;
	bill?: {
		consultationFee: number;
		medicationCost: number;
		total: number;
	};
}

const HospitalDoctorDashboard: React.FC = () => {
	const [appointments, setAppointments] = useState<ScheduledAppointment[]>([
		{
			id: "1",
			patientName: "Emma Davis",
			phone: "+1-234-567-8903",
			email: "emma.d@email.com",
			symptoms: "Skin rash and itching",
			scheduledTime: "10:00 AM",
			status: "scheduled"
		},
		{
			id: "2",
			patientName: "John Miller",
			phone: "+1-234-567-8904",
			email: "john.m@email.com",
			symptoms: "Back pain and stiffness",
			scheduledTime: "11:30 AM",
			status: "in-progress"
		},
		{
			id: "3",
			patientName: "Lisa Wong",
			phone: "+1-234-567-8905",
			email: "lisa.w@email.com",
			symptoms: "Migraine headaches",
			scheduledTime: "9:00 AM",
			status: "completed",
			diagnosis: "Tension headache",
			treatment: "Prescribed pain relievers and stress management techniques",
			bill: {
				consultationFee: 150,
				medicationCost: 45,
				total: 195
			}
		}
	]);

	const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
	const [diagnosis, setDiagnosis] = useState("");
	const [treatment, setTreatment] = useState("");
	const [consultationFee, setConsultationFee] = useState("");
	const [medicationCost, setMedicationCost] = useState("");

	const completeAppointment = (appointmentId: string) => {
		const fee = parseFloat(consultationFee) || 0;
		const medication = parseFloat(medicationCost) || 0;
		const total = fee + medication;

		setAppointments(prev => prev.map(apt => 
			apt.id === appointmentId 
				? { 
					...apt, 
					status: 'completed' as const,
					diagnosis,
					treatment,
					bill: {
						consultationFee: fee,
						medicationCost: medication,
						total
					}
				}
				: apt
		));

		// Reset form
		setSelectedAppointment(null);
		setDiagnosis("");
		setTreatment("");
		setConsultationFee("");
		setMedicationCost("");
	};

	const sendBillToPatient = (appointment: ScheduledAppointment) => {
		alert(`Bill sent to ${appointment.patientName} via SMS and Email!\nTotal: $${appointment.bill?.total}`);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'scheduled': return 'bg-blue-500';
			case 'in-progress': return 'bg-yellow-500';
			case 'completed': return 'bg-green-500';
			default: return 'bg-gray-500';
		}
	};

	const scheduledCount = appointments.filter(apt => apt.status === 'scheduled').length;
	const inProgressCount = appointments.filter(apt => apt.status === 'in-progress').length;
	const completedCount = appointments.filter(apt => apt.status === 'completed').length;

	return (
		<div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
					<p className="text-muted-foreground">Manage your scheduled appointments and patient care</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
									<p className="text-sm text-muted-foreground">In Progress</p>
									<p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
								</div>
								<Clock className="h-8 w-8 text-yellow-600" />
							</div>
						</CardContent>
					</Card>
					
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Completed Today</p>
									<p className="text-2xl font-bold text-green-600">{completedCount}</p>
								</div>
								<FileText className="h-8 w-8 text-green-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="scheduled" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="scheduled">Scheduled</TabsTrigger>
						<TabsTrigger value="in-progress">In Progress</TabsTrigger>
						<TabsTrigger value="completed">Completed</TabsTrigger>
					</TabsList>

					<TabsContent value="scheduled">
						<Card>
							<CardHeader>
								<CardTitle>Today's Scheduled Appointments</CardTitle>
								<CardDescription>Patients scheduled for consultation</CardDescription>
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
												<p className="text-sm text-muted-foreground">📧 {appointment.email}</p>
												<p className="text-sm"><strong>Symptoms:</strong> {appointment.symptoms}</p>
												<p className="text-sm text-muted-foreground">
													<Clock className="inline h-4 w-4 mr-1" />
													Scheduled: {appointment.scheduledTime}
												</p>
											</div>
											<Button 
												onClick={() => setSelectedAppointment(appointment.id)}
												size="sm"
											>
												Start Consultation
											</Button>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="in-progress">
						<Card>
							<CardHeader>
								<CardTitle>Active Consultations</CardTitle>
								<CardDescription>Complete diagnosis and treatment for ongoing appointments</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{appointments.filter(apt => apt.status === 'in-progress').map((appointment) => (
									<div key={appointment.id} className="border rounded-lg p-4">
										<div className="space-y-4">
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-primary" />
												<h3 className="font-semibold">{appointment.patientName}</h3>
												<Badge className={getStatusColor(appointment.status)}>
													{appointment.status}
												</Badge>
											</div>
											<p className="text-sm"><strong>Symptoms:</strong> {appointment.symptoms}</p>
											
											{selectedAppointment === appointment.id && (
												<div className="space-y-4 border-t pt-4">
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<div className="space-y-2">
															<Label htmlFor="diagnosis">Diagnosis</Label>
															<Textarea
																id="diagnosis"
																placeholder="Enter diagnosis..."
																value={diagnosis}
																onChange={(e) => setDiagnosis(e.target.value)}
															/>
														</div>
														<div className="space-y-2">
															<Label htmlFor="treatment">Treatment & Prescription</Label>
															<Textarea
																id="treatment"
																placeholder="Enter treatment plan and prescriptions..."
																value={treatment}
																onChange={(e) => setTreatment(e.target.value)}
															/>
														</div>
													</div>
													
													<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
														<div className="space-y-2">
															<Label htmlFor="consultation">Consultation Fee ($)</Label>
															<Input
																id="consultation"
																type="number"
																placeholder="150"
																value={consultationFee}
																onChange={(e) => setConsultationFee(e.target.value)}
															/>
														</div>
														<div className="space-y-2">
															<Label htmlFor="medication">Medication Cost ($)</Label>
															<Input
																id="medication"
																type="number"
																placeholder="45"
																value={medicationCost}
																onChange={(e) => setMedicationCost(e.target.value)}
															/>
														</div>
														<div className="space-y-2">
															<Label>Total Bill</Label>
															<Input
																value={`$${(parseFloat(consultationFee) || 0) + (parseFloat(medicationCost) || 0)}`}
																disabled
															/>
														</div>
													</div>
													
													<Button 
														onClick={() => completeAppointment(appointment.id)}
														disabled={!diagnosis || !treatment}
														className="w-full"
													>
														Complete Consultation & Generate Bill
													</Button>
												</div>
											)}
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="completed">
						<Card>
							<CardHeader>
								<CardTitle>Completed Consultations</CardTitle>
								<CardDescription>Finished appointments with generated bills</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{appointments.filter(apt => apt.status === 'completed').map((appointment) => (
									<div key={appointment.id} className="border rounded-lg p-4">
										<div className="space-y-3">
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-primary" />
												<h3 className="font-semibold">{appointment.patientName}</h3>
												<Badge className={getStatusColor(appointment.status)}>
													{appointment.status}
												</Badge>
											</div>
											<p className="text-sm"><strong>Symptoms:</strong> {appointment.symptoms}</p>
											<p className="text-sm"><strong>Diagnosis:</strong> {appointment.diagnosis}</p>
											<p className="text-sm"><strong>Treatment:</strong> {appointment.treatment}</p>
											
											{appointment.bill && (
												<div className="bg-muted/50 rounded-lg p-3 space-y-2">
													<h4 className="font-medium flex items-center gap-2">
														<DollarSign className="h-4 w-4" />
														Bill Details
													</h4>
													<div className="grid grid-cols-3 gap-4 text-sm">
														<div>Consultation: ${appointment.bill.consultationFee}</div>
														<div>Medication: ${appointment.bill.medicationCost}</div>
														<div className="font-semibold">Total: ${appointment.bill.total}</div>
													</div>
													<Button 
														size="sm" 
														onClick={() => sendBillToPatient(appointment)}
														className="mt-2"
													>
														<Send className="h-4 w-4 mr-2" />
														Send Bill to Patient
													</Button>
												</div>
											)}
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default HospitalDoctorDashboard;