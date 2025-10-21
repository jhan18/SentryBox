"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, Cpu, HardDrive, MemoryStick, Network, Plus, Scan, Server, Wifi, Circle as XCircle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

// 模拟数据
const statusSummary = {
  totalAssets: 156,
  abnormalAssets: 8,
  currentAlerts: 12,
  activeTickets: 5,
}

const networkNodes = [
  { id: 1, name: "核心路由器", type: "router", status: "online", x: 50, y: 30 },
  { id: 2, name: "主服务器", type: "server", status: "warning", x: 30, y: 60 },
  { id: 3, name: "备份服务器", type: "server", status: "online", x: 70, y: 60 },
  { id: 4, name: "Web服务", type: "web", status: "online", x: 20, y: 80 },
  { id: 5, name: "数据库", type: "database", status: "error", x: 80, y: 80 },
]

const timelineEvents = [
  { id: 1, time: "14:32", type: "error", message: "数据库连接异常", status: "active" },
  { id: 2, time: "14:15", type: "warning", message: "主服务器CPU使用率过高", status: "active" },
  { id: 3, time: "13:45", type: "success", message: "网络连接恢复正常", status: "resolved" },
  { id: 4, time: "13:20", type: "info", message: "发现新设备: 打印机-001", status: "info" },
  { id: 5, time: "12:58", type: "success", message: "系统备份完成", status: "resolved" },
]

const resourceData = [
  { name: "CPU", usage: 68, color: "#1f2a40" },
  { name: "内存", usage: 45, color: "#4caf50" },
  { name: "磁盘", usage: 82, color: "#ffc107" },
]

const alertData = [
  { name: "紧急", value: 3, color: "#f44336" },
  { name: "错误", value: 5, color: "#ffc107" },
  { name: "警告", value: 4, color: "#2196f3" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-success"
    case "warning":
      return "bg-warning"
    case "error":
      return "bg-destructive"
    default:
      return "bg-secondary"
  }
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-warning" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-success" />
    case "info":
      return <Activity className="h-4 w-4 text-accent" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground">总览仪表盘</h1>
          <p className="text-muted-foreground mt-1">系统全局健康状况监控</p>
        </div>

        {/* 状态摘要栏 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">总资产数</p>
                  <p className="text-2xl font-semibold text-foreground">{statusSummary.totalAssets}</p>
                </div>
                <Server className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">异常资产数</p>
                  <p className="text-2xl font-semibold text-destructive">{statusSummary.abnormalAssets}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">当前告警数</p>
                  <p className="text-2xl font-semibold text-destructive">{statusSummary.currentAlerts}</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">进行中工单数</p>
                  <p className="text-2xl font-semibold text-foreground">{statusSummary.activeTickets}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 监控状态地图 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                网络拓扑状态
              </CardTitle>
              <CardDescription>核心设备实时状态监控</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-muted/30 rounded-lg p-4">
                {networkNodes.map((node) => (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(node.status)}`} />
                      <span className="text-xs text-muted-foreground text-center whitespace-nowrap">{node.name}</span>
                    </div>
                  </div>
                ))}
                {/* 连接线 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="30%"
                    x2="30%"
                    y2="60%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <line
                    x1="50%"
                    y1="30%"
                    x2="70%"
                    y2="60%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <line
                    x1="30%"
                    y1="60%"
                    x2="20%"
                    y2="80%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <line
                    x1="70%"
                    y1="60%"
                    x2="80%"
                    y2="80%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">正常</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-muted-foreground">警告</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">异常</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 快速操作入口 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
              <CardDescription>常用功能快速入口</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Scan className="h-4 w-4 mr-2" />
                一键扫描
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                新建工单
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                系统诊断
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Wifi className="h-4 w-4 mr-2" />
                网络测试
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 事件时间线 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                事件时间线
              </CardTitle>
              <CardDescription>最新系统事件和告警</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getEventIcon(event.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">{event.message}</p>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                      <Badge variant={event.status === "active" ? "destructive" : "secondary"} className="text-xs mt-1">
                        {event.status === "active" ? "进行中" : event.status === "resolved" ? "已解决" : "信息"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 资源利用率卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                资源利用率
              </CardTitle>
              <CardDescription>系统资源实时使用情况</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resourceData.map((resource) => (
                <div key={resource.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {resource.name === "CPU" && <Cpu className="h-4 w-4" />}
                      {resource.name === "内存" && <MemoryStick className="h-4 w-4" />}
                      {resource.name === "磁盘" && <HardDrive className="h-4 w-4" />}
                      <span className="text-sm font-medium">{resource.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{resource.usage}%</span>
                  </div>
                  <Progress value={resource.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 告警统计卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                告警统计
              </CardTitle>
              <CardDescription>不同级别告警数量分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={alertData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {alertData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {alertData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
