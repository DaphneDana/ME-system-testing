'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Download, 
  Save, 
  Settings, 
  Users, 
  Shield, 
  User,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  UserPlus,
  Copy,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Layout,
  MoreHorizontal,
  Upload
} from "lucide-react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("organization")
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [searchTemplates, setSearchTemplates] = useState("")
  const [settings, setSettings] = useState({
    organization: {
      name: "Kagera Civil Society Organizations Network",
      abbreviation: "KCSON",
      description: "A network of 85+ civil society organizations working to strengthen community development in the Kagera region...",
      registrationNumber: "NGO-REG-2018-001",
      taxId: "TIN-123456789",
      email: "info@kcson.org",
      phone: "+256 75 345 678",
      address: "P.O. Box 1234, Bukoba, Kagera Region, Tanzania"
    },
    regional: {
      language: "english",
      currency: "ugx",
      timezone: "eat",
      dateFormat: "ddmmyyyy",
      numberFormat: "comma",
      fiscalYear: "jan-dec"
    },
    profile: {
      name: "John Mukisa",
      email: "john.mukisa@kcson.org",
      phone: "+256 701 234567",
      position: "M&E Officer",
      department: "M&E",
      joinDate: "2023-01-15",
      profilePhoto: null,
      emailNotifications: true,
      smsNotifications: false,
      theme: "light",
      language: "english"
    }
  })

  // Dummy users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Mukisa",
      email: "john.mukisa@kcson.org",
      role: "M&E Officer",
      department: "M&E",
      status: "Active",
      lastLogin: "2025-01-20 09:30"
    },
    {
      id: 2,
      name: "Sarah Nakato",
      email: "sarah.nakato@kcson.org",
      role: "Executive Director",
      department: "Management",
      status: "Active",
      lastLogin: "2025-01-20 08:45"
    },
    {
      id: 3,
      name: "James Okello",
      email: "james.okello@kcson.org",
      role: "Finance Manager",
      department: "Finance",
      status: "Active",
      lastLogin: "2025-01-19 16:20"
    },
    {
      id: 4,
      name: "Mary Nassanga",
      email: "mary.nassanga@kcson.org",
      role: "Project Coordinator",
      department: "Projects",
      status: "Inactive",
      lastLogin: "2025-01-15 14:10"
    }
  ])

  // Templates data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Water Access Project Report",
      category: "Nature Resources",
      type: "Project Report",
      description: "Standard report template for water access initiatives",
      usageCount: 12,
      lastUsed: "2025-01-18",
      createdBy: "John Mukisa",
      status: "Active"
    },
    {
      id: 2,
      name: "Education Impact Assessment",
      category: "Education",
      type: "Assessment Form",
      description: "Template for measuring educational project impact",
      usageCount: 8,
      lastUsed: "2025-01-15",
      createdBy: "Sarah Nakato",
      status: "Active"
    },
    {
      id: 3,
      name: "Livelihood Training Evaluation",
      category: "Livelihood",
      type: "Evaluation Form",
      description: "Post-training evaluation template for livelihood programs",
      usageCount: 15,
      lastUsed: "2025-01-20",
      createdBy: "Mary Nassanga",
      status: "Active"
    },
    {
      id: 4,
      name: "Monthly Financial Report",
      category: "Finance",
      type: "Financial Report",
      description: "Standard monthly financial reporting template",
      usageCount: 24,
      lastUsed: "2025-01-19",
      createdBy: "James Okello",
      status: "Active"
    },
    {
      id: 5,
      name: "Beneficiary Registration",
      category: "General",
      type: "Registration Form",
      description: "Standard form for new beneficiary registration",
      usageCount: 45,
      lastUsed: "2025-01-20",
      createdBy: "John Mukisa",
      status: "Active"
    }
  ])

  const saveSettings = () => {
    // Simulate saving settings
    console.log("Saving settings:", settings)
    
    // Create a success notification effect
    const successMessage = document.createElement('div')
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    successMessage.textContent = 'Settings saved successfully!'
    document.body.appendChild(successMessage)
    
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 3000)
  }

  const exportSettings = () => {
    // Create exportable settings data
    const exportData = {
      organization: settings.organization,
      regional: settings.regional,
      users: users.length,
      templates: templates.length,
      exportDate: new Date().toISOString(),
      version: "1.0"
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kcson-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleTemplateAction = (action: string, template: any) => {
    switch (action) {
      case "view":
        console.log("Viewing template:", template.id)
        break
      case "edit":
        console.log("Editing template:", template.id)
        break
      case "duplicate":
        console.log("Duplicating template:", template.id)
        break
      case "delete":
        console.log("Deleting template:", template.id)
        break
    }
  }

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTemplates.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTemplates.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTemplates.toLowerCase())
  )

  const sections = [
    { id: "organization", label: "Organization", icon: Settings },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "permissions", label: "Permissions", icon: Shield },
    { id: "profile", label: "Profile", icon: User },
    { id: "templates", label: "Templates", icon: FileText }
  ]

  const renderOrganizationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Organization Name</label>
              <Input 
                value={settings.organization.name}
                onChange={(e) => updateSetting('organization', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Abbreviation</label>
              <Input 
                value={settings.organization.abbreviation}
                onChange={(e) => updateSetting('organization', 'abbreviation', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
            <Textarea
              value={settings.organization.description}
              onChange={(e) => updateSetting('organization', 'description', e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Registration Number</label>
              <Input 
                value={settings.organization.registrationNumber}
                onChange={(e) => updateSetting('organization', 'registrationNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Tax ID</label>
              <Input 
                value={settings.organization.taxId}
                onChange={(e) => updateSetting('organization', 'taxId', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Contact Email</label>
              <Input 
                type="email"
                value={settings.organization.email}
                onChange={(e) => updateSetting('organization', 'email', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <Input 
                value={settings.organization.phone}
                onChange={(e) => updateSetting('organization', 'phone', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Physical Address</label>
            <Textarea 
              value={settings.organization.address}
              onChange={(e) => updateSetting('organization', 'address', e.target.value)}
              rows={3} 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional & Language Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Default Language</label>
              <Select value={settings.regional.language} onValueChange={(value) => updateSetting('regional', 'language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="swahili">Swahili</SelectItem>
                  <SelectItem value="luganda">Luganda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Currency</label>
              <Select value={settings.regional.currency} onValueChange={(value) => updateSetting('regional', 'currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ugx">UGX - Ugandan Shilling</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time Zone</label>
              <Select value={settings.regional.timezone} onValueChange={(value) => updateSetting('regional', 'timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eat">EAT (UTC+3)</SelectItem>
                  <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                  <SelectItem value="cet">CET (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            User Management
            <Button onClick={() => setShowAddUserModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Department</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-6 gap-4 text-sm py-3 border-b hover:bg-gray-50">
                <span className="font-medium">{user.name}</span>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <span>{user.department}</span>
                <span className={`${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Executive Director', 'M&E Officer', 'Finance Manager', 'Project Coordinator'].map((role) => (
              <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{role}</p>
                  <p className="text-sm text-gray-500">Full access to {role.toLowerCase()} functions</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Permissions
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPermissionsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {['Projects', 'Finance', 'Beneficiaries', 'Reports', 'Settings'].map((module) => (
              <div key={module} className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">{module} Module</h4>
                <div className="grid grid-cols-4 gap-4">
                  {['Executive Director', 'M&E Officer', 'Finance Manager', 'Project Coordinator'].map((role) => (
                    <div key={role} className="space-y-2">
                      <p className="text-sm font-medium">{role}</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox defaultChecked={role === 'Executive Director'} />
                          <label className="text-xs">View</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox defaultChecked={role === 'Executive Director' || (module === 'Finance' && role === 'Finance Manager')} />
                          <label className="text-xs">Edit</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox defaultChecked={role === 'Executive Director'} />
                          <label className="text-xs">Delete</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
              <Input 
                value={settings.profile.name}
                onChange={(e) => updateSetting('profile', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
              <Input 
                type="email"
                value={settings.profile.email}
                onChange={(e) => updateSetting('profile', 'email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <Input 
                value={settings.profile.phone}
                onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Position</label>
              <Input 
                value={settings.profile.position}
                onChange={(e) => updateSetting('profile', 'position', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
              <Select value={settings.profile.department} onValueChange={(value) => updateSetting('profile', 'department', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">M&E</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Language Preference</label>
              <Select value={settings.profile.language} onValueChange={(value) => updateSetting('profile', 'language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="swahili">Swahili</SelectItem>
                  <SelectItem value="luganda">Luganda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              Change Password
            </Button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Current Password</label>
                <div className="relative">
                  <Input type="password" placeholder="Enter current password" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <div className="flex gap-2">
                <Button size="sm">Update Password</Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPasswordFields(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Switch 
              checked={settings.profile.emailNotifications}
              onCheckedChange={(checked) => updateSetting('profile', 'emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive updates via SMS</p>
            </div>
            <Switch 
              checked={settings.profile.smsNotifications}
              onCheckedChange={(checked) => updateSetting('profile', 'smsNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTemplatesSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Templates Library
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search templates..." 
                  className="pl-10 w-64" 
                  value={searchTemplates}
                  onChange={(e) => setSearchTemplates(e.target.value)}
                />
              </div>
              <Button onClick={() => setShowTemplateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
              <div className="col-span-2">Template Name</div>
              <span>Category</span>
              <span>Type</span>
              <span>Usage</span>
              <span>Last Used</span>
              <span>Created By</span>
              <span>Actions</span>
            </div>
            
            {filteredTemplates.map((template) => (
              <div key={template.id} className="grid grid-cols-8 gap-4 text-sm py-3 border-b hover:bg-gray-50 items-center">
                <div className="col-span-2">
                  <p className="font-medium">{template.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>
                <span className="text-gray-700">{template.category}</span>
                <span className="text-gray-700">{template.type}</span>
                <span className="text-blue-600">{template.usageCount} times</span>
                <span className="text-gray-700">{template.lastUsed}</span>
                <span className="text-gray-700">{template.createdBy}</span>
                <div>
                  <Select onValueChange={(value) => handleTemplateAction(value, template)}>
                    <SelectTrigger className="w-8 h-8 p-0 border-none hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </div>
                      </SelectItem>
                      <SelectItem value="edit">
                        <div className="flex items-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </div>
                      </SelectItem>
                      <SelectItem value="duplicate">
                        <div className="flex items-center">
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </div>
                      </SelectItem>
                      <SelectItem value="delete">
                        <div className="flex items-center">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {['Education', 'Livelihood', 'Nature Resources', 'Finance', 'General'].map((category) => {
              const categoryTemplates = templates.filter(t => t.category === category)
              return (
                <div key={category} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium">{category}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {categoryTemplates.length} templates
                  </p>
                  <div className="space-y-1">
                    {categoryTemplates.slice(0, 3).map((template) => (
                      <p key={template.id} className="text-xs text-gray-500 truncate">
                        • {template.name}
                      </p>
                    ))}
                    {categoryTemplates.length > 3 && (
                      <p className="text-xs text-gray-400">
                        +{categoryTemplates.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch(activeSection) {
      case "organization": return renderOrganizationSettings()
      case "users": return renderUsersSettings()
      case "permissions": return renderPermissionsSettings()
      case "profile": return renderProfileSettings()
      case "templates": return renderTemplatesSettings()
      default: return renderOrganizationSettings()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="John Mukisa" userRole="M&E Officer" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
                <p className="text-gray-600">Manage organization profile, users, and system configuration</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={exportSettings}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800" onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {sections.map((section) => {
                        const Icon = section.icon
                        return (
                          <div
                            key={section.id}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                              activeSection === section.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{section.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Settings Content */}
              <div className="col-span-3">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddUserModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input placeholder="user@kcson.org" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me-officer">M&E Officer</SelectItem>
                    <SelectItem value="finance-manager">Finance Manager</SelectItem>
                    <SelectItem value="project-coordinator">Project Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">M&E</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddUserModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddUserModal(false)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Template</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTemplateModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Name</label>
                  <Input placeholder="Enter template name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="livelihood">Livelihood</SelectItem>
                      <SelectItem value="nature">Nature Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="form">Form</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="evaluation">Evaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Based On</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Start from scratch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scratch">Start from scratch</SelectItem>
                      <SelectItem value="existing">Copy existing template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea placeholder="Describe the template purpose and usage..." rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowTemplateModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowTemplateModal(false)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}