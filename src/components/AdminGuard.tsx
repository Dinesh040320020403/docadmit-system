import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    if (!userType || !userEmail || !token) {
      // User not logged in, redirect to admin login
      navigate('/admin');
      return;
    }

    if (userType !== 'admin') {
      // User is not admin, show access denied
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    // User is admin
    setIsAdmin(true);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard. This area is restricted to administrators only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              <span>Only users with admin privileges can access this page.</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={() => navigate('/admin')}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;


