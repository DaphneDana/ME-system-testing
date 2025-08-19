'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Upload, 
  Plus, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Calendar, 
  AlertTriangle,
  Filter,
  Download,
  Search,
  Eye,
  Edit,
  FileText,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from "lucide-react"

export default function MEPage() {
  const [activeTab, setActiveTab] = useState("indicators")
  const [showImportModal, setShowImportModal] = useState(false)
  const [showNewActivityModal, setShowNewActivityModal] = useState(false)
  const [activitiesPage, setActivitiesPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Dummy data for indicators
  const indicators = [
    {
      id: 1,
      name: "Number of Farmers Trained",
      target: 500,
      current: 385,
      percentage: 77,
      status: "on-track",
      department: "Livelihood",
      deadline: "2025-06-30"
    },
    {
      id: 2,
      name: "Households with Improved Income",
      target: 200,
      current: 145,
      percentage: 72,
      status: "on-track",
      department: "Livelihood",
      deadline: "2025-08-31"
    },
    {
      id: 3,
      name: "Conservation Areas Protected",
      target: 15,
      current: 8,
      percentage: 53,
      status: "behind",
      department: "Nature Resources",
      deadline: "2025-12-31"
    },
    {
      id: 4,
      name: "Youth Enrolled in Skills Training",
      target: 300,
      current: 255,
      percentage: 85,
      status: "ahead",
      department: "Education",
      deadline: "2025-05-31"
    }
  ]

  // Dummy activities data
  const allActivities = [
    {
      id: 1,
      date: "Jan 15, 2025",
      activity: "Farmer Training Workshop",
      department: "Livelihood",
      location: "Rakai District",
      participants: 45,
      status: "completed",
      project: "Agricultural Development"
    },
    {
      id: 2,
      date: "Jan 14, 2025",
      activity: "Community Sensitization",
      department: "Nature Resources",
      location: "Masaka District",
      participants: 78,
      status: "completed",
      project: "Forest Conservation"
    },
    {
      id: 3,
      date: "Jan 13, 2025",
      activity: "School Monitoring Visit",
      department: "Education",
      location: "Lyantonde District",
      participants: 12,
      status: "pending-review",
      project: "School Infrastructure"
    },
    {
      id: 4,
      date: "Jan 12, 2025",
      activity: "Baseline Data Collection",
      department: "Livelihood",
      location: "Kalungu District",
      participants: 25,
      status: "in-progress",
      project: "Microfinance Support"
    },
    {
      id: 5,
      date: "Jan 11, 2025",
      activity: "Water Point Assessment",
      department: "Nature Resources",
      location: "Sembabule District",
      participants: 8,
      status: "completed",
      project: "Water Access Initiative"
    },
    {
      id: 6,
      date: "Jan 10, 2025",
      activity: "Youth Skills Training",
      department: "Education",
      location: "Lwengo District",
      participants: 32,
      status: "completed",
      project: "Youth Empowerment"
    }
  ]

  // Data quality issues
  const dataQualityIssues = [
    {
      id: 1,
      type: "Missing Data",
      description: "Baseline data missing for 12 beneficiaries",
      project: "Water Resources Project",
      severity: "high",
      date: "2 days ago"
    },
    {
      id: 2,
      type: "Inconsistent Dates",
      description: "Reporting dates don't match activity implementation",
      project: "Education Department",
      severity: "medium",
      date: "5 hours ago"
    },
    {
      id: 3,
      type: "Duplicate Entries",
      description: "15 duplicate beneficiary entries detected",
      project: "Livelihood Program",
      severity: "medium",
      date: "1 day ago"
    },
    {
      id: 4,
      type: "Data Validation",
      description: "Geographic coordinates outside project area",
      project: "Forest Conservation",
      severity: "low",
      date: "3 hours ago"
    }
  ]

  // Calendar events
  const calendarEvents = [
    {
      id: 1,
      title: "Quarterly Report Due",
      date: "2025-01-30",
      type: "deadline",
      priority: "high"
    },
    {
      id: 2,
      title: "Field Monitoring Visit",
      date: "2025-01-25",
      type: "activity",
      priority: "medium"
    },
    {
      id: 3,
      title: "Baseline Survey Launch",
      date: "2025-02-05",
      type: "survey",
      priority: "high"
    },
    {
      id: 4,
      title: "Stakeholder Meeting",
      date: "2025-02-10",
      type: "meeting",
      priority: "medium"
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "text-green-600"
      case "in-progress": return "text-blue-600"
      case "pending-review": return "text-yellow-600"
      case "cancelled": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress": return <Clock className="w-4 h-4 text-blue-600" />
      case "pending-review": return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "cancelled": return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const renderIndicators = () => (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search indicators..." className="pl-10" />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="livelihood">Livelihood</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="nature">Nature Resources</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {indicators.map((indicator) => (
                <div key={indicator.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{indicator.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      indicator.status === "ahead" ? "bg-green-100 text-green-700" :
                      indicator.status === "on-track" ? "bg-blue-100 text-blue-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {indicator.status === "ahead" ? "Ahead" : 
                       indicator.status === "on-track" ? "On Track" : "Behind"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{indicator.department}</span>
                    <span>{indicator.percentage}%</span>
                  </div>
                  <Progress value={indicator.percentage} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: {indicator.target} | Current: {indicator.current}</span>
                    <span>Due: {indicator.deadline}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataQualityIssues.slice(0, 3).map((issue) => (
                <div key={issue.id} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{issue.description}</p>
                    <p className="text-xs text-gray-600">{issue.project}</p>
                    <p className="text-xs text-gray-500">{issue.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarEvents.filter(e => e.type === "deadline").map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">Due {event.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.priority === "high" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {new Date(event.date) < new Date() ? "Overdue" : 
                     Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)) + " days"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )

  const renderActivities = () => {
    const itemsPerPage = 5
    const filteredActivities = allActivities.filter(activity => 
      activity.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
    const startIndex = (activitiesPage - 1) * itemsPerPage
    const currentActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Activity Management</h2>
            <p className="text-sm text-gray-600">Track and monitor field activities</p>
          </div>
          <Button onClick={() => setShowNewActivityModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Activity
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search activities..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending-review">Pending Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activities
              <span className="text-sm font-normal">{filteredActivities.length} total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                <span>Date</span>
                <span>Activity</span>
                <span>Department</span>
                <span>Location</span>
                <span>Participants</span>
                <span>Status</span>
              </div>
              
              {currentActivities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-6 gap-4 text-sm py-3 border-b hover:bg-gray-50">
                  <span>{activity.date}</span>
                  <span className="font-medium">{activity.activity}</span>
                  <span>{activity.department}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activity.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {activity.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(activity.status)}
                    <span className={getStatusColor(activity.status)}>
                      {activity.status.replace('-', ' ')}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredActivities.length)} of {filteredActivities.length}
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActivitiesPage(Math.max(1, activitiesPage - 1))}
                  disabled={activitiesPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-500 px-2 py-1">
                  {activitiesPage} / {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActivitiesPage(Math.min(totalPages, activitiesPage + 1))}
                  disabled={activitiesPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderDataQuality = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Data Quality Management</h2>
          <p className="text-sm text-gray-600">Monitor and improve data quality across projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Data Completeness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">94%</p>
              <p className="text-sm text-gray-600">Complete records</p>
              <Progress value={94} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Data Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">97%</p>
              <p className="text-sm text-gray-600">Accurate entries</p>
              <Progress value={97} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Timeliness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">89%</p>
              <p className="text-sm text-gray-600">On-time reporting</p>
              <Progress value={89} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Quality Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataQualityIssues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        issue.severity === "high" ? "bg-red-500" :
                        issue.severity === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`} />
                      <h4 className="font-medium">{issue.type}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      issue.severity === "high" ? "bg-red-100 text-red-700" :
                      issue.severity === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{issue.project}</span>
                    <span>{issue.date}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      <Check className="w-3 h-3 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Quality by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Water Access Initiative</span>
                  <span>96%</span>
                </div>
                <Progress value={96} />
                <p className="text-xs text-gray-500 mt-1">156 records validated</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Education Program</span>
                  <span>92%</span>
                </div>
                <Progress value={92} />
                <p className="text-xs text-gray-500 mt-1">203 records validated</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Forest Conservation</span>
                  <span>88%</span>
                </div>
                <Progress value={88} />
                <p className="text-xs text-gray-500 mt-1">87 records validated</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Livelihood Support</span>
                  <span>94%</span>
                </div>
                <Progress value={94} />
                <p className="text-xs text-gray-500 mt-1">145 records validated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">M&E Calendar</h2>
          <p className="text-sm text-gray-600">Schedule and track M&E activities and deadlines</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="quarter">Quarter View</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === "deadline" ? "bg-red-500" :
                    event.type === "activity" ? "bg-blue-500" :
                    event.type === "survey" ? "bg-green-500" : "bg-yellow-500"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {event.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-600" />
              Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Field Visits (35%)</span>
                <span className="font-medium">14 scheduled</span>
              </div>
              <Progress value={35} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Collection (25%)</span>
                <span className="font-medium">10 scheduled</span>
              </div>
              <Progress value={25} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Reporting (20%)</span>
                <span className="font-medium">8 scheduled</span>
              </div>
              <Progress value={20} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Meetings (20%)</span>
                <span className="font-medium">8 scheduled</span>
              </div>
              <Progress value={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            <div className="font-medium text-gray-500 py-2">Sun</div>
            <div className="font-medium text-gray-500 py-2">Mon</div>
            <div className="font-medium text-gray-500 py-2">Tue</div>
            <div className="font-medium text-gray-500 py-2">Wed</div>
            <div className="font-medium text-gray-500 py-2">Thu</div>
            <div className="font-medium text-gray-500 py-2">Fri</div>
            <div className="font-medium text-gray-500 py-2">Sat</div>

            {/* Calendar days with events */}
            <div className="py-2 text-gray-400">29</div>
            <div className="py-2 text-gray-400">30</div>
            <div className="py-2 text-gray-400">31</div>
            <div className="py-2">1</div>
            <div className="py-2">2</div>
            <div className="py-2">3</div>
            <div className="py-2">4</div>

            <div className="py-2">5</div>
            <div className="py-2">6</div>
            <div className="py-2">7</div>
            <div className="py-2">8</div>
            <div className="py-2">9</div>
            <div className="py-2">10</div>
            <div className="py-2">11</div>

            <div className="py-2">12</div>
            <div className="py-2">13</div>
            <div className="py-2">14</div>
            <div className="py-2">15</div>
            <div className="py-2">16</div>
            <div className="py-2">17</div>
            <div className="py-2">18</div>

            <div className="py-2">19</div>
            <div className="py-2">20</div>
            <div className="py-2">21</div>
            <div className="py-2">22</div>
            <div className="py-2">23</div>
            <div className="py-2">24</div>
            <div className="py-2 bg-blue-100 rounded">25</div>

            <div className="py-2">26</div>
            <div className="py-2">27</div>
            <div className="py-2">28</div>
            <div className="py-2">29</div>
            <div className="py-2 bg-red-100 rounded">30</div>
            <div className="py-2">31</div>
            <div className="py-2 text-gray-400">1</div>
          </div>
        </CardContent>
      </Card>
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Monitoring & Evaluation</h1>
                <p className="text-gray-600">Track indicators, activities, and data quality</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setShowImportModal(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <Button 
                  className="bg-gray-900 hover:bg-gray-800"
                  onClick={() => setShowNewActivityModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Activity
                </Button>
              </div>
            </div>

            {/* M&E Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Indicators</p>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-gray-500">18 on track</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Data Quality Score</p>
                      <p className="text-2xl font-bold">97%</p>
                      <p className="text-xs text-green-600">↑ 5% this month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Activities This Month</p>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-gray-500">12 pending review</p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-red-600">3 overdue</p>
                    </div>
                    <Calendar className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b">
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "indicators" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("indicators")}
              >
                Indicators
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "activities" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("activities")}
              >
                Activities
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "dataquality" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("dataquality")}
              >
                Data Quality
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "calendar" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("calendar")}
              >
                Calendar
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "indicators" && renderIndicators()}
            {activeTab === "activities" && renderActivities()}
            {activeTab === "dataquality" && renderDataQuality()}
            {activeTab === "calendar" && renderCalendar()}
          </div>
        </main>
      </div>

      {/* Import Data Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Import Data</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beneficiaries">Beneficiary Data</SelectItem>
                    <SelectItem value="activities">Activity Records</SelectItem>
                    <SelectItem value="indicators">Indicator Values</SelectItem>
                    <SelectItem value="surveys">Survey Responses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">Water Access Initiative</SelectItem>
                    <SelectItem value="education">Education Program</SelectItem>
                    <SelectItem value="livelihood">Livelihood Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">File Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop your file here</p>
                  <p className="text-xs text-gray-500">Supports CSV, Excel files</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setShowImportModal(false)}
              >
                Import Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Activity Modal */}
      {showNewActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Activity Name</label>
                <Input placeholder="Enter activity name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livelihood">Livelihood</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="nature">Nature Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Project</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water Access</SelectItem>
                      <SelectItem value="education">Education Program</SelectItem>
                      <SelectItem value="forest">Forest Conservation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input type="date" defaultValue="2025-01-20" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Participants</label>
                  <Input placeholder="Number of participants" type="number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input placeholder="Activity location" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea placeholder="Activity description..." rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNewActivityModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setShowNewActivityModal(false)}
              >
                Add Activity
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}