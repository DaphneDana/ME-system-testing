"use client"

import { useState } from "react"
import { Search, Bell, User, AlertTriangle, X, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  userName: string
  userRole: string
}

// Sample alerts data (moved from dashboard)
const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Missing beneficiary data in Water Project - 12 records",
    action: "Review"
  },
  {
    id: 2,
    type: "warning", 
    title: "Duplicate entries detected in Education survey",
    action: "Fix"
  },
  {
    id: 3,
    type: "info",
    title: "Data collection reminder - Monthly report due in 3 days",
    action: "View"
  },
  {
    id: 4,
    type: "error",
    title: "System backup failed - Check system logs",
    action: "Check"
  }
]

export function Header({ userName, userRole }: HeaderProps) {
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [unreadAlerts] = useState(alerts.length)

  const handleAlertAction = (alertId: number, action: string) => {
    console.log(`Handling alert ${alertId} with action: ${action}`)
    // Handle the specific alert action here
  }

  const handleLogout = () => {
    // Clear any stored user data/tokens here if needed
    window.location.href = "/"
  }

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border border-yellow-200"
      case "error":
        return "bg-red-50 border border-red-200"
      case "info":
        return "bg-blue-50 border border-blue-200"
      default:
        return "bg-gray-50 border border-gray-200"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - empty for balance */}
        <div className="flex-1"></div>
        
        {/* Center - Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-full" />
          </div>
        </div>
        
        {/* Right side - Status, Alerts, Profile */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm">
            Online
          </Button>
          
          {/* Alerts Modal */}
          <Dialog open={alertsOpen} onOpenChange={setAlertsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="lg" className="relative p-3">
                <Bell className="w-7 h-7 text-gray-600" />
                {unreadAlerts > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs min-w-[20px] h-5 flex items-center justify-center"
                  >
                    {unreadAlerts}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  Data Quality Alerts
                  <span className="text-sm font-normal text-gray-500">{alerts.length} issues</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg ${getAlertBgColor(alert.type)}`}>
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.title}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAlertAction(alert.id, alert.action)}
                    >
                      {alert.action}
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-3 hover:bg-gray-100 rounded-md transition-colors">
                  <User className="w-7 h-7 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
                    <p className="text-xs leading-none text-muted-foreground">KCSON</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}