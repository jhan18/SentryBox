"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Smartphone, Clock } from "lucide-react"

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(false)

  return (
    <div className="bg-background w-[1280px] h-[800px] overflow-auto">
      <div className="px-8 py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">通知设置</h1>
          <p className="text-muted-foreground mt-1">管理您的通知偏好和告警设置</p>
        </div>

        <div className="grid gap-6">
          {/* 邮件通知设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                邮件通知
              </CardTitle>
              <CardDescription>配置邮件通知的接收设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">启用邮件通知</Label>
                  <p className="text-sm text-muted-foreground">接收系统告警和状态更新邮件</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">通知邮箱地址</Label>
                <Input id="email" type="email" placeholder="admin@company.com" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">紧急告警邮件</Label>
                  <p className="text-sm text-muted-foreground">立即发送紧急级别的告警邮件</p>
                </div>
                <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">维护通知邮件</Label>
                  <p className="text-sm text-muted-foreground">接收系统维护和更新通知</p>
                </div>
                <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
              </div>
            </CardContent>
          </Card>

          {/* 手机推送设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                手机App推送
              </CardTitle>
              <CardDescription>配置移动设备推送通知</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">启用推送通知</Label>
                  <p className="text-sm text-muted-foreground">向移动设备发送推送通知</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="space-y-2">
                <Label>推送频率</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">立即推送</SelectItem>
                    <SelectItem value="5min">5分钟汇总</SelectItem>
                    <SelectItem value="15min">15分钟汇总</SelectItem>
                    <SelectItem value="hourly">每小时汇总</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 静音时段设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                告警静音时段
              </CardTitle>
              <CardDescription>设置不接收非紧急告警的时间段</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>静音开始时间</Label>
                  <Input type="time" defaultValue="22:00" />
                </div>
                <div className="space-y-2">
                  <Label>静音结束时间</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>静音日期</Label>
                <div className="flex flex-wrap gap-2">
                  {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day) => (
                    <Button key={day} variant="outline" size="sm">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">紧急告警例外</Label>
                  <p className="text-sm text-muted-foreground">即使在静音时段也接收紧急告警</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <Button>保存设置</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
