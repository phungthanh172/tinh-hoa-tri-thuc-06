import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Apple, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import RoleBasedRedirect from '@/components/auth/RoleBasedRedirect';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    agreeToTerms: false
  });
  const [loginError, setLoginError] = useState('');

  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is already logged in, redirect to their dashboard
  if (user) {
    return <RoleBasedRedirect />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (isLogin) {
      try {
        await login(formData.email, formData.password);
        toast.success('Login successful!');
        // Redirect will be handled by RoleBasedRedirect component
      } catch (error) {
        setLoginError('Invalid email or password');
        toast.error('Login failed');
      }
    } else {
      // For demo purposes, signup just switches to login
      toast.info('Signup feature coming soon! Please use the sample accounts to login.');
      setIsLogin(true);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (loginError) setLoginError('');
  };

  const fillSampleAccount = (role: 'student' | 'instructor' | 'admin') => {
    const accounts = {
      student: { email: 'student@example.com', password: 'student123' },
      instructor: { email: 'instructor@example.com', password: 'instructor123' },
      admin: { email: 'admin@example.com', password: 'admin123' }
    };
    
    setFormData(prev => ({
      ...prev,
      email: accounts[role].email,
      password: accounts[role].password
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded"></div>
            <span className="text-3xl font-bold text-gray-900">Elite Knowledge</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Log in to your account' : 'Sign up and start learning'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sample Accounts Demo */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-2 text-blue-800">Demo Accounts:</h3>
              <div className="space-y-2">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => fillSampleAccount('student')}
                >
                  Student Account
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => fillSampleAccount('instructor')}
                >
                  Instructor Account
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => fillSampleAccount('admin')}
                >
                  Admin Account
                </Button>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 h-12">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 h-12">
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Continue with Facebook</span>
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 h-12">
                <Apple className="w-5 h-5" />
                <span>Continue with Apple</span>
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Error Alert */}
            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isLogin && (
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to Elite Knowledge's{' '}
                    <Link to="#" className="text-purple-600 hover:underline">Terms of Use</Link>
                    {' '}and{' '}
                    <Link to="#" className="text-purple-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  isLogin ? 'Log in' : 'Sign up'
                )}
              </Button>
            </form>

            {isLogin && (
              <div className="text-center">
                <Link to="#" className="text-purple-600 hover:underline text-sm">
                  Forgot Password?
                </Link>
              </div>
            )}

            <Separator />

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-purple-600 hover:underline text-sm font-semibold"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>

            {!isLogin && (
              <div className="text-center">
                <Link to="#" className="text-purple-600 hover:underline text-sm">
                  Sign up with your organization
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            By signing up, you agree to our{' '}
            <Link to="#" className="text-purple-600 hover:underline">Terms of Use</Link>
            {' '}and{' '}
            <Link to="#" className="text-purple-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
