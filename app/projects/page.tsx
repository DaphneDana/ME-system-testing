'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  FileText, 
  Archive, 
  Clock, 
  Users, 
  Target, 
  Download,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  Folder,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from "lucide-react"

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedDepartment, setSelectedDepartment] = useState("all-departments")
  const [selectedStatus, setSelectedStatus] = useState("all-status")
  const [searchQuery, setSearchQuery] = useState("")
  const [timelineView, setTimelineView] = useState("all-projects")

  // Dummy project data
  const projects = {
    planning: [
      {
        id: 1,
        name: "Water Access Initiative",
        description: "Improving water access in rural communities",
        department: "Nature Resources",
        progress: 25,
        budget: "€150K",
        startDate: "2025-03-01",
        endDate: "2025-12-31",
        team: 8
      },
      {
        id: 2,
        name: "Farmer Training Program",
        description: "Agricultural training for smallholder farmers",
        department: "Livelihood",
        progress: 15,
        budget: "€80K",
        startDate: "2025-04-01",
        endDate: "2025-11-30",
        team: 5
      }
    ],
    active: [
      {
        id: 3,
        name: "School Infrastructure",
        description: "Building classrooms in rural schools",
        department: "Education",
        progress: 65,
        budget: "€300K",
        startDate: "2024-09-01",
        endDate: "2025-06-30",
        team: 12
      },
      {
        id: 4,
        name: "Microfinance Support",
        description: "Financial inclusion for women groups",
        department: "Livelihood",
        progress: 78,
        budget: "€120K",
        startDate: "2024-08-01",
        endDate: "2025-05-31",
        team: 6
      },
      {
        id: 5,
        name: "Forest Conservation",
        description: "Tree planting and forest protection",
        department: "Nature Resources",
        progress: 45,
        budget: "€200K",
        startDate: "2024-11-01",
        endDate: "2025-08-31",
        team: 10
      }
    ],
    completed: [
      {
        id: 6,
        name: "Adult Literacy Program",
        description: "Basic literacy training for adults",
        department: "Education",
        progress: 100,
        budget: "€95K",
        startDate: "2024-03-01",
        endDate: "2025-01-31",
        team: 7
      },
      {
        id: 7,
        name: "Solar Installation",
        description: "Solar panels for health centers",
        department: "Nature Resources",
        progress: 100,
        budget: "€180K",
        startDate: "2024-06-01",
        endDate: "2024-12-31",
        team: 9
      }
    ]
  }

  // Dummy work plans data
  const workPlans = [
    {
      id: 1,
      name: "Q1 2025 Education Initiatives",
      project: "School Infrastructure",
      activities: 15,
      completed: 12,
      dueDate: "2025-03-31",
      status: "On Track"
    },
    {
      id: 2,
      name: "Water Access Implementation",
      project: "Water Access Initiative",
      activities: 8,
      completed: 2,
      dueDate: "2025-06-30",
      status: "Behind"
    }
  ]

  // Gantt chart data
  const ganttProjects = timelineView === "active" ? projects.active : [...projects.active, ...projects.planning]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <PlayCircle className="w-4 h-4 text-blue-600" />
      case "Planning": return <Clock className="w-4 h-4 text-yellow-600" />
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const renderActiveProjects = () => (
    <>
      {/* Project Columns */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Planning Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Planning</h3>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">{projects.planning.length}</span>
          </div>
          <div className="space-y-4">
            {projects.planning.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Select>
                      <SelectTrigger className="w-8 h-8 p-0 border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view"><Eye className="w-4 h-4 mr-2" />View</SelectItem>
                        <SelectItem value="edit"><Edit className="w-4 h-4 mr-2" />Edit</SelectItem>
                        <SelectItem value="delete"><Trash2 className="w-4 h-4 mr-2" />Delete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{project.department}</span>
                    <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{project.team}</span>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{project.budget}</span>
                    <span>{project.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Active</h3>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">{projects.active.length}</span>
          </div>
          <div className="space-y-4">
            {projects.active.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Select>
                      <SelectTrigger className="w-8 h-8 p-0 border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view"><Eye className="w-4 h-4 mr-2" />View</SelectItem>
                        <SelectItem value="edit"><Edit className="w-4 h-4 mr-2" />Edit</SelectItem>
                        <SelectItem value="delete"><Trash2 className="w-4 h-4 mr-2" />Delete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{project.department}</span>
                    <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{project.team}</span>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{project.budget}</span>
                    <span>{project.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Completed</h3>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">{projects.completed.length}</span>
          </div>
          <div className="space-y-4">
            {projects.completed.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Select>
                      <SelectTrigger className="w-8 h-8 p-0 border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view"><Eye className="w-4 h-4 mr-2" />View</SelectItem>
                        <SelectItem value="report"><FileText className="w-4 h-4 mr-2" />Report</SelectItem>
                        <SelectItem value="archive"><Archive className="w-4 h-4 mr-2" />Archive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{project.department}</span>
                    <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Complete</span>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{project.budget}</span>
                    <span>Completed</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Project Timeline
              <Select value={timelineView} onValueChange={setTimelineView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-projects">All Projects</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Gantt Chart Header */}
              <div className="grid grid-cols-12 gap-1 text-xs text-gray-500 border-b pb-2">
                <div className="col-span-3">Project</div>
                <div className="col-span-9 grid grid-cols-9 gap-1 text-center">
                  <div>Jan</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                  <div>Jul</div>
                  <div>Aug</div>
                  <div>Sep</div>
                </div>
              </div>
              
              {/* Gantt Chart Rows */}
              {ganttProjects.map((project, index) => {
                const startMonth = new Date(project.startDate).getMonth()
                const endMonth = new Date(project.endDate).getMonth()
                const duration = endMonth - startMonth + 1
                
                return (
                  <div key={project.id} className="grid grid-cols-12 gap-1 items-center py-2">
                    <div className="col-span-3 text-sm truncate">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.progress === 100 ? "Completed" : project.progress > 0 ? "Active" : "Planning")}
                        {project.name}
                      </div>
                    </div>
                    <div className="col-span-9 grid grid-cols-9 gap-1 relative">
                      <div 
                        className={`h-6 rounded-md flex items-center justify-center text-xs text-white font-medium ${
                          project.progress === 100 ? 'bg-green-500' : project.progress > 0 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{
                          gridColumnStart: startMonth + 1,
                          gridColumnEnd: Math.min(endMonth + 2, 10)
                        }}
                      >
                        {project.progress}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nature Resources</span>
                <span className="text-sm font-medium">€850K (35%)</span>
              </div>
              <Progress value={35} />

              <div className="flex items-center justify-between">
                <span className="text-sm">Education</span>
                <span className="text-sm font-medium">€720K (30%)</span>
              </div>
              <Progress value={30} />

              <div className="flex items-center justify-between">
                <span className="text-sm">Livelihood</span>
                <span className="text-sm font-medium">€600K (25%)</span>
              </div>
              <Progress value={25} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )

  const renderWorkPlans = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Work Plans</h2>
          <p className="text-sm text-gray-600">Detailed activity plans and schedules</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Work Plan
        </Button>
      </div>

      <div className="grid gap-4">
        {workPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="w-4 h-4 text-blue-600" />
                    <h3 className="font-medium">{plan.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      plan.status === "On Track" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Project: {plan.project}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Activities:</span>
                      <div className="font-medium">{plan.completed}/{plan.activities}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Progress:</span>
                      <div className="font-medium">{Math.round((plan.completed / plan.activities) * 100)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Due Date:</span>
                      <div className="font-medium">{plan.dueDate}</div>
                    </div>
                  </div>
                  <Progress value={(plan.completed / plan.activities) * 100} className="mt-3" />
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderArchives = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Project Archives</h2>
          <p className="text-sm text-gray-600">Completed and archived projects</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {projects.completed.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Archive className="w-4 h-4 text-gray-600" />
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      Archived
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <div className="font-medium">{project.department}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <div className="font-medium">{project.budget}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Team Size:</span>
                      <div className="font-medium">{project.team} members</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Completed:</span>
                      <div className="font-medium">{project.endDate}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Sarah Nakato" userRole="Executive Director" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-gray-600">Manage and monitor all organizational projects</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b">
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "active" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active Projects
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "workplans" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("workplans")}
              >
                Work Plans
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "archives" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("archives")}
              >
                Archives
              </button>
            </div>

            {/* Filters - Only show for Active Projects */}
            {activeTab === "active" && (
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search projects..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-departments">All Departments</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="livelihood">Livelihood</SelectItem>
                    <SelectItem value="nature">Nature Resources</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === "active" && renderActiveProjects()}
            {activeTab === "workplans" && renderWorkPlans()}
            {activeTab === "archives" && renderArchives()}
          </div>
        </main>
      </div>
    </div>
  )
}