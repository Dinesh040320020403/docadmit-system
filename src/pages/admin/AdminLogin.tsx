import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdminLogin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Placeholder: implement real auth later
		alert(`Admin login submitted for ${email}`);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 py-12">
			<div className="container mx-auto px-4 max-w-md">
				<Card>
					<CardHeader>
						<CardTitle>Admin Login</CardTitle>
						<CardDescription>Sign in to access the admin dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4" onSubmit={onSubmit}>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
							</div>
							<Button type="submit" className="w-full">Sign in</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AdminLogin;




