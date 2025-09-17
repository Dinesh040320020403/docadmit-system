import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminDashboard: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-10">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<p className="text-muted-foreground">Overview of the hospital system</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Pending Appointments</CardTitle>
							<CardDescription>Today</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-semibold">8</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Total Doctors</CardTitle>
							<CardDescription>Active</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-semibold">24</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Patients</CardTitle>
							<CardDescription>Registered</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-semibold">1,240</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;

 


