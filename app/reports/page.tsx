'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  Calendar, 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Filter, 
  Clock, 
  AlertCircle, 
  BookOpen,
  X,
  Send,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  MapPin,
  RefreshCw,
  Mail,
  Settings,
  Copy,
  Archive
} from "lucide-react"

export default function ReportsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [reportType, setReportType] = useState("project-progress")
  const [template, setTemplate] = useState("standard")
  const [startDate, setStartDate] = useState("2025-01-01")
  const [endDate, setEndDate] = useState("2025-01-31")
  const [department, setDepartment] = useState("all-departments")
  const [reportFilter, setReportFilter] = useState("all-reports")
  const [reportSections, setReportSections] = useState({
    executive: true,
    financial: true,
    activities: true,
    beneficiary: false,
    risk: false,
    recommendations: true
  })

  // Dummy reports data
  const recentReports = [
    {
      id: "RPT-2025-001",
      name: "Q4 2024 Progress Report",
      type: "Project Progress",
      createdBy: "John Mukisa",
      dateCreated: "2025-01-15",
      status: "Approved",
      department: "All Departments",
      fileSize: "2.4 MB",
      downloads: 12
    },
    {
      id: "RPT-2025-002", 
      name: "January Financial Summary",
      type: "Financial",
      createdBy: "Sarah Nakato",
      dateCreated: "2025-01-14",
      status: "Pending",
      department: "Finance",
      fileSize: "1.8 MB",
      downloads: 0
    },
    {
      id: "RPT-2025-003",
      name: "Beneficiary Impact Analysis",
      type: "Impact Assessment",
      createdBy: "James Okello",
      dateCreated: "2025-01-12",
      status: "Draft",
      department: "M&E",
      fileSize: "3.1 MB",
      downloads: 5
    },
    {
      id: "RPT-2025-004",
      name: "Water Project Report",
      type: "Project Progress",
      createdBy: "Mary Nassanga",
      dateCreated: "2025-01-10",
      status: "Approved",
      department: "Nature Resources",
      fileSize: "2.7 MB",
      downloads: 8
    },
    {
      id: "RPT-2025-005",
      name: "Education Quarterly Review",
      type: "Quarterly Report",
      createdBy: "Peter Musoke",
      dateCreated: "2025-01-08",
      status: "Under Review",
      department: "Education",
      fileSize: "2.2 MB",
      downloads: 3
    }
  ]

  // Filter reports based on status
  const filteredReports = recentReports.filter(report => {
    if (reportFilter === "all-reports") return true
    if (reportFilter === "pending") return report.status === "Pending" || report.status === "Under Review"
    if (reportFilter === "approved") return report.status === "Approved"
    return true
  })

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "text-green-600"
      case "Pending": return "text-yellow-600"
      case "Under Review": return "text-blue-600"
      case "Draft": return "text-gray-600"
      case "Rejected": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved": return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pending": return <Clock className="w-4 h-4 text-yellow-600" />
      case "Under Review": return <Eye className="w-4 h-4 text-blue-600" />
      case "Draft": return <Edit className="w-4 h-4 text-gray-600" />
      case "Rejected": return <XCircle className="w-4 h-4 text-red-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const handleSectionChange = (section, checked) => {
    setReportSections({ ...reportSections, [section]: checked })
  }

  const generateReport = () => {
    // Simulate report generation
    const reportData = {
      type: reportType,
      template: template,
      dateRange: `${startDate} to ${endDate}`,
      department: department,
      sections: reportSections,
      generatedAt: new Date().toISOString()
    }
    
    console.log("Generating report with:", reportData)
    
    // Simulate file download
    const reportContent = `Report Generated: ${reportType}\nDate Range: ${startDate} to ${endDate}\nTemplate: ${template}\nDepartment: ${department}\nGenerated: ${new Date().toLocaleString()}`
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${reportType}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const previewReport = () => {
    setShowPreviewModal(true)
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
                <h1 className="text-2xl font-bold text-gray-900">Report Generation</h1>
                <p className="text-gray-600">Create, manage and schedule reports for donors and stakeholders</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setShowScheduleModal(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
                <Button 
                  className="bg-gray-900 hover:bg-gray-800"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </div>
            </div>

            {/* Report Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Generated This Month</p>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-xs text-green-600">↑ 15% from last month</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Scheduled Reports</p>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-gray-500">3 due this week</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-red-600">5 overdue</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Templates Available</p>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-xs text-gray-500">6 custom templates</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Quick Report Builder */}
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Report Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Report Type</label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="project-progress">Project Progress Report</SelectItem>
                            <SelectItem value="financial">Financial Summary</SelectItem>
                            <SelectItem value="beneficiary">Beneficiary Report</SelectItem>
                            <SelectItem value="impact">Impact Assessment</SelectItem>
                            <SelectItem value="quarterly">Quarterly Review</SelectItem>
                            <SelectItem value="annual">Annual Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Template</label>
                        <Select value={template} onValueChange={setTemplate}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Template</SelectItem>
                            <SelectItem value="donor">Donor Template</SelectItem>
                            <SelectItem value="internal">Internal Template</SelectItem>
                            <SelectItem value="eu-format">EU Format</SelectItem>
                            <SelectItem value="custom">Custom Template</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
                        <Input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">End Date</label>
                        <Input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Department/Project</label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-departments">All Departments</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="livelihood">Livelihood</SelectItem>
                          <SelectItem value="nature">Nature Resources</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="me">M&E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Include Sections</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="executive" 
                              checked={reportSections.executive}
                              onCheckedChange={(checked) => handleSectionChange('executive', checked)}
                            />
                            <label htmlFor="executive" className="text-sm">
                              Executive Summary
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="financial" 
                              checked={reportSections.financial}
                              onCheckedChange={(checked) => handleSectionChange('financial', checked)}
                            />
                            <label htmlFor="financial" className="text-sm">
                              Financial Overview
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="activities" 
                              checked={reportSections.activities}
                              onCheckedChange={(checked) => handleSectionChange('activities', checked)}
                            />
                            <label htmlFor="activities" className="text-sm">
                              Activities Progress
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="beneficiary" 
                              checked={reportSections.beneficiary}
                              onCheckedChange={(checked) => handleSectionChange('beneficiary', checked)}
                            />
                            <label htmlFor="beneficiary" className="text-sm">
                              Beneficiary Data
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="risk" 
                              checked={reportSections.risk}
                              onCheckedChange={(checked) => handleSectionChange('risk', checked)}
                            />
                            <label htmlFor="risk" className="text-sm">
                              Risk Assessment
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="recommendations" 
                              checked={reportSections.recommendations}
                              onCheckedChange={(checked) => handleSectionChange('recommendations', checked)}
                            />
                            <label htmlFor="recommendations" className="text-sm">
                              Recommendations
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={previewReport}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="bg-gray-900 hover:bg-gray-800" onClick={generateReport}>
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Reports */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Reports
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal">{filteredReports.length} reports</span>
                        <Select value={reportFilter} onValueChange={setReportFilter}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-reports">All Reports</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                        <span>Report Name</span>
                        <span>Type</span>
                        <span>Created By</span>
                        <span>Date</span>
                        <span>Status</span>
                        <span>Actions</span>
                      </div>
                      
                      {filteredReports.map((report) => (
                        <div key={report.id} className="grid grid-cols-6 gap-4 text-sm py-3 border-b hover:bg-gray-50">
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-xs text-gray-500">{report.fileSize} • {report.downloads} downloads</p>
                          </div>
                          <span>{report.type}</span>
                          <span>{report.createdBy}</span>
                          <span>{report.dateCreated}</span>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            <span className={getStatusColor(report.status)}>{report.status}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Report Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Report Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-sm">EU Donor Report</p>
                        <p className="text-xs text-gray-500">Annual format</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-sm">Financial Summary</p>
                        <p className="text-xs text-gray-500">Quarterly format</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-sm">Project Progress</p>
                        <p className="text-xs text-gray-500">Monthly format</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Monthly Progress</p>
                        <p className="text-xs text-gray-500">Due Jan 30, 2025</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">Due Soon</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Quarterly Financial</p>
                        <p className="text-xs text-gray-500">Due Feb 15, 2025</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded">Scheduled</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Annual Report</p>
                        <p className="text-xs text-gray-500">Due Mar 31, 2025</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">Scheduled</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Report</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Report Name</label>
                  <Input placeholder="Enter report name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress">Progress Report</SelectItem>
                      <SelectItem value="financial">Financial Report</SelectItem>
                      <SelectItem value="impact">Impact Assessment</SelectItem>
                      <SelectItem value="quarterly">Quarterly Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea placeholder="Report description..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Template</SelectItem>
                      <SelectItem value="donor">Donor Template</SelectItem>
                      <SelectItem value="custom">Custom Template</SelectItem>
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
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="livelihood">Livelihood</SelectItem>
                      <SelectItem value="nature">Nature Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowCreateModal(false)}>
                Create Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Schedule Report</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowScheduleModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Report Template</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Progress</SelectItem>
                    <SelectItem value="quarterly">Quarterly Financial</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <Input type="time" defaultValue="09:00" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <Textarea placeholder="Enter email addresses..." rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-send" />
                <label htmlFor="auto-send" className="text-sm">
                  Auto-send when generated
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowScheduleModal(false)}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Report Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreviewModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h4 className="text-xl font-bold mb-4">{reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <p className="text-sm text-gray-600 mb-4">Report Period: {startDate} to {endDate}</p>
                
                {reportSections.executive && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Executive Summary
                    </h5>
                    <p className="text-sm text-gray-700">This section provides a high-level overview of the project progress, key achievements, and critical issues during the reporting period...</p>
                  </div>
                )}

                {reportSections.financial && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Financial Overview
                    </h5>
                    <p className="text-sm text-gray-700">Financial performance metrics, budget utilization, and expenditure analysis...</p>
                  </div>
                )}

                {reportSections.activities && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Activities Progress
                    </h5>
                    <p className="text-sm text-gray-700">Detailed progress on planned activities, milestones achieved, and implementation status...</p>
                  </div>
                )}

                {reportSections.beneficiary && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Beneficiary Data
                    </h5>
                    <p className="text-sm text-gray-700">Comprehensive beneficiary statistics, demographics, and service delivery data...</p>
                  </div>
                )}

                {reportSections.recommendations && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Recommendations
                    </h5>
                    <p className="text-sm text-gray-700">Strategic recommendations for improved performance and program enhancement...</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowPreviewModal(false)}>
                Close Preview
              </Button>
              <Button className="flex-1" onClick={() => {
                setShowPreviewModal(false)
                generateReport()
              }}>
                <Download className="w-4 h-4 mr-2" />
                Generate Full Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}