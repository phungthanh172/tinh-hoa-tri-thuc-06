
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Apple, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded"></div>
            <span className="text-3xl font-bold text-gray-900">Udemy</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Log in to your Udemy account' : 'Sign up and start learning'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
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
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to Udemy's{' '}
                    <Link to="#" className="text-purple-600 hover:underline">Terms of Use</Link>
                    {' '}and{' '}
                    <Link to="#" className="text-purple-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700">
                {isLogin ? 'Log in' : 'Sign up'}
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
