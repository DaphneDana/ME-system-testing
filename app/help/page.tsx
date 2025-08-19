'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search,
  FileText, 
  Video, 
  HelpCircle, 
  Download, 
  Users, 
  MessageSquare,
  User,
  FolderOpen,
  BarChart3,
  DollarSign,
  Target,

  FileBarChart,
  Play,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Clock,
  BookOpen,
  Lightbulb,
  Settings,
  Shield
} from "lucide-react"

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState("documentation")
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Navigation items for the left sidebar
  const helpNavigation = [
    { id: "documentation", label: "Documentation", icon: FileText },
    { id: "video-tutorials", label: "Video Tutorials", icon: Video },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "community", label: "Community", icon: Users },
    { id: "support", label: "Support", icon: MessageSquare }
  ]

  // Quick start guide data
  const quickStartGuides = [
    {
      id: "setup-account",
      title: "Setting Up Your Account",
      description: "Learn how to configure your user profile and organization settings",
      readTime: "5 min read",
      icon: User
    },
    {
      id: "first-project",
      title: "Creating Your First Project",
      description: "Step-by-step guide to set up a new project with work plans",
      readTime: "8 min read",
      icon: FolderOpen
    },
    {
      id: "me-framework",
      title: "Understanding M&E Framework",
      description: "Overview of indicators, activities, and reporting structure",
      readTime: "12 min read",
      icon: BarChart3
    }
  ]

  // Module documentation data
  const moduleDocumentation = [
    {
      id: "project-management",
      title: "Project Management",
      description: "Creating projects, work plans, and managing activities",
      articles: 15,
      icon: FolderOpen
    },
    {
      id: "financial-management", 
      title: "Financial Management",
      description: "Budget tracking, transactions, and financial reporting",
      articles: 12,
      icon: DollarSign
    },
    {
      id: "me-system",
      title: "M&E System",
      description: "Indicators, data collection, and evaluation processes",
      articles: 18,
      icon: Target
    },
    {
      id: "beneficiary-management",
      title: "Beneficiary Management", 
      description: "Registration, data import, and service tracking",
      articles: 10,
      icon: Users
    },
    {
      id: "report-generation",
      title: "Report Generation",
      description: "Creating reports, templates, and automated scheduling",
      articles: 8,
      icon: FileBarChart
    }
  ]

  // Video tutorials data
  const videoTutorials = [
    {
      id: "system-overview",
      title: "MEL System Overview",
      description: "Complete introduction to the system features and navigation",
      duration: "12:45",
      updated: "Jan 15, 2025",
      thumbnail: "/api/placeholder/300/180"
    },
    {
      id: "data-entry",
      title: "Data Entry Best Practices",
      description: "Learn efficient data entry techniques and validation",
      duration: "8:32", 
      updated: "Jan 10, 2025",
      thumbnail: "/api/placeholder/300/180"
    },
    {
      id: "financial-reporting",
      title: "Financial Reporting",
      description: "Generate financial reports and track budget utilization",
      duration: "15:20",
      updated: "Jan 8, 2025",
      thumbnail: "/api/placeholder/300/180"
    },
    {
      id: "mobile-collection",
      title: "Mobile Data Collection",
      description: "Using the mobile interface for field data collection",
      duration: "6:15",
      updated: "Jan 5, 2025", 
      thumbnail: "/api/placeholder/300/180"
    }
  ]

  // FAQ data
  const faqItems = [
    {
      id: "import-excel",
      question: "How do I import beneficiary data from Excel?",
      answer: "To import beneficiary data from Excel: 1) Navigate to the Beneficiaries page, 2) Click 'Import' button, 3) Select your Excel file (.xlsx or .csv), 4) Map the columns to match our data fields, 5) Validate the data preview, 6) Complete the import process. Make sure your Excel file includes required fields like Name, Age, Gender, and Location."
    },
    {
      id: "offline-work",
      question: "Can I work offline with the system?",
      answer: "Yes, the MEL System supports offline functionality. You can collect data, enter beneficiary information, and record activities while offline. The system will automatically sync your data when you reconnect to the internet. Enable offline mode in Settings > System > Offline Mode to start using this feature."
    },
    {
      id: "automated-reports",
      question: "How do I set up automated reports?",
      answer: "To set up automated reports: 1) Go to Reports > Schedule Report, 2) Select your report template, 3) Choose frequency (weekly, monthly, quarterly), 4) Set the start date and time, 5) Add recipient email addresses, 6) Enable auto-send option if desired. The system will automatically generate and send reports based on your schedule."
    },
    {
      id: "user-permissions",
      question: "What are the user permission levels?",
      answer: "The system has several permission levels: Executive Director (full access), M&E Officer (monitoring and evaluation functions), Finance Manager (financial data access), Project Coordinator (project-specific access). Each role has specific permissions for viewing, editing, and deleting data. Administrators can customize these permissions in Settings > Permissions."
    },
    {
      id: "data-backup",
      question: "How is my data backed up?",
      answer: "Data is automatically backed up daily to secure cloud storage. You can also create manual backups anytime from Settings > Data & Backup. Backups include all your projects, beneficiary data, financial records, and system configurations. You can restore from any backup point if needed."
    },
    {
      id: "mobile-access",
      question: "Can I access the system from mobile devices?",
      answer: "Yes, the MEL System is fully responsive and works on mobile devices and tablets. You can access all features through your mobile browser. For field data collection, we recommend using the mobile-optimized interface which provides offline capabilities and simplified data entry forms."
    }
  ]

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const renderContent = () => {
    switch(activeSection) {
      case "documentation":
        return renderDocumentation()
      case "video-tutorials":
        return renderVideoTutorials()
      case "faq":
        return renderFAQ()
      case "downloads":
        return renderDownloads()
      case "community":
        return renderCommunity()
      case "support":
        return renderSupport()
      default:
        return renderDocumentation()
    }
  }

  const renderDocumentation = () => (
    <div className="space-y-8">
      {/* Quick Start Guide */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Start Guide</h2>
          <span className="text-sm text-gray-500">Getting Started</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStartGuides.map((guide) => {
            const Icon = guide.icon
            return (
              <Card key={guide.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {guide.readTime}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Module Documentation */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Module Documentation</h2>
        <div className="space-y-4">
          {moduleDocumentation.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{module.articles} articles</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderVideoTutorials = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoTutorials.map((video) => (
            <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-video bg-gray-400 rounded-t-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                  <p className="text-xs text-gray-500">Updated: {video.updated}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFAQ = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <Card key={faq.id} className="border border-gray-200">
              <CardContent className="p-0">
                <button
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100">
                    <div className="pt-4">{faq.answer}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDownloads = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Downloads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">User Manual</h3>
                  <p className="text-sm text-gray-600">Complete system documentation (PDF)</p>
                  <p className="text-xs text-gray-500">Version 2.1 • 12.5 MB</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Data Import Templates</h3>
                  <p className="text-sm text-gray-600">Excel templates for data import</p>
                  <p className="text-xs text-gray-500">Excel format • 2.1 MB</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Templates
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Settings className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Mobile App</h3>
                  <p className="text-sm text-gray-600">Android app for field data collection</p>
                  <p className="text-xs text-gray-500">Version 1.4 • 45 MB</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download APK
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8 text-orange-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Security Guidelines</h3>
                  <p className="text-sm text-gray-600">Best practices for data security</p>
                  <p className="text-xs text-gray-500">PDF format • 1.2 MB</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderCommunity = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">User Forum</h3>
                  <p className="text-sm text-gray-600">Connect with other MEL System users</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Join our community forum to ask questions, share best practices, and connect with other organizations using the MEL System.
              </p>
              <Button className="w-full" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Knowledge Base</h3>
                  <p className="text-sm text-gray-600">Searchable articles and guides</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Browse our comprehensive knowledge base with step-by-step guides, troubleshooting tips, and best practices.
              </p>
              <Button className="w-full" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search Articles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Email Support</h3>
                  <p className="text-sm text-gray-600">Get help via email</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Send us an email with your questions or issues. We typically respond within 24 hours during business days.
              </p>
              <Button className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                support@kcson.org
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Phone className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone Support</h3>
                  <p className="text-sm text-gray-600">Speak directly with our team</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Call our support team for urgent issues or complex questions. Available Monday-Friday, 8 AM - 5 PM EAT.
              </p>
              <Button className="w-full" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                +256 75 345 678
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <Input placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input placeholder="your.email@organization.org" type="email" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Low - General question</option>
                <option>Medium - System issue</option>
                <option>High - Unable to work</option>
                <option>Critical - System down</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md" 
                rows="4" 
                placeholder="Please describe your issue in detail..."
              ></textarea>
            </div>
            <Button className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="John Mukisa" userRole="M&E Officer" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
                <p className="text-gray-600">Documentation, tutorials, and support resources for the MEL System</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {/* Help Navigation */}
              <div>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {helpNavigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                              activeSection === item.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveSection(item.id)}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="col-span-3">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}