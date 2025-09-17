import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, Shield } from "lucide-react";

const HospitalAdminLogin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Store hospital admin login
		localStorage.setItem('token', 'hospital-admin-token');
		localStorage.setItem('userType', 'hospital-admin');
		window.location.href = '/hospital/admin/dashboard';
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
			<div className="container mx-auto px-4 max-w-md">
				<div className="text-center mb-8">
					<div className="flex justify-center items-center gap-2 mb-4">
						<Building2 className="h-8 w-8 text-primary" />
						<Shield className="h-6 w-6 text-accent" />
					</div>
					<h1 className="text-2xl font-bold text-foreground">Hospital Management Portal</h1>
					<p className="text-muted-foreground">Administrative Access</p>
				</div>
				
				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<CardTitle className="text-primary">Admin Login</CardTitle>
						<CardDescription>Access hospital administration dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4" onSubmit={onSubmit}>
							<div className="space-y-2">
								<Label htmlFor="email">Admin Email</Label>
								<Input 
									id="email" 
									type="email" 
									value={email} 
									onChange={e => setEmail(e.target.value)} 
									placeholder="admin@hospital.com"
									required 
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input 
									id="password" 
									type="password" 
									value={password} 
									onChange={e => setPassword(e.target.value)} 
									placeholder="••••••••"
									required 
								/>
							</div>
							<Button type="submit" className="w-full">
								<Shield className="mr-2 h-4 w-4" />
								Sign in as Admin
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default HospitalAdminLogin;