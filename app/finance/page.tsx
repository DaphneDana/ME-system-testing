'use client'
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  AlertCircle, 
  Eye, 
  Check, 
  X, 
  Filter,
  Download,
  Search,
  Calendar,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  RefreshCw,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("transactions")
  const [currency, setCurrency] = useState("eur")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const itemsPerPage = 4
  
  // Dummy transaction data
  const allTransactions = [
    { id: 1, date: "Jan 15, 2025", description: "Training Materials Purchase", category: "Education", amount: 2450, status: "Approved", project: "School Infrastructure" },
    { id: 2, date: "Jan 14, 2025", description: "Field Officer Allowances", category: "Personnel", amount: 1200, status: "Pending", project: "Water Access Initiative" },
    { id: 3, date: "Jan 13, 2025", description: "Fuel for Vehicles", category: "Transport", amount: 850, status: "Approved", project: "Forest Conservation" },
    { id: 4, date: "Jan 12, 2025", description: "Solar Panel Installation", category: "Infrastructure", amount: 15000, status: "Rejected", project: "Rural Energy" },
    { id: 5, date: "Jan 11, 2025", description: "Office Supplies", category: "Administrative", amount: 340, status: "Approved", project: "General Operations" },
    { id: 6, date: "Jan 10, 2025", description: "Internet Service", category: "Utilities", amount: 120, status: "Approved", project: "General Operations" },
    { id: 7, date: "Jan 9, 2025", description: "Workshop Venue", category: "Training", amount: 500, status: "Pending", project: "Farmer Training" },
    { id: 8, date: "Jan 8, 2025", description: "Medical Supplies", category: "Health", amount: 800, status: "Approved", project: "Community Health" },
    { id: 9, date: "Jan 7, 2025", description: "Equipment Maintenance", category: "Maintenance", amount: 450, status: "Approved", project: "Water Access Initiative" },
    { id: 10, date: "Jan 6, 2025", description: "Staff Training", category: "Personnel", amount: 1500, status: "Pending", project: "Capacity Building" }
  ]

  // Budget data
  const budgetData = [
    { department: "Nature Resources", allocated: 850000, spent: 663000, percentage: 78, projects: 8 },
    { department: "Education", allocated: 720000, spent: 468000, percentage: 65, projects: 6 },
    { department: "Livelihood", allocated: 600000, spent: 492000, percentage: 82, projects: 5 },
    { department: "Health", allocated: 280000, spent: 168000, percentage: 60, projects: 3 }
  ]

  // Cash flow data
  const cashFlowData = [
    { month: "Jan", income: 180000, expenses: 165000, net: 15000 },
    { month: "Feb", income: 190000, expenses: 170000, net: 20000 },
    { month: "Mar", income: 175000, expenses: 180000, net: -5000 },
    { month: "Apr", income: 200000, expenses: 175000, net: 25000 },
    { month: "May", income: 185000, expenses: 190000, net: -5000 },
    { month: "Jun", income: 195000, expenses: 185000, net: 10000 }
  ]

  // Filter transactions
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  const getCurrencySymbol = (curr) => {
    switch(curr) {
      case "eur": return "€"
      case "usd": return "$"
      case "ugx": return "UGX "
      default: return "€"
    }
  }

  const formatAmount = (amount) => {
    const symbol = getCurrencySymbol(currency)
    if (currency === "ugx") {
      return `${symbol}${(amount * 4000).toLocaleString()}`
    }
    return `${symbol}${amount.toLocaleString()}`
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "text-green-600"
      case "Pending": return "text-yellow-600"
      case "Rejected": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const renderTransactions = () => (
    <>
      {/* Filters Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Personnel">Personnel</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
            <SelectItem value="Administrative">Administrative</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setShowFilterModal(true)}>
          <Filter className="w-4 h-4 mr-2" />
          Advanced
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Transactions
                <span className="text-sm font-normal text-gray-500">
                  {filteredTransactions.length} total
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                  <span>Date</span>
                  <span>Description</span>
                  <span>Category</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>

                {currentTransactions.map((transaction) => (
                  <div key={transaction.id} className="grid grid-cols-6 gap-4 text-sm py-3 border-b hover:bg-gray-50">
                    <span>{transaction.date}</span>
                    <span className="truncate">{transaction.description}</span>
                    <span>{transaction.category}</span>
                    <span className="font-medium">{formatAmount(transaction.amount)}</span>
                    <span className={getStatusColor(transaction.status)}>{transaction.status}</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Budget Consumption */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Consumption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nature Resources</span>
                  <span>78%</span>
                </div>
                <Progress value={78} />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Education</span>
                  <span>65%</span>
                </div>
                <Progress value={65} />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Livelihood</span>
                  <span>82%</span>
                </div>
                <Progress value={82} />
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pending Approvals
                <span className="text-sm font-normal">12 items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">Field Officer Allowances</p>
                  <p className="text-xs text-gray-500">{formatAmount(1200)} • 2 days ago</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">Equipment Purchase</p>
                  <p className="text-xs text-gray-500">{formatAmount(3500)} • 1 day ago</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">Training Venue Rental</p>
                  <p className="text-xs text-gray-500">{formatAmount(800)} • 3 hours ago</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )

  const renderBudgets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Budget Management</h2>
          <p className="text-sm text-gray-600">Track department budgets and allocations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Budget
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Budget
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {budgetData.map((dept, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{dept.department}</h3>
                  <p className="text-sm text-gray-600">{dept.projects} active projects</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Budget Utilization</p>
                  <p className="text-2xl font-bold">{dept.percentage}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Allocated</p>
                  <p className="font-semibold">{formatAmount(dept.allocated)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="font-semibold">{formatAmount(dept.spent)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="font-semibold">{formatAmount(dept.allocated - dept.spent)}</p>
                </div>
              </div>
              
              <Progress value={dept.percentage} className="mb-3" />
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCashFlow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Cash Flow Analysis</h2>
          <p className="text-sm text-gray-600">Track income, expenses, and net cash flow</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Monthly Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashFlowData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{month.month} 2025</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>In: {formatAmount(month.income)}</span>
                      <span>Out: {formatAmount(month.expenses)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${month.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {month.net >= 0 ? '+' : ''}{formatAmount(month.net)}
                    </p>
                    {month.net >= 0 ? 
                      <TrendingUp className="w-4 h-4 text-green-600 ml-auto" /> : 
                      <TrendingDown className="w-4 h-4 text-red-600 ml-auto" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              Expense Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Personnel (40%)</span>
                <span className="font-medium">{formatAmount(72000)}</span>
              </div>
              <Progress value={40} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Operations (25%)</span>
                <span className="font-medium">{formatAmount(45000)}</span>
              </div>
              <Progress value={25} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Equipment (20%)</span>
                <span className="font-medium">{formatAmount(36000)}</span>
              </div>
              <Progress value={20} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Training (15%)</span>
                <span className="font-medium">{formatAmount(27000)}</span>
              </div>
              <Progress value={15} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderReconciliation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Bank Reconciliation</h2>
          <p className="text-sm text-gray-600">Match transactions with bank statements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Bank
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Upload Statement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" />
              Book Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatAmount(156000)}</p>
            <p className="text-sm text-gray-600">As of Jan 15, 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Bank Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatAmount(158500)}</p>
            <p className="text-sm text-gray-600">Last updated: 2 hours ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-orange-600" />
              Difference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{formatAmount(2500)}</p>
            <p className="text-sm text-gray-600">Needs reconciliation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unmatched Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Bank Transfer - ABC Bank</p>
                <p className="text-sm text-gray-600">Jan 14, 2025 • Bank Statement</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{formatAmount(2500)}</span>
                <Button size="sm" variant="outline">Match</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Equipment Purchase</p>
                <p className="text-sm text-gray-600">Jan 13, 2025 • Our Records</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{formatAmount(1200)}</span>
                <Button size="sm" variant="outline">Match</Button>
              </div>
            </div>
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
        <Header userName="Sarah Nakato" userRole="Financial Controller" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
                <p className="text-gray-600">Manage budgets, transactions, and financial reports</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="ugx">UGX</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-gray-900 hover:bg-gray-800"
                  onClick={() => setShowNewTransactionModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Transaction
                </Button>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Budget</p>
                      <p className="text-2xl font-bold">{formatAmount(2400000)}</p>
                      <p className="text-xs text-green-600">↑ 12% from last year</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Budget Used</p>
                      <p className="text-2xl font-bold">{formatAmount(1800000)}</p>
                      <p className="text-xs text-gray-500">75% utilization</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                      <p className="text-2xl font-bold">{formatAmount(180000)}</p>
                      <p className="text-xs text-gray-500">↑ 8% this month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-red-600">3 urgent items</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b">
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "transactions" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "budgets" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("budgets")}
              >
                Budgets
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "cashflow" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("cashflow")}
              >
                Cash Flow
              </button>
              <button 
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "reconciliation" ? "border-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("reconciliation")}
              >
                Reconciliation
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "transactions" && renderTransactions()}
            {activeTab === "budgets" && renderBudgets()}
            {activeTab === "cashflow" && renderCashFlow()}
            {activeTab === "reconciliation" && renderReconciliation()}
          </div>
        </main>
      </div>

      {/* New Transaction Modal */}
      {showNewTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input placeholder="Transaction description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <Input placeholder="0.00" type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="personnel">Personnel</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                    <SelectItem value="forest">Forest Conservation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input type="date" defaultValue="2025-01-15" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Textarea placeholder="Additional notes..." rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNewTransactionModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setShowNewTransactionModal(false)}
              >
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}  