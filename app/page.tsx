import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MEL System</h1>
                <p className="text-xs text-gray-500">KCSON</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 w-full">
        <div className="w-full px-6 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Digital Monitoring, Evaluation & Learning System</h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-5xl mx-auto">
            Empowering civil society organizations in Uganda with comprehensive tools for project management,
            beneficiary tracking, financial oversight, and impact measurement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="px-8 w-full sm:w-auto">
                Access System →
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 bg-transparent w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comprehensive MEL Solutions</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
              Built specifically for KCSON network and partner organizations to streamline monitoring, evaluation, and
              learning processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-xl">Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track project progress, manage work plans, and monitor budget allocation across multiple initiatives
                  and partner organizations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle className="text-xl">Beneficiary Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive beneficiary registry with advanced filtering, service tracking, and impact measurement
                  capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle className="text-xl">Financial Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Multi-currency financial tracking, budget monitoring, transaction management, and donor reporting
                  capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <CardTitle className="text-xl">M&E Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Indicator tracking, data quality monitoring, activity logging, and performance measurement tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <CardTitle className="text-xl">Report Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automated report generation with donor-specific templates, scheduling, and multi-format export
                  capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle className="text-xl">Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Role-based access control, data validation, offline capabilities, and secure multi-organizational data
                  management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Serving Key Organizations</h2>
            <p className="text-lg lg:text-xl text-gray-600">
              Designed for the unique needs of civil society organizations in Uganda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl">KCSON Network</CardTitle>
                <p className="text-gray-600 text-lg">Kagera Civil Society Organizations Network</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">85+ Partner Civil Society Organizations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Network-wide Project Coordination</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Aggregated Impact Reporting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">HR Management & Appraisals</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl">Kiima Foods</CardTitle>
                <p className="text-gray-600 text-lg">Multi-Department NGO</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Nature Resources Department</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Livelihood Programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Education Initiatives</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-lg">Cooperative Assessments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 w-full">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Your MEL Processes?</h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Join organizations already using our comprehensive MEL system to drive impact and improve program
            effectiveness.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="px-8">
              Access System Now →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">MEL System</h3>
                  <p className="text-xs text-gray-400">KCSON</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering civil society organizations with comprehensive monitoring, evaluation, and learning tools.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Project Management</li>
                <li>Financial Tracking</li>
                <li>Beneficiary Registry</li>
                <li>Report Generation</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Organizations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>KCSON Network</li>
                <li>Kiima Foods</li>
                <li>Partner CSOs</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Training</li>
                <li>Technical Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MEL System. Built for KCSON and partner organizations.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}