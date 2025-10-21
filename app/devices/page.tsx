"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Server,
  Router,
  Globe,
  Database,
} from "lucide-react"

// 模拟设备数据
const mockDevices = [
  {
    id: 1,
    name: "Web服务器-01",
    ip: "192.168.1.10",
    type: "服务器",
    status: "正常",
    cpu: 45,
    memory: 67,
    responseTime: 120,
    availability: 99.8,
    group: "Web服务器",
    tags: ["生产环境", "核心业务"],
  },
  {
    id: 2,
    name: "数据库服务器",
    ip: "192.168.1.20",
    type: "数据库",
    status: "警告",
    cpu: 78,
    memory: 85,
    responseTime: 250,
    availability: 98.5,
    group: "数据库",
    tags: ["生产环境", "数据存储"],
  },
  {
    id: 3,
    name: "核心路由器",
    ip: "192.168.1.1",
    type: "网络设备",
    status: "正常",
    cpu: 23,
    memory: 34,
    responseTime: 15,
    availability: 99.9,
    group: "网络设备",
    tags: ["网络基础设施"],
  },
  {
    id: 4,
    name: "官网服务器",
    ip: "192.168.1.30",
    type: "Web服务器",
    status: "异常",
    cpu: 95,
    memory: 92,
    responseTime: 5000,
    availability: 85.2,
    group: "Web服务器",
    tags: ["官网", "对外服务"],
  },
  {
    id: 5,
    name: "备份服务器",
    ip: "192.168.1.40",
    type: "存储设备",
    status: "正常",
    cpu: 12,
    memory: 28,
    responseTime: 80,
    availability: 99.5,
    group: "存储设备",
    tags: ["备份", "数据安全"],
  },
]

const deviceGroups = ["全部", "Web服务器", "数据库", "网络设备", "存储设备"]
const statusTypes = ["全部", "正常", "警告", "异常"]

export default function DevicesPage() {
  const [selectedGroup, setSelectedGroup] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false)

  // 过滤设备数据
  const filteredDevices = mockDevices.filter((device) => {
    const matchesGroup = selectedGroup === "全部" || device.group === selectedGroup
    const matchesStatus = selectedStatus === "全部" || device.status === selectedStatus
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || device.ip.includes(searchTerm)
    return matchesGroup && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "正常":
        return "bg-success text-success-foreground"
      case "警告":
        return "bg-warning text-warning-foreground"
      case "异常":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "正常":
        return "●"
      case "警告":
        return "●"
      case "异常":
        return "●"
      default:
        return "●"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "服务器":
      case "Web服务器":
        return <Server className="h-4 w-4" />
      case "数据库":
        return <Database className="h-4 w-4" />
      case "网络设备":
        return <Router className="h-4 w-4" />
      case "存储设备":
        return <Server className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex">
            {/* 左侧过滤区 */}
            <div className={`${isFilterCollapsed ? "w-12" : "w-64"} transition-all duration-300 border-r bg-card`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  {!isFilterCollapsed && <h3 className="font-semibold text-foreground">筛选条件</h3>}
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}>
                    {isFilterCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </div>

                {!isFilterCollapsed && (
                  <div className="space-y-4">
                    {/* 设备分组 */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">设备分组</label>
                      <div className="space-y-1">
                        {deviceGroups.map((group) => (
                          <button
                            key={group}
                            onClick={() => setSelectedGroup(group)}
                            className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                              selectedGroup === group ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 状态筛选 */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">设备状态</label>
                      <div className="space-y-1">
                        {statusTypes.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                              selectedStatus === status ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧主内容区 */}
            <div className="flex-1 pl-6">
              <div className="space-y-6">
                {/* 页面标题和操作栏 */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold text-foreground">设备监控</h1>
                    <p className="text-muted-foreground mt-1">管理和监控所有设备的运行状态</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    添加监控目标
                  </Button>
                </div>

                {/* 搜索和过滤栏 */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索设备名称或IP地址..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    共 {filteredDevices.length} 台设备
                  </Badge>
                </div>

                {/* 设备列表表格 */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">状态</TableHead>
                          <TableHead>设备名称</TableHead>
                          <TableHead>IP地址</TableHead>
                          <TableHead className="w-24">类型</TableHead>
                          <TableHead className="text-center">CPU(%)</TableHead>
                          <TableHead className="text-center">内存(%)</TableHead>
                          <TableHead className="text-center">响应时间(ms)</TableHead>
                          <TableHead className="text-center">可用性(%)</TableHead>
                          <TableHead className="w-32 text-center">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDevices.map((device) => (
                          <TableRow key={device.id} className="hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-lg ${
                                    device.status === "正常"
                                      ? "text-success"
                                      : device.status === "警告"
                                        ? "text-warning"
                                        : "text-destructive"
                                  }`}
                                >
                                  {getStatusIcon(device.status)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTypeIcon(device.type)}
                                <div>
                                  <div className="font-medium">{device.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {device.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="mr-1 text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{device.ip}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{device.type}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`font-medium ${
                                  device.cpu > 80
                                    ? "text-destructive"
                                    : device.cpu > 60
                                      ? "text-warning"
                                      : "text-success"
                                }`}
                              >
                                {device.cpu}%
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`font-medium ${
                                  device.memory > 80
                                    ? "text-destructive"
                                    : device.memory > 60
                                      ? "text-warning"
                                      : "text-success"
                                }`}
                              >
                                {device.memory}%
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`font-medium ${
                                  device.responseTime > 1000
                                    ? "text-destructive"
                                    : device.responseTime > 500
                                      ? "text-warning"
                                      : "text-success"
                                }`}
                              >
                                {device.responseTime}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`font-medium ${
                                  device.availability < 95
                                    ? "text-destructive"
                                    : device.availability < 99
                                      ? "text-warning"
                                      : "text-success"
                                }`}
                              >
                                {device.availability}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看详情
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    编辑配置
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <VolumeX className="h-4 w-4 mr-2" />
                                    静音告警
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
