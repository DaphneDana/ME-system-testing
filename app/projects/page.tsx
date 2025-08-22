'use client'
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Eye,
  ChevronRight,
  Folder,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  X
} from "lucide-react"

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedDepartment, setSelectedDepartment] = useState("all-departments")
  const [selectedStatus, setSelectedStatus] = useState("all-status")
  const [searchQuery, setSearchQuery] = useState("")
  const [timelineView, setTimelineView] = useState("all-projects")
  const [isFloating, setIsFloating] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewingProject, setViewingProject] = useState(null)

  // Dummy project data
  const [projects, setProjects] = useState({
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
        team: 8,
        status: "Planning",
        location: "Kampala, Uganda",
        manager: "John Doe",
        objectives: ["Provide clean water to 500 families", "Install 10 water pumps", "Train local maintenance teams"],
        activities: [
          { name: "Site survey", status: "completed", dueDate: "2025-02-15" },
          { name: "Equipment procurement", status: "in-progress", dueDate: "2025-03-30" },
          { name: "Installation", status: "pending", dueDate: "2025-06-15" }
        ]
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
        team: 5,
        status: "Planning",
        location: "Mbarara, Uganda",
        manager: "Jane Smith",
        objectives: ["Train 200 farmers", "Improve crop yields by 30%", "Establish 5 demonstration plots"],
        activities: [
          { name: "Curriculum development", status: "completed", dueDate: "2025-03-15" },
          { name: "Farmer recruitment", status: "pending", dueDate: "2025-04-01" },
          { name: "Training sessions", status: "pending", dueDate: "2025-05-01" }
        ]
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
        team: 12,
        status: "Active",
        location: "Gulu, Uganda",
        manager: "Sarah Johnson",
        objectives: ["Build 20 new classrooms", "Provide furniture for 500 students", "Install solar panels"],
        activities: [
          { name: "Foundation work", status: "completed", dueDate: "2024-10-30" },
          { name: "Wall construction", status: "in-progress", dueDate: "2025-03-15" },
          { name: "Roofing", status: "pending", dueDate: "2025-05-01" }
        ]
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
        team: 6,
        status: "Active",
        location: "Masaka, Uganda",
        manager: "David Wilson",
        objectives: ["Support 50 women groups", "Disburse €100K in loans", "Achieve 95% repayment rate"],
        activities: [
          { name: "Group formation", status: "completed", dueDate: "2024-09-30" },
          { name: "Financial training", status: "completed", dueDate: "2024-11-30" },
          { name: "Loan disbursement", status: "in-progress", dueDate: "2025-02-28" }
        ]
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
        team: 10,
        status: "Active",
        location: "Mubende, Uganda",
        manager: "Mary Brown",
        objectives: ["Plant 10,000 trees", "Protect 500 hectares", "Train 100 community members"],
        activities: [
          { name: "Seedling preparation", status: "completed", dueDate: "2024-12-15" },
          { name: "Community mobilization", status: "in-progress", dueDate: "2025-02-28" },
          { name: "Planting activities", status: "pending", dueDate: "2025-05-30" }
        ]
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
        team: 7,
        status: "Completed",
        location: "Jinja, Uganda",
        manager: "Peter Davis",
        objectives: ["Train 300 adults", "Achieve 80% literacy rate", "Establish 6 learning centers"],
        activities: [
          { name: "Center setup", status: "completed", dueDate: "2024-04-30" },
          { name: "Facilitator training", status: "completed", dueDate: "2024-05-31" },
          { name: "Literacy classes", status: "completed", dueDate: "2025-01-31" }
        ]
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
        team: 9,
        status: "Completed",
        location: "Lira, Uganda",
        manager: "Grace Taylor",
        objectives: ["Install solar in 8 health centers", "Provide 24/7 power supply", "Train maintenance staff"],
        activities: [
          { name: "Site assessment", status: "completed", dueDate: "2024-07-15" },
          { name: "Equipment installation", status: "completed", dueDate: "2024-11-30" },
          { name: "Staff training", status: "completed", dueDate: "2024-12-31" }
        ]
      }
    ],
    archives: []
  })

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

  // Handle scroll for floating button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldFloat = scrollY > 50
      setIsFloating(shouldFloat)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleProjectAction = (action: string, project: any) => {
    switch (action) {
      case "view":
        setViewingProject(project)
        break
      case "edit":
        setSelectedProject(project)
        setEditModalOpen(true)
        break
      case "archive":
        // Move project to archives
        setProjects(prev => {
          const newProjects = { ...prev }
          // Remove from current category
          Object.keys(newProjects).forEach(category => {
            if (category !== 'archives') {
              newProjects[category] = newProjects[category].filter(p => p.id !== project.id)
            }
          })
          // Add to archives
          newProjects.archives = [...newProjects.archives, { ...project, status: 'Archived' }]
          return newProjects
        })
        break
    }
  }

  const handleEditSubmit = (updatedProject: any) => {
    setProjects(prev => {
      const newProjects = { ...prev }
      Object.keys(newProjects).forEach(category => {
        newProjects[category] = newProjects[category].map(p => 
          p.id === updatedProject.id ? updatedProject : p
        )
      })
      return newProjects
    })
    setEditModalOpen(false)
    setSelectedProject(null)
  }

  // If viewing a specific project, render project details
  if (viewingProject) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userName="Sarah Nakato" userRole="Executive Director" />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {/* Back button */}
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setViewingProject(null)}
              >
                ← Back to Projects
              </Button>

              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{viewingProject.name}</h1>
                    <p className="text-gray-600 text-lg mb-4">{viewingProject.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-white ${
                        viewingProject.status === 'Active' ? 'bg-blue-600' :
                        viewingProject.status === 'Planning' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {viewingProject.status}
                      </span>
                      <span className="text-gray-500">Department: {viewingProject.department}</span>
                      <span className="text-gray-500">Manager: {viewingProject.manager}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedProject(viewingProject)
                        setEditModalOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Overview Cards */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">{viewingProject.progress}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                    <Progress value={viewingProject.progress} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">{viewingProject.budget}</div>
                    <div className="text-sm text-gray-600">Budget</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">{viewingProject.team}</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.ceil((new Date(viewingProject.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-gray-600">Days Remaining</div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-8">
                {/* Project Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <p className="text-gray-900">{viewingProject.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <p className="text-gray-900">{viewingProject.startDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                      <p className="text-gray-900">{viewingProject.endDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Project Manager</Label>
                      <p className="text-gray-900">{viewingProject.manager}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Objectives */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {viewingProject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Activities Timeline */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Activities Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {viewingProject.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                          activity.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : activity.status === 'in-progress' ? (
                            <PlayCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.name}</h4>
                          <p className="text-sm text-gray-600">Due: {activity.dueDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                          activity.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
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
                    <Select onValueChange={(value) => handleProjectAction(value, project)}>
                      <SelectTrigger className="w-8 h-8 p-0 border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view"><Eye className="w-4 h-4 mr-2" />View</SelectItem>
                        <SelectItem value="edit"><Edit className="w-4 h-4 mr-2" />Edit</SelectItem>
                        <SelectItem value="archive"><Archive className="w-4 h-4 mr-2" />Archive</SelectItem>
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
                    <Select onValueChange={(value) => handleProjectAction(value, project)}>
                      <SelectTrigger className="w-8 h-8 p-0 border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view"><Eye className="w-4 h-4 mr-2" />View</SelectItem>
                        <SelectItem value="edit"><Edit className="w-4 h-4 mr-2" />Edit</SelectItem>
                        <SelectItem value="archive"><Archive className="w-4 h-4 mr-2" />Archive</SelectItem>
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
                    <Select onValueChange={(value) => handleProjectAction(value, project)}>
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
        {[...projects.completed, ...projects.archives].map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Archive className="w-4 h-4 text-gray-600" />
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {project.status === 'Archived' ? 'Archived' : 'Completed'}
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
                  <Button variant="outline" size="sm" onClick={() => setViewingProject(project)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
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
              {/* Regular Create Project Button */}
              {!isFloating && (
                <Button className="bg-gray-900 hover:bg-gray-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              )}
            </div>

            {/* Floating Create Project Button */}
            <Button 
              className={`fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 shadow-2xl z-50 h-14 px-6 rounded-full transition-all duration-300 ease-in-out ${
                isFloating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Project
            </Button>

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

      {/* Edit Project Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <EditProjectForm 
              project={selectedProject}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setEditModalOpen(false)
                setSelectedProject(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Edit Project Form Component
function EditProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    department: project.department,
    budget: project.budget,
    startDate: project.startDate,
    endDate: project.endDate,
    manager: project.manager,
    location: project.location,
    progress: project.progress
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...project, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Livelihood">Livelihood</SelectItem>
              <SelectItem value="Nature Resources">Nature Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="manager">Project Manager</Label>
          <Input
            id="manager"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="progress">Progress (%)</Label>
        <Input
          id="progress"
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  )
}