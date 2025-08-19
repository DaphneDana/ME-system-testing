"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  BarChart3,
  FolderOpen,
  DollarSign,
  Target,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "M&E", href: "/me", icon: Target },
  { name: "Beneficiaries", href: "/beneficiaries", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

const settingsSubNav = [
  { name: "Organization", href: "/settings" },
  { name: "Users", href: "/settings/users" },
  { name: "Permissions", href: "/settings/permissions" },
  { name: "Integrations", href: "/settings/integrations" },
  { name: "System", href: "/settings/system" },
]

const financeSubNav = [
  { name: "Transactions", href: "/finance" },
  { name: "Budgets", href: "/finance/budgets" },
  { name: "Reports", href: "/finance/reports" },
  { name: "Reconciliation", href: "/finance/reconciliation" },
]

const meSubNav = [
  { name: "Indicators", href: "/me" },
  { name: "Activities", href: "/me/activities" },
  { name: "Surveys", href: "/me/surveys" },
  { name: "Learning Hub", href: "/me/learning" },
]

const beneficiariesSubNav = [
  { name: "Registry", href: "/beneficiaries" },
  { name: "Import", href: "/beneficiaries/import" },
  { name: "Services", href: "/beneficiaries/services" },
]

const reportsSubNav = [
  { name: "Generate", href: "/reports" },
  { name: "Templates", href: "/reports/templates" },
  { name: "Scheduled", href: "/reports/scheduled" },
  { name: "Archives", href: "/reports/archives" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getSubNav = (href: string) => {
    if (href === "/settings") return settingsSubNav
    if (href === "/finance") return financeSubNav
    if (href === "/me") return meSubNav
    if (href === "/beneficiaries") return beneficiariesSubNav
    if (href === "/reports") return reportsSubNav
    return []
  }

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gray-900" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-semibold">MEL System</div>
                <div className="text-xs text-gray-400">KCSON</div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-gray-800 p-1 h-8 w-8"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const subNav = getSubNav(item.href)
            const hasSubNav = subNav.length > 0

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer group relative ${
                    isActive ? "bg-gray-800" : "hover:bg-gray-800"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
                {hasSubNav && isActive && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {subNav.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-2 px-3 py-1 text-xs text-gray-300 hover:text-white cursor-pointer"
                      >
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
