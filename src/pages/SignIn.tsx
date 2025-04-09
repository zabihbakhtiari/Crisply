
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Mail, Lock, C } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSupabaseDialog, setShowSupabaseDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (!error) {
        // Redirect to dashboard on successful sign in
        navigate('/dashboard');
      } else {
        // If the error message contains "not configured", show a special message
        if (error.message?.includes("not configured")) {
          setShowSupabaseDialog(true);
        }
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "Failed to connect to authentication service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Form side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <span className="bg-blue-600 text-white p-1 rounded-md mr-2">
              <C className="h-5 w-5" />
            </span>
            Crisply
          </h1>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center space-x-8">
            <Link to="/signin" className="text-lg font-medium border-b-2 border-primary pb-2 px-2">Log In</Link>
            <Link to="/signup" className="text-lg font-medium text-gray-500 pb-2 px-2 hover:text-gray-800">Sign Up</Link>
          </div>
          
          {!import.meta.env.VITE_SUPABASE_URL && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Supabase not configured</AlertTitle>
              <AlertDescription>
                Authentication requires Supabase integration. Please click the Supabase button in the top right corner to configure it.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
            </div>
            
            <Button type="submit" className="w-full py-6" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </Button>
            
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 absolute w-full"></div>
              <div className="bg-background relative px-4 text-sm text-gray-500">or</div>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 py-5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 py-5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                </svg>
                <span>Continue with Facebook</span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* 3D Visual side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 rounded-l-3xl">
        <div className="p-8 max-w-md text-center">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/4c26281c-8cf2-46b4-b3c8-7b0ec7ca31c7.png" 
              alt="3D visualization" 
              className="w-full h-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
          <p className="text-white/80">
            Sign in to access your dashboard, manage your tasks,
            and continue your work where you left off.
          </p>
        </div>
      </div>

      {/* Supabase Configuration Dialog */}
      <Dialog open={showSupabaseDialog} onOpenChange={setShowSupabaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supabase Not Configured</DialogTitle>
            <DialogDescription>
              Authentication requires Supabase integration. Please click the Supabase button in the top right corner to configure it.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSupabaseDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
