import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  userName: string
  userRole: string
}

export function Header({ userName, userRole }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-80" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Online
          </Button>
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="flex items-center gap-2">
            <User className="w-8 h-8 text-gray-600" />
            <div className="text-sm">
              <div className="font-medium">{userName}</div>
              <div className="text-gray-500">{userRole}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
