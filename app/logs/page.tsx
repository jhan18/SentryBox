"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ChartBar as BarChart3, Shield, Network, Search, Filter } from "lucide-react"

export default function LogsPage() {
  const [selectedDashboard, setSelectedDashboard] = useState("security")

  const dashboards = [
    {
      id: "security",
      title: "安全事件概览",
      description: "监控安全威胁、登录异常和访问控制事件",
      icon: Shield,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
    },
    {
      id: "network",
      title: "网络设备日志分析",
      description: "分析路由器、交换机和防火墙的运行状态",
      icon: Network,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "performance",
      title: "性能监控看板",
      description: "系统性能指标和应用程序响应时间分析",
      icon: BarChart3,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">日志中心</h1>
            <p className="text-muted-foreground mt-1">集中化日志分析和监控平台，支持自定义查询和预制看板</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              高级筛选
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              自定义查询
            </Button>
            <Button size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              打开Kibana
            </Button>
          </div>
        </div>

        {/* 预制看板选择 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon
            const isSelected = selectedDashboard === dashboard.id

            return (
              <Card
                key={dashboard.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-primary" : ""
                } ${dashboard.color}`}
                onClick={() => setSelectedDashboard(dashboard.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white ${dashboard.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                      {isSelected && (
                        <Badge variant="default" className="mt-1">
                          当前选中
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{dashboard.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Kibana嵌入区域 */}
        <Card className="min-h-[600px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{dashboards.find((d) => d.id === selectedDashboard)?.title}</CardTitle>
                <CardDescription>实时日志分析和可视化看板</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  刷新数据
                </Button>
                <Button variant="outline" size="sm">
                  导出报告
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  在新窗口打开
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Kibana iframe嵌入区域 */}
            <div className="w-full h-[500px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Kibana看板区域</h3>
                  <p className="text-muted-foreground text-sm mt-2">此区域将嵌入Kibana iframe，显示选中的预制看板</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    iframe src: /kibana/dashboard/{selectedDashboard}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  在Kibana中打开
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快速操作区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">实时日志流</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">查看实时日志数据流</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                打开日志流
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">历史查询</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">查看保存的查询历史</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                查看历史
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">告警规则</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">配置基于日志的告警</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                管理规则
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">数据导出</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">导出日志数据和报告</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                导出数据
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
