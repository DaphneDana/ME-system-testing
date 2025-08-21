'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Eye, EyeOff, Mail, Lock, User, Phone, Check, X } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // Add state for all form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: ""
  })

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /\d/, text: "One number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character" }
  ]

  const getPasswordStrength = () => {
    return passwordRequirements.filter(req => req.regex.test(password)).length
  }

  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const passwordsDontMatch = confirmPassword && password !== confirmPassword

  // Check if all required fields are filled
  const allFieldsFilled = formData.firstName && 
                         formData.lastName && 
                         formData.email && 
                         formData.phone && 
                         formData.role &&
                         password &&
                         confirmPassword

  // Check if form is valid
  const isFormValid = allFieldsFilled && 
                     passwordsMatch && 
                     getPasswordStrength() === 5

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    if (isFormValid) {
      console.log('Form submitted with data:', { ...formData, password })
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 overflow-auto">
      <div className="w-full max-w-md mx-auto my-8">
        <Card className="w-full shadow-lg">
        <CardHeader className="text-center px-4 pt-2 pb-6">
          {/* Company Icon and Branding */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            {/* Company Icon */}
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            
            {/* Company Name and Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MEL System</h1>
            </div>
          </div>
          <CardTitle className="text-xl">Create Your Account</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 px-8 pb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  id="firstName" 
                  placeholder="First name" 
                  className="pl-10"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  id="lastName" 
                  placeholder="Last name" 
                  className="pl-10"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email address" 
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                id="phone" 
                placeholder="+256 xxx xxx xxx" 
                className="pl-10"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Your Role</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value) => handleInputChange('role', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="executive-director">Executive Director</SelectItem>
                <SelectItem value="me-officer">M&E Officer</SelectItem>
                <SelectItem value="finance-manager">Finance Manager</SelectItem>
                <SelectItem value="project-coordinator">Project Coordinator</SelectItem>
                <SelectItem value="program-manager">Program Manager</SelectItem>
                <SelectItem value="field-officer">Field Officer</SelectItem>
                <SelectItem value="data-analyst">Data Analyst</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Create password" 
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="space-y-1 mt-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className={`flex items-center text-xs ${
                    req.regex.test(password) ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {req.regex.test(password) ? 
                      <Check className="w-3 h-3 mr-1" /> : 
                      <X className="w-3 h-3 mr-1" />
                    }
                    {req.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm password" 
                className={`pl-10 pr-10 ${
                  passwordsDontMatch ? 'border-red-500' : 
                  passwordsMatch ? 'border-green-500' : ''
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && (
              <div className={`flex items-center text-xs mt-1 ${
                passwordsMatch ? 'text-green-600' : 'text-red-500'
              }`}>
                {passwordsMatch ? 
                  <Check className="w-3 h-3 mr-1" /> : 
                  <X className="w-3 h-3 mr-1" />
                }
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}
          </div>
          
          <Button 
            className={`w-full mt-6 transition-all duration-200 ${
              isFormValid 
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Create Account
          </Button>

          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <Button 
            variant="outline" 
            className="w-full h-11 border-gray-300 hover:bg-gray-50"
            type="button"
            onClick={() => {
              // Handle Google signup logic here
              console.log('Signing up with Google...')
            }}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}