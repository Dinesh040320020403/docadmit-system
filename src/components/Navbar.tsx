import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope, LogOut, User, Heart } from "lucide-react";
import { isAdmin, shouldShowAdminLinks } from "@/utils/accessControl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUserType = localStorage.getItem('userType');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    if (storedUserType && storedUserEmail) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setUserEmail(storedUserEmail);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    
    // Reset state
    setIsLoggedIn(false);
    setUserType(null);
    setUserEmail(null);
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Priyan Medical Agency</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/emergency" className="text-foreground hover:text-primary transition-colors">
                  Emergencyz
                </Link>
                <Button 
                  asChild 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <Link to="/book-appointment">Book Appointment</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{userEmail} ({userType})</span>
                </div>
                {/* Only show admin dashboard link for admin users */}
                {isAdmin(userType as any) && (
                  <Link to="/admin/dashboard" className="text-foreground hover:text-primary transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                {/* Show regular dashboard for non-admin users */}
                {!isAdmin(userType as any) && (
                  <Link to={`/${userType}/dashboard`} className="text-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                )}
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/emergency"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Emergency
                  </Link>
                  <div className="px-3 py-2">
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{userEmail} ({userType})</span>
                    </div>
                  </div>
                  {/* Only show admin dashboard link for admin users */}
                  {isAdmin(userType as any) && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {/* Show regular dashboard for non-admin users */}
                  {!isAdmin(userType as any) && (
                    <Link
                      to={`/${userType}/dashboard`}
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="px-3 py-2">
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;