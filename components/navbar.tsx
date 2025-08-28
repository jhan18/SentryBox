"use client"
import { usePathname } from "next/navigation"
import { Menu, ChevronRight, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onToggleSidebar: () => void
  isSidebarCollapsed: boolean
}

// 路由到面包屑的映射
const routeToBreadcrumb: Record<string, string[]> = {
  "/": ["总览仪表盘"],
  "/devices": ["设备监控"],
  "/alerts": ["告警列表"],
  "/tickets": ["工单列表"],
  "/logs": ["日志中心"],
  "/settings": ["系统设置"],
  "/settings/notifications": ["系统设置", "通知设置"],
  "/settings/users": ["系统设置", "用户管理"],
  "/settings/monitoring": ["系统设置", "监控配置"],
  "/settings/system": ["系统设置", "系统信息"],
}

export function Navbar({ onToggleSidebar, isSidebarCollapsed }: NavbarProps) {
  const pathname = usePathname()
  const breadcrumbs = routeToBreadcrumb[pathname] || ["未知页面"]

  return (
    <header className="h-16 bg-card border-b border-border shadow-professional flex items-center px-6 gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="hover:bg-accent/10 transition-all duration-200"
      >
        <Menu className="h-5 w-5 text-foreground/70" />
      </Button>

      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
            <span
              className={cn(
                "transition-colors duration-200",
                index === breadcrumbs.length - 1
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground cursor-pointer",
              )}
            >
              {crumb}
            </span>
          </div>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative hover:bg-accent/10">
          <Bell className="h-5 w-5 text-foreground/70" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent/10">
          <User className="h-5 w-5 text-foreground/70" />
        </Button>
      </div>
    </header>
  )
}
