import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MEL System</h1>
              <p className="text-sm text-gray-500">KCSON</p>
            </div>
          </div>
          <CardTitle className="text-xl">Sign In to Your Account</CardTitle>
          <p className="text-gray-600">Access your MEL dashboard and tools</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Link href="/dashboard">
            <Button className="w-full">Sign In</Button>
          </Link>
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
