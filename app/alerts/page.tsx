"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TriangleAlert as AlertTriangle, Clock, Server, CircleCheck as CheckCircle, FileText } from "lucide-react"

// 模拟告警数据
const mockAlerts = [
  {
    id: 1,
    name: "CPU使用率过高",
    level: "critical",
    status: "ACTIVE",
    device: "Web服务器-01",
    description: "CPU使用率持续超过90%，可能影响系统性能",
    triggerTime: "2024-01-15 14:30:25",
    duration: "2小时15分钟",
  },
  {
    id: 2,
    name: "磁盘空间不足",
    level: "error",
    status: "ACTIVE",
    device: "数据库服务器",
    description: "系统磁盘剩余空间低于10%",
    triggerTime: "2024-01-15 13:45:12",
    duration: "3小时",
  },
  {
    id: 3,
    name: "网络延迟异常",
    level: "warning",
    status: "ACTIVE",
    device: "路由器-A",
    description: "网络响应时间超过正常阈值",
    triggerTime: "2024-01-15 12:20:08",
    duration: "4小时25分钟",
  },
  {
    id: 4,
    name: "内存使用率告警",
    level: "error",
    status: "RESOLVED",
    device: "应用服务器-02",
    description: "内存使用率曾达到95%，已自动释放",
    triggerTime: "2024-01-15 10:15:30",
    duration: "已解决",
  },
  {
    id: 5,
    name: "服务响应超时",
    level: "critical",
    status: "RESOLVED",
    device: "API网关",
    description: "API响应时间超过5秒，已重启服务",
    triggerTime: "2024-01-15 09:30:45",
    duration: "已解决",
  },
]

const levelConfig = {
  critical: { label: "紧急", color: "border-l-8 border-red-600 bg-red-50/80", badge: "bg-red-600" },
  error: { label: "错误", color: "border-l-8 border-orange-600 bg-orange-50/80", badge: "bg-orange-600" },
  warning: { label: "警告", color: "border-l-8 border-yellow-600 bg-yellow-50/80", badge: "bg-yellow-600" },
}

const statusConfig = {
  ACTIVE: { label: "活跃", color: "bg-red-500" },
  RESOLVED: { label: "已解决", color: "bg-green-500" },
}

export default function AlertsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    const statusMatch = statusFilter === "all" || alert.status === statusFilter
    const levelMatch = levelFilter === "all" || alert.level === levelFilter
    return statusMatch && levelMatch
  })

  const handleResolveAlert = (alertId: number) => {
    console.log("[v0] 标记告警为已解决:", alertId)
    // 这里可以添加实际的解决告警逻辑
  }

  const handleCreateTicket = (alert: any) => {
    console.log("[v0] 创建工单，预填充告警信息:", alert)
    // 这里可以添加跳转到工单创建页面的逻辑，并预填充告警信息
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">告警列表</h1>
            <p className="text-muted-foreground mt-1">监控系统告警信息，快速处理紧急问题</p>
          </div>
        </div>

        {/* 过滤器 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">过滤条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">状态:</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="ACTIVE">活跃</SelectItem>
                    <SelectItem value="RESOLVED">已解决</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">等级:</label>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="critical">紧急</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 告警统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">活跃告警</p>
                  <p className="text-2xl font-bold text-red-500">
                    {mockAlerts.filter((a) => a.status === "ACTIVE").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">紧急</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockAlerts.filter((a) => a.level === "critical" && a.status === "ACTIVE").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">错误</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {mockAlerts.filter((a) => a.level === "error" && a.status === "ACTIVE").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">已解决</p>
                  <p className="text-2xl font-bold text-green-500">
                    {mockAlerts.filter((a) => a.status === "RESOLVED").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 告警列表 */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`${levelConfig[alert.level as keyof typeof levelConfig].color} shadow-sm`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{alert.name}</h3>
                      <Badge className={`${levelConfig[alert.level as keyof typeof levelConfig].badge} text-white`}>
                        {levelConfig[alert.level as keyof typeof levelConfig].label}
                      </Badge>
                      <Badge className={`${statusConfig[alert.status as keyof typeof statusConfig].color} text-white`}>
                        {statusConfig[alert.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Server className="h-4 w-4" />
                        <span>来源设备: {alert.device}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>触发时间: {alert.triggerTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>持续时间: {alert.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {alert.status === "ACTIVE" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          标记为已解决
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCreateTicket(alert)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          创建工单
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">暂无告警信息</h3>
              <p className="text-sm text-muted-foreground">当前没有符合筛选条件的告警</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
