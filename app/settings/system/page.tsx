"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Cpu, MemoryStick, Network, Info, Download, RefreshCw } from "lucide-react"

const systemInfo = {
  version: "v2.1.3",
  buildDate: "2024-01-15",
  uptime: "15天 8小时 32分钟",
  hostname: "monitoring-server-01",
  os: "Ubuntu 22.04.3 LTS",
  kernel: "5.15.0-91-generic",
}

const hardwareInfo = {
  cpu: {
    model: "Intel Xeon E5-2686 v4",
    cores: 8,
    usage: 35,
  },
  memory: {
    total: 32,
    used: 18.5,
    usage: 58,
  },
  storage: [
    { name: "系统盘 (/)", total: 100, used: 45, usage: 45 },
    { name: "数据盘 (/data)", total: 500, used: 280, usage: 56 },
    { name: "日志盘 (/logs)", total: 200, used: 120, usage: 60 },
  ],
}

const networkInterfaces = [
  { name: "eth0", ip: "192.168.1.100", status: "up", speed: "1000 Mbps" },
  { name: "eth1", ip: "10.0.0.50", status: "up", speed: "1000 Mbps" },
  { name: "lo", ip: "127.0.0.1", status: "up", speed: "N/A" },
]

export default function SystemInfoPage() {
  return (
    <div className="bg-background w-[1280px] h-[800px] overflow-auto">
      <div className="px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">系统信息</h1>
            <p className="text-muted-foreground mt-2">查看系统硬件状态和版本信息</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新信息
          </Button>
        </div>

        {/* 系统基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              系统基本信息
            </CardTitle>
            <CardDescription>系统版本和运行状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">系统版本</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{systemInfo.version}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">构建日期</p>
                <p className="text-sm">{systemInfo.buildDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">运行时间</p>
                <p className="text-sm">{systemInfo.uptime}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">主机名</p>
                <p className="text-sm">{systemInfo.hostname}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">操作系统</p>
                <p className="text-sm">{systemInfo.os}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">内核版本</p>
                <p className="text-sm">{systemInfo.kernel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 硬件状态 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CPU信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                CPU状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{hardwareInfo.cpu.model}</p>
                <p className="text-sm text-muted-foreground">{hardwareInfo.cpu.cores} 核心</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>使用率</span>
                  <span>{hardwareInfo.cpu.usage}%</span>
                </div>
                <Progress value={hardwareInfo.cpu.usage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* 内存信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MemoryStick className="h-5 w-5" />
                内存状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">总内存: {hardwareInfo.memory.total} GB</p>
                <p className="text-sm text-muted-foreground">已使用: {hardwareInfo.memory.used} GB</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>使用率</span>
                  <span>{hardwareInfo.memory.usage}%</span>
                </div>
                <Progress value={hardwareInfo.memory.usage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 存储信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              存储状态
            </CardTitle>
            <CardDescription>各分区的使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hardwareInfo.storage.map((disk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{disk.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {disk.used} GB / {disk.total} GB
                    </p>
                  </div>
                  <Progress value={disk.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 网络接口 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              网络接口
            </CardTitle>
            <CardDescription>网络接口状态和配置</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">接口名称</th>
                    <th className="text-left p-4">IP地址</th>
                    <th className="text-left p-4">状态</th>
                    <th className="text-left p-4">速度</th>
                  </tr>
                </thead>
                <tbody>
                  {networkInterfaces.map((iface, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{iface.name}</td>
                      <td className="p-4">{iface.ip}</td>
                      <td className="p-4">
                        <Badge variant={iface.status === "up" ? "default" : "secondary"}>
                          {iface.status === "up" ? "运行中" : "已停止"}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{iface.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
