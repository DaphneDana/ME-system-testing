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
  Bell, 
  Database, 
  Lock, 
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Globe,
  Calendar,
  Clock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Upload,
  X,
  Check,
  UserPlus,
  UserMinus,
  FileText,
  HardDrive,
  Wifi,
  WifiOff
} from "lucide-react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("organization")
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
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
    system: {
      autoSave: true,
      offlineMode: true,
      emailNotifications: true,
      dataValidation: true,
      autoBackup: false,
      sessionTimeout: 30
    },
    notifications: {
      email: true,
      sms: false,
      inApp: true,
      reportReminders: true,
      deadlineAlerts: true,
      dataQualityAlerts: true
    },
    security: {
      twoFactorAuth: false,
      passwordComplexity: true,
      sessionSecurity: true,
      ipRestriction: false,
      loginAttempts: 5
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
      system: settings.system,
      regional: settings.regional,
      users: users.length,
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

  const sections = [
    { id: "organization", label: "Organization", icon: Settings },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "permissions", label: "Permissions", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "data", label: "Data & Backup", icon: Database },
    { id: "system", label: "System", icon: Settings },
    { id: "security", label: "Security", icon: Lock }
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

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <Switch 
              checked={settings.notifications.email}
              onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <Switch 
              checked={settings.notifications.sms}
              onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">In-App Notifications</p>
              <p className="text-sm text-gray-500">Show notifications within the application</p>
            </div>
            <Switch 
              checked={settings.notifications.inApp}
              onCheckedChange={(checked) => updateSetting('notifications', 'inApp', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Report Reminders</p>
              <p className="text-sm text-gray-500">Reminders for upcoming report deadlines</p>
            </div>
            <Switch 
              checked={settings.notifications.reportReminders}
              onCheckedChange={(checked) => updateSetting('notifications', 'reportReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Quality Alerts</p>
              <p className="text-sm text-gray-500">Alerts for data quality issues</p>
            </div>
            <Switch 
              checked={settings.notifications.dataQualityAlerts}
              onCheckedChange={(checked) => updateSetting('notifications', 'dataQualityAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">SMTP Server</label>
              <Input defaultValue="smtp.gmail.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Port</label>
              <Input defaultValue="587" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Username</label>
              <Input defaultValue="notifications@kcson.org" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <label className="text-sm">Use TLS encryption</label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDataBackupSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Backups</p>
              <p className="text-sm text-gray-500">Schedule automatic data backups</p>
            </div>
            <Switch 
              checked={settings.system.autoBackup}
              onCheckedChange={(checked) => updateSetting('system', 'autoBackup', checked)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Backup Frequency</label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Backup Storage Location</label>
            <Select defaultValue="cloud">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Server</SelectItem>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
                <SelectItem value="both">Both Local and Cloud</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Create Backup Now
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Restore from Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Database Size</p>
                  <p className="text-sm text-gray-500">Current usage: 2.4 GB</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">75% Used</p>
                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Document Storage</p>
                  <p className="text-sm text-gray-500">Reports and files: 856 MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-save Forms</p>
              <p className="text-sm text-gray-500">Automatically save form data every 30 seconds</p>
            </div>
            <Switch 
              checked={settings.system.autoSave}
              onCheckedChange={(checked) => updateSetting('system', 'autoSave', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Offline Mode</p>
              <p className="text-sm text-gray-500">Enable offline data collection and sync</p>
            </div>
            <Switch 
              checked={settings.system.offlineMode}
              onCheckedChange={(checked) => updateSetting('system', 'offlineMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Validation</p>
              <p className="text-sm text-gray-500">Strict validation for data entry forms</p>
            </div>
            <Switch 
              checked={settings.system.dataValidation}
              onCheckedChange={(checked) => updateSetting('system', 'dataValidation', checked)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Session Timeout (minutes)</label>
            <Input 
              type="number"
              value={settings.system.sessionTimeout}
              onChange={(e) => updateSetting('system', 'sessionTimeout', parseInt(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Items per Page</label>
            <Select defaultValue="25">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cache Optimization</p>
              <p className="text-sm text-gray-500">Enable browser caching for better performance</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Require 2FA for all user logins</p>
            </div>
            <Switch 
              checked={settings.security.twoFactorAuth}
              onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password Complexity</p>
              <p className="text-sm text-gray-500">Enforce strong password requirements</p>
            </div>
            <Switch 
              checked={settings.security.passwordComplexity}
              onCheckedChange={(checked) => updateSetting('security', 'passwordComplexity', checked)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Maximum Login Attempts</label>
            <Input 
              type="number"
              value={settings.security.loginAttempts}
              onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">IP Address Restrictions</p>
              <p className="text-sm text-gray-500">Limit access to specific IP addresses</p>
            </div>
            <Switch 
              checked={settings.security.ipRestriction}
              onCheckedChange={(checked) => updateSetting('security', 'ipRestriction', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Password Policy</p>
                  <p className="text-sm text-gray-500">All users comply with password requirements</p>
                </div>
              </div>
              <span className="text-sm text-green-600">Passed</span>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Session Security</p>
                  <p className="text-sm text-gray-500">3 users with extended sessions</p>
                </div>
              </div>
              <span className="text-sm text-yellow-600">Warning</span>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Data Encryption</p>
                  <p className="text-sm text-gray-500">All sensitive data properly encrypted</p>
                </div>
              </div>
              <span className="text-sm text-green-600">Passed</span>
            </div>

            <Button className="w-full" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Security Scan
            </Button>
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
      case "notifications": return renderNotificationsSettings()
      case "data": return renderDataBackupSettings()
      case "system": return renderSystemSettings()
      case "security": return renderSecuritySettings()
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
    </div>
  )
}