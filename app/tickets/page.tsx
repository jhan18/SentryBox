"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, MessageSquare, Paperclip } from "lucide-react"

// 模拟工单数据
const mockTickets = [
  {
    id: "T-001",
    title: "服务器CPU使用率过高",
    status: "待处理",
    priority: "高",
    creator: "张三",
    assignee: "李四",
    createdAt: "2024-01-15 09:30",
    description: "生产服务器CPU使用率持续超过90%，需要紧急处理",
  },
  {
    id: "T-002",
    title: "网络连接异常",
    status: "处理中",
    priority: "中",
    creator: "王五",
    assignee: "赵六",
    createdAt: "2024-01-14 14:20",
    description: "办公区域网络间歇性断开",
  },
  {
    id: "T-003",
    title: "数据库备份失败",
    status: "已解决",
    priority: "高",
    creator: "陈七",
    assignee: "李四",
    createdAt: "2024-01-13 16:45",
    description: "昨晚数据库自动备份任务失败",
  },
  {
    id: "T-004",
    title: "用户权限配置",
    status: "待处理",
    priority: "低",
    creator: "刘八",
    assignee: "张三",
    createdAt: "2024-01-12 11:15",
    description: "新员工需要配置系统访问权限",
  },
]

const statusColors = {
  待处理: "bg-yellow-100 text-yellow-800 border-yellow-300",
  处理中: "bg-blue-100 text-blue-800 border-blue-300",
  已解决: "bg-green-100 text-green-800 border-green-300",
}

const priorityColors = {
  高: "bg-red-100 text-red-800 border-red-300",
  中: "bg-orange-100 text-orange-800 border-orange-300",
  低: "bg-gray-100 text-gray-800 border-gray-300",
}

export default function TicketsPage() {
  const [statusFilter, setStatusFilter] = useState("全部")
  const [assigneeFilter, setAssigneeFilter] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesStatus = statusFilter === "全部" || ticket.status === statusFilter
    const matchesAssignee = assigneeFilter === "全部" || ticket.assignee === assigneeFilter
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesAssignee && matchesSearch
  })

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex">
          {/* 左侧过滤器 */}
          <div className="w-64 bg-card border-r p-4">
            <h3 className="text-lg font-semibold text-primary mb-4">筛选条件</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">状态</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部状态</SelectItem>
                    <SelectItem value="待处理">待处理</SelectItem>
                    <SelectItem value="处理中">处理中</SelectItem>
                    <SelectItem value="已解决">已解决</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">负责人</Label>
                <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部负责人</SelectItem>
                    <SelectItem value="张三">张三</SelectItem>
                    <SelectItem value="李四">李四</SelectItem>
                    <SelectItem value="赵六">赵六</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="mt-6 space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">总工单:</span> {mockTickets.length}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">待处理:</span> {mockTickets.filter((t) => t.status === "待处理").length}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">处理中:</span> {mockTickets.filter((t) => t.status === "处理中").length}
              </div>
            </div>
          </div>

          {/* 右侧主内容区 */}
          <div className="flex-1 pl-6">
            <div className="space-y-6">
              {/* 顶部操作栏 */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-foreground">工单列表</h1>
                  <p className="text-muted-foreground mt-1">管理和跟踪工单处理进度</p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      新建工单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新建工单</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">工单标题</Label>
                        <Input id="title" placeholder="请输入工单标题" />
                      </div>
                      <div>
                        <Label htmlFor="description">详细描述</Label>
                        <Textarea id="description" placeholder="请详细描述问题..." className="min-h-[120px]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>优先级</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择优先级" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="高">高</SelectItem>
                              <SelectItem value="中">中</SelectItem>
                              <SelectItem value="低">低</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>指派给</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择负责人" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="张三">张三</SelectItem>
                              <SelectItem value="李四">李四</SelectItem>
                              <SelectItem value="赵六">赵六</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>关联资产/告警</Label>
                        <Input placeholder="可选：关联相关设备或告警" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          上传附件
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          取消
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90">创建工单</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* 工单表格 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">工单列表 ({filteredTickets.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">工单ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">标题</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">状态</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">优先级</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">创建人</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">指派给</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">创建时间</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTickets.map((ticket) => (
                          <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <span className="font-mono text-sm text-primary">{ticket.id}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{ticket.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                                {ticket.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                                {ticket.priority}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-700">{ticket.creator}</td>
                            <td className="py-3 px-4 text-gray-700">{ticket.assignee}</td>
                            <td className="py-3 px-4 text-gray-500 text-sm">{ticket.createdAt}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  编辑
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  评论
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
