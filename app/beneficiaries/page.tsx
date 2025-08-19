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
  Upload, 
  Download, 
  Plus, 
  Search, 
  Edit, 
  Mail, 
  Trash2, 
  Users, 
  Activity, 
  Home, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Eye,
  X,
  Check,
  Filter,
  UserPlus,
  Send,
  Archive
} from "lucide-react"

export default function BeneficiariesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all-departments")
  const [selectedProject, setSelectedProject] = useState("all-projects")
  const [selectedGender, setSelectedGender] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all-locations")
  const [minAge, setMinAge] = useState("")
  const [maxAge, setMaxAge] = useState("")
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    graduated: false,
    inactive: false
  })
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showBulkEditModal, setShowBulkEditModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)

  // Comprehensive dummy beneficiary data
  const allBeneficiaries = [
    {
      id: "BEN-2025-001",
      name: "Sarah Nakato",
      gender: "Female",
      age: 28,
      location: "Kampala",
      department: "Livelihood",
      project: "Microfinance Support",
      services: 3,
      status: "Active",
      phone: "+256 701 234567",
      email: "sarah.nakato@email.com",
      household: "HH-001",
      joinDate: "2024-03-15",
      lastService: "2025-01-15"
    },
    {
      id: "BEN-2025-002",
      name: "James Okello",
      gender: "Male",
      age: 35,
      location: "Jinja",
      department: "Education",
      project: "School Infrastructure",
      services: 2,
      status: "Active",
      phone: "+256 702 345678",
      email: "james.okello@email.com",
      household: "HH-002",
      joinDate: "2024-04-20",
      lastService: "2025-01-10"
    },
    {
      id: "BEN-2025-003",
      name: "Mary Nassanga",
      gender: "Female",
      age: 42,
      location: "Bukoba",
      department: "Nature Resources",
      project: "Water Access Initiative",
      services: 4,
      status: "Active",
      phone: "+256 703 456789",
      email: "mary.nassanga@email.com",
      household: "HH-003",
      joinDate: "2024-02-10",
      lastService: "2025-01-12"
    },
    {
      id: "BEN-2025-004",
      name: "Robert Mwangi",
      gender: "Male",
      age: 29,
      location: "Kampala",
      department: "Livelihood",
      project: "Agricultural Training",
      services: 1,
      status: "Graduated",
      phone: "+256 704 567890",
      email: "robert.mwangi@email.com",
      household: "HH-004",
      joinDate: "2023-08-15",
      lastService: "2024-12-20"
    },
    {
      id: "BEN-2025-005",
      name: "Grace Namuli",
      gender: "Female",
      age: 31,
      location: "Jinja",
      department: "Education",
      project: "Youth Skills Training",
      services: 2,
      status: "Active",
      phone: "+256 705 678901",
      email: "grace.namuli@email.com",
      household: "HH-005",
      joinDate: "2024-05-12",
      lastService: "2025-01-08"
    },
    {
      id: "BEN-2025-006",
      name: "Peter Musoke",
      gender: "Male",
      age: 45,
      location: "Bukoba",
      department: "Nature Resources",
      project: "Forest Conservation",
      services: 3,
      status: "Active",
      phone: "+256 706 789012",
      email: "peter.musoke@email.com",
      household: "HH-006",
      joinDate: "2024-01-30",
      lastService: "2025-01-14"
    },
    {
      id: "BEN-2025-007",
      name: "Agnes Kiprotich",
      gender: "Female",
      age: 26,
      location: "Kampala",
      department: "Livelihood",
      project: "Microfinance Support",
      services: 2,
      status: "Inactive",
      phone: "+256 707 890123",
      email: "agnes.kiprotich@email.com",
      household: "HH-007",
      joinDate: "2024-06-18",
      lastService: "2024-11-25"
    },
    {
      id: "BEN-2025-008",
      name: "David Otim",
      gender: "Male",
      age: 33,
      location: "Jinja",
      department: "Education",
      project: "Adult Literacy",
      services: 1,
      status: "Active",
      phone: "+256 708 901234",
      email: "david.otim@email.com",
      household: "HH-008",
      joinDate: "2024-07-22",
      lastService: "2025-01-11"
    }
  ]

  // Filter beneficiaries based on current filters
  const filteredBeneficiaries = allBeneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         beneficiary.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         beneficiary.phone.includes(searchQuery)
    
    const matchesDepartment = selectedDepartment === "all-departments" || beneficiary.department === selectedDepartment
    const matchesProject = selectedProject === "all-projects" || beneficiary.project === selectedProject
    const matchesGender = selectedGender === "all" || beneficiary.gender.toLowerCase() === selectedGender
    const matchesLocation = selectedLocation === "all-locations" || beneficiary.location === selectedLocation
    
    const matchesAge = (!minAge || beneficiary.age >= parseInt(minAge)) && 
                      (!maxAge || beneficiary.age <= parseInt(maxAge))
    
    const matchesStatus = statusFilters[beneficiary.status.toLowerCase()]

    return matchesSearch && matchesDepartment && matchesProject && 
           matchesGender && matchesLocation && matchesAge && matchesStatus
  })

  const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentBeneficiaries = filteredBeneficiaries.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedBeneficiaries(currentBeneficiaries.map(b => b.id))
    } else {
      setSelectedBeneficiaries([])
    }
  }

  const handleSelectBeneficiary = (id, checked) => {
    if (checked) {
      setSelectedBeneficiaries([...selectedBeneficiaries, id])
    } else {
      setSelectedBeneficiaries(selectedBeneficiaries.filter(bid => bid !== id))
      setSelectAll(false)
    }
  }

  const applyFilters = () => {
    setCurrentPage(1) // Reset to first page when filters change
    // Filters are already applied through the filteredBeneficiaries calculation
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("all-departments")
    setSelectedProject("all-projects")
    setSelectedGender("all")
    setSelectedLocation("all-locations")
    setMinAge("")
    setMaxAge("")
    setStatusFilters({ active: true, graduated: false, inactive: false })
    setCurrentPage(1)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "text-green-600"
      case "Graduated": return "text-blue-600"
      case "Inactive": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const exportData = () => {
    // Simulate export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Gender,Age,Location,Department,Project,Services,Status\n" +
      filteredBeneficiaries.map(b => 
        `${b.id},${b.name},${b.gender},${b.age},${b.location},${b.department},${b.project},${b.services},${b.status}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "beneficiaries.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
                <h1 className="text-2xl font-bold text-gray-900">Beneficiary Management</h1>
                <p className="text-gray-600">Manage beneficiary registry, services, and data</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={exportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" onClick={() => setShowImportModal(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button 
                  className="bg-gray-900 hover:bg-gray-800"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Beneficiary
                </Button>
              </div>
            </div>

            {/* Beneficiary Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Beneficiaries</p>
                      <p className="text-2xl font-bold">{allBeneficiaries.length.toLocaleString()}</p>
                      <p className="text-xs text-green-600">↑ 12% this month</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Services</p>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-gray-500">23 new this week</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Households Reached</p>
                      <p className="text-2xl font-bold">1,204</p>
                      <p className="text-xs text-gray-500">Average: 3.4 per HH</p>
                    </div>
                    <Home className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Data Quality</p>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-red-600">340 records need review</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {/* Advanced Filters */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Advanced Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          placeholder="Name, ID, or Phone..." 
                          className="pl-10" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-departments">All Departments</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Livelihood">Livelihood</SelectItem>
                          <SelectItem value="Nature Resources">Nature Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Project</label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-projects">All Projects</SelectItem>
                          <SelectItem value="Water Access Initiative">Water Access</SelectItem>
                          <SelectItem value="School Infrastructure">School Infrastructure</SelectItem>
                          <SelectItem value="Microfinance Support">Microfinance</SelectItem>
                          <SelectItem value="Agricultural Training">Agricultural Training</SelectItem>
                          <SelectItem value="Youth Skills Training">Youth Skills</SelectItem>
                          <SelectItem value="Forest Conservation">Forest Conservation</SelectItem>
                          <SelectItem value="Adult Literacy">Adult Literacy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                      <Select value={selectedGender} onValueChange={setSelectedGender}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Age Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          placeholder="Min" 
                          type="number"
                          value={minAge}
                          onChange={(e) => setMinAge(e.target.value)}
                        />
                        <Input 
                          placeholder="Max" 
                          type="number"
                          value={maxAge}
                          onChange={(e) => setMaxAge(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-locations">All Locations</SelectItem>
                          <SelectItem value="Kampala">Kampala</SelectItem>
                          <SelectItem value="Jinja">Jinja</SelectItem>
                          <SelectItem value="Bukoba">Bukoba</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="active" 
                            checked={statusFilters.active}
                            onCheckedChange={(checked) => setStatusFilters({...statusFilters, active: checked})}
                          />
                          <label htmlFor="active" className="text-sm">
                            Active
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="graduated" 
                            checked={statusFilters.graduated}
                            onCheckedChange={(checked) => setStatusFilters({...statusFilters, graduated: checked})}
                          />
                          <label htmlFor="graduated" className="text-sm">
                            Graduated
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="inactive" 
                            checked={statusFilters.inactive}
                            onCheckedChange={(checked) => setStatusFilters({...statusFilters, inactive: checked})}
                          />
                          <label htmlFor="inactive" className="text-sm">
                            Inactive
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
                        Clear All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Beneficiary Registry */}
              <div className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Beneficiary Registry
                      <span className="text-sm font-normal">{filteredBeneficiaries.length} records</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Bulk Actions */}
                    <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <Checkbox 
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                      />
                      <span className="text-sm text-gray-600">
                        {selectedBeneficiaries.length > 0 ? 
                          `${selectedBeneficiaries.length} selected` : 
                          "Select all"
                        }
                      </span>
                      <div className="flex gap-2 ml-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={selectedBeneficiaries.length === 0}
                          onClick={() => setShowBulkEditModal(true)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Bulk Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={selectedBeneficiaries.length === 0}
                          onClick={() => setShowMessageModal(true)}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Send Message
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={selectedBeneficiaries.length === 0}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-9 gap-4 text-sm font-medium text-gray-500 border-b pb-3 mb-4">
                      <span>Beneficiary</span>
                      <span>ID</span>
                      <span>Gender</span>
                      <span>Age</span>
                      <span>Location</span>
                      <span>Department</span>
                      <span>Services</span>
                      <span>Status</span>
                      <span>Actions</span>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-4">
                      {currentBeneficiaries.map((beneficiary) => (
                        <div key={beneficiary.id} className="grid grid-cols-9 gap-4 text-sm py-3 border-b items-center hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedBeneficiaries.includes(beneficiary.id)}
                              onCheckedChange={(checked) => handleSelectBeneficiary(beneficiary.id, checked)}
                            />
                            <div>
                              <p className="font-medium">{beneficiary.name}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {beneficiary.phone}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{beneficiary.id.split('-')[2]}</span>
                          <span>{beneficiary.gender}</span>
                          <span>{beneficiary.age}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {beneficiary.location}
                          </span>
                          <span>{beneficiary.department}</span>
                          <span className="text-blue-600">{beneficiary.services} services</span>
                          <span className={getStatusColor(beneficiary.status)}>{beneficiary.status}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
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

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Show</span>
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                            <SelectItem value="100">100 per page</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-500">
                          of {filteredBeneficiaries.length} records
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        {[...Array(totalPages)].slice(Math.max(0, currentPage - 3), currentPage + 2).map((_, i) => {
                          const pageNum = Math.max(1, currentPage - 2) + i
                          if (pageNum <= totalPages) {
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                              >
                                {pageNum}
                              </Button>
                            )
                          }
                          return null
                        })}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Beneficiary Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Beneficiary</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input placeholder="+256 xxx xxx xxx" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input placeholder="email@example.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <Input placeholder="Age" type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kampala">Kampala</SelectItem>
                    <SelectItem value="jinja">Jinja</SelectItem>
                    <SelectItem value="bukoba">Bukoba</SelectItem>
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
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="livelihood">Livelihood</SelectItem>
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
                    <SelectItem value="water">Water Access Initiative</SelectItem>
                    <SelectItem value="education">School Infrastructure</SelectItem>
                    <SelectItem value="microfinance">Microfinance Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Textarea placeholder="Full address..." rows={2} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddModal(false)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Beneficiary
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Import Beneficiaries</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowImportModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">File Format</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="excel">Excel File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop your file here</p>
                  <p className="text-xs text-gray-500">or click to browse</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="validate" />
                <label htmlFor="validate" className="text-sm">
                  Validate data before import
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowImportModal(false)}>
                Import Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {showBulkEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Edit ({selectedBeneficiaries.length} selected)</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowBulkEditModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Update Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Keep current" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="livelihood">Livelihood</SelectItem>
                    <SelectItem value="nature">Nature Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Update Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Keep current" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Add Note</label>
                <Textarea placeholder="Bulk update note..." rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowBulkEditModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowBulkEditModal(false)}>
                Update All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Message ({selectedBeneficiaries.length} recipients)</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMessageModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Message Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="both">SMS & Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input placeholder="Message subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea placeholder="Type your message here..." rows={4} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowMessageModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowMessageModal(false)}>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}