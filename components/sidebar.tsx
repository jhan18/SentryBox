"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Monitor,
  AlertTriangle,
  FileText,
  Settings,
  Shield,
  Database,
  ChevronDown,
  Bell,
  Users,
  Sliders,
  Info,
} from "lucide-react"

const menuItems = [
  {
    title: "总览仪表盘",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "设备监控",
    href: "/devices",
    icon: Monitor,
  },
  {
    title: "告警列表",
    href: "/alerts",
    icon: AlertTriangle,
  },
  {
    title: "工单列表",
    href: "/tickets",
    icon: FileText,
  },
  {
    title: "日志中心",
    href: "/logs",
    icon: Database,
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
    subItems: [
      {
        title: "通知设置",
        href: "/settings/notifications",
        icon: Bell,
      },
      {
        title: "用户管理",
        href: "/settings/users",
        icon: Users,
      },
      {
        title: "监控配置",
        href: "/settings/monitoring",
        icon: Sliders,
      },
      {
        title: "系统信息",
        href: "/settings/system",
        icon: Info,
      },
    ],
  },
]

interface SidebarProps {
  isCollapsed: boolean
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border shadow-professional",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border/50 bg-gradient-to-r from-sidebar to-sidebar-accent/5">
        {!isCollapsed && (
          <>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-primary/10 border border-sidebar-primary/20">
              <Shield className="h-6 w-6 text-sidebar-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">一体化运营平台</span>
              <span className="text-xs text-sidebar-foreground/60">Security Operations</span>
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="flex justify-center w-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-primary/10 border border-sidebar-primary/20">
              <Shield className="h-6 w-6 text-sidebar-primary" />
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const hasActiveSubItem = item.subItems?.some((subItem) => pathname === subItem.href)
          const isExpanded = expandedItems.includes(item.href)
          const shouldExpand = hasActiveSubItem && !isExpanded

          if (shouldExpand) {
            setExpandedItems((prev) => [...prev, item.href])
          }

          return (
            <div key={item.href}>
              {item.subItems ? (
                <button
                  onClick={() => !isCollapsed && toggleExpanded(item.href)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    "hover:bg-sidebar-accent/10 hover:shadow-sm",
                    isActive || hasActiveSubItem
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm border border-sidebar-primary/20"
                      : "text-sidebar-foreground/80 hover:text-sidebar-foreground",
                    isCollapsed && "justify-center px-3",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      <div
                        className={cn(
                          "transition-transform duration-200",
                          isExpanded || hasActiveSubItem ? "rotate-0" : "-rotate-90",
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    "hover:bg-sidebar-accent/10 hover:shadow-sm",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm border border-sidebar-primary/20"
                      : "text-sidebar-foreground/80 hover:text-sidebar-foreground",
                    isCollapsed && "justify-center px-3",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && item.title}
                </Link>
              )}

              {item.subItems && (isExpanded || hasActiveSubItem) && !isCollapsed && (
                <div className="ml-4 mt-2 space-y-1 border-l border-sidebar-border/30 pl-4">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon
                    const isSubActive = pathname === subItem.href

                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          "hover:bg-sidebar-accent/10",
                          isSubActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                        )}
                      >
                        <SubIcon className="h-4 w-4 shrink-0" />
                        {subItem.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border/50">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span>系统运行正常</span>
          </div>
        </div>
      )}
    </div>
  )
}
