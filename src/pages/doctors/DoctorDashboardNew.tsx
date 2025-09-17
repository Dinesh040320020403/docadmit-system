import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Users, CheckCircle } from "lucide-react";

const DoctorDashboardNew: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-10">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Doctor Dashboard</h1>
					<p className="text-muted-foreground">Today’s schedule and quick stats</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<Card>
						<CardContent className="p-4 flex items-center justify-between">
							<div>
								<p className="text-muted-foreground text-sm">Appointments</p>
								<p className="text-2xl font-semibold">8</p>
							</div>
							<Calendar className="h-6 w-6 text-sky-600" />
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 flex items-center justify-between">
							<div>
								<p className="text-muted-foreground text-sm">Patients Today</p>
								<p className="text-2xl font-semibold">6</p>
							</div>
							<Users className="h-6 w-6 text-emerald-600" />
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 flex items-center justify-between">
							<div>
								<p className="text-muted-foreground text-sm">Completed</p>
								<p className="text-2xl font-semibold">3</p>
							</div>
							<CheckCircle className="h-6 w-6 text-green-600" />
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 flex items-center justify-between">
							<div>
								<p className="text-muted-foreground text-sm">Pending</p>
								<p className="text-2xl font-semibold">2</p>
							</div>
							<ClipboardList className="h-6 w-6 text-yellow-600" />
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Today’s Appointments</CardTitle>
						<CardDescription>Sample schedule for demonstration</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex items-center justify-between rounded-md border p-3">
							<div>
								<p className="font-medium">10:00 AM • John Smith</p>
								<p className="text-sm text-muted-foreground">Follow-up • Cardiology</p>
							</div>
							<Button size="sm" variant="secondary">View</Button>
						</div>
						<div className="flex items-center justify-between rounded-md border p-3">
							<div>
								<p className="font-medium">11:30 AM • Emily Davis</p>
								<p className="text-sm text-muted-foreground">New patient • Dermatology</p>
							</div>
							<Button size="sm" variant="secondary">View</Button>
						</div>
						<div className="flex items-center justify-between rounded-md border p-3">
							<div>
								<p className="font-medium">02:15 PM • Michael Brown</p>
								<p className="text-sm text-muted-foreground">Consultation • General</p>
							</div>
							<Button size="sm" variant="secondary">View</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DoctorDashboardNew;

 


