"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Server, Network, HardDrive, Cpu, MemoryStick } from "lucide-react"

export default function MonitoringConfigPage() {
  const [autoDiscovery, setAutoDiscovery] = useState(true)
  const [cpuThreshold, setCpuThreshold] = useState([80])
  const [memoryThreshold, setMemoryThreshold] = useState([85])
  const [diskThreshold, setDiskThreshold] = useState([90])

  return (
    <div className="bg-background p-6">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">监控配置</h1>
          <p className="text-muted-foreground mt-2">配置系统监控参数和告警阈值</p>
        </div>

        <Tabs defaultValue="thresholds" className="space-y-6">
          <TabsList>
            <TabsTrigger value="thresholds">告警阈值</TabsTrigger>
            <TabsTrigger value="discovery">设备发现</TabsTrigger>
            <TabsTrigger value="collection">数据采集</TabsTrigger>
            <TabsTrigger value="retention">数据保留</TabsTrigger>
          </TabsList>

          <TabsContent value="thresholds" className="space-y-6">
            {/* CPU监控阈值 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  CPU使用率阈值
                </CardTitle>
                <CardDescription>设置CPU使用率的告警阈值</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>警告阈值: {cpuThreshold[0]}%</Label>
                  <Slider value={cpuThreshold} onValueChange={setCpuThreshold} max={100} step={5} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>检查间隔</Label>
                    <Select defaultValue="1min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30s">30秒</SelectItem>
                        <SelectItem value="1min">1分钟</SelectItem>
                        <SelectItem value="5min">5分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>持续时间</Label>
                    <Select defaultValue="5min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1分钟</SelectItem>
                        <SelectItem value="5min">5分钟</SelectItem>
                        <SelectItem value="10min">10分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 内存监控阈值 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5" />
                  内存使用率阈值
                </CardTitle>
                <CardDescription>设置内存使用率的告警阈值</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>警告阈值: {memoryThreshold[0]}%</Label>
                  <Slider
                    value={memoryThreshold}
                    onValueChange={setMemoryThreshold}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 磁盘监控阈值 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  磁盘使用率阈值
                </CardTitle>
                <CardDescription>设置磁盘使用率的告警阈值</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>警告阈值: {diskThreshold[0]}%</Label>
                  <Slider
                    value={diskThreshold}
                    onValueChange={setDiskThreshold}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discovery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  自动设备发现
                </CardTitle>
                <CardDescription>配置网络设备的自动发现功能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">启用自动发现</Label>
                    <p className="text-sm text-muted-foreground">自动扫描网络中的新设备</p>
                  </div>
                  <Switch checked={autoDiscovery} onCheckedChange={setAutoDiscovery} />
                </div>

                <div className="space-y-2">
                  <Label>扫描网段</Label>
                  <Input placeholder="192.168.1.0/24" />
                </div>

                <div className="space-y-2">
                  <Label>扫描间隔</Label>
                  <Select defaultValue="1hour">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15分钟</SelectItem>
                      <SelectItem value="30min">30分钟</SelectItem>
                      <SelectItem value="1hour">1小时</SelectItem>
                      <SelectItem value="6hour">6小时</SelectItem>
                      <SelectItem value="24hour">24小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>SNMP社区字符串</Label>
                  <Input placeholder="public" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  数据采集配置
                </CardTitle>
                <CardDescription>配置监控数据的采集频率和方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>基础指标采集间隔</Label>
                    <Select defaultValue="1min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30s">30秒</SelectItem>
                        <SelectItem value="1min">1分钟</SelectItem>
                        <SelectItem value="5min">5分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>详细指标采集间隔</Label>
                    <Select defaultValue="5min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1分钟</SelectItem>
                        <SelectItem value="5min">5分钟</SelectItem>
                        <SelectItem value="15min">15分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>并发采集线程数</Label>
                  <Input type="number" defaultValue="10" min="1" max="50" />
                </div>

                <div className="space-y-2">
                  <Label>超时时间（秒）</Label>
                  <Input type="number" defaultValue="30" min="5" max="300" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  数据保留策略
                </CardTitle>
                <CardDescription>配置监控数据的保留时间</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>原始数据保留</Label>
                    <Select defaultValue="7days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3days">3天</SelectItem>
                        <SelectItem value="7days">7天</SelectItem>
                        <SelectItem value="14days">14天</SelectItem>
                        <SelectItem value="30days">30天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>聚合数据保留</Label>
                    <Select defaultValue="90days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30days">30天</SelectItem>
                        <SelectItem value="90days">90天</SelectItem>
                        <SelectItem value="180days">180天</SelectItem>
                        <SelectItem value="365days">1年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>告警记录保留</Label>
                  <Select defaultValue="365days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90days">90天</SelectItem>
                      <SelectItem value="180days">180天</SelectItem>
                      <SelectItem value="365days">1年</SelectItem>
                      <SelectItem value="730days">2年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>最大存储空间 (GB)</Label>
                  <Input type="number" defaultValue="100" min="10" max="1000" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button>保存配置</Button>
        </div>
      </div>
    </div>
  )
}
