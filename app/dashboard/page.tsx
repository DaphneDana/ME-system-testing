"use client"

import React from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, FileText, Activity, BarChart3, Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Sarah Nakato" userRole="Executive Director" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">M&E Officer Dashboard</h1>
                <p className="text-gray-600">Monitor activities, track indicators, and manage data quality</p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Activities This Month</p>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-xs text-gray-500">+12 from last month</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Data Collection Rate</p>
                      <p className="text-2xl font-bold">89%</p>
                      <Progress value={89} className="w-16 mt-2" />
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-gray-500">Due this week</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Field Visits</p>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-xs text-gray-500">This quarter</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Key Indicators Progress */}
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Key Indicators Progress
                      <Select defaultValue="current">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current">Current Quarter</SelectItem>
                          <SelectItem value="last">Last Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Water Access Improvement</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                      <p className="text-xs text-gray-500 mt-1">Target: 85% | Status: Ahead</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Livelihood Training Completion</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} />
                      <p className="text-xs text-gray-500 mt-1">Target: 75% | Status: Behind</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Education Enrollment</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                      <p className="text-xs text-gray-500 mt-1">Target: 85% | Status: Ahead</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Environmental Conservation</span>
                        <span>43%</span>
                      </div>
                      <Progress value={43} />
                      <p className="text-xs text-gray-500 mt-1">Target: 60% | Status: Critical</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Tracking Calendar */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Activity Tracking Calendar
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Month
                        </Button>
                        <Button variant="outline" size="sm">
                          Week
                        </Button>
                        <Button variant="outline" size="sm">
                          Day
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      <div className="font-medium text-gray-500 py-2">Sun</div>
                      <div className="font-medium text-gray-500 py-2">Mon</div>
                      <div className="font-medium text-gray-500 py-2">Tue</div>
                      <div className="font-medium text-gray-500 py-2">Wed</div>
                      <div className="font-medium text-gray-500 py-2">Thu</div>
                      <div className="font-medium text-gray-500 py-2">Fri</div>
                      <div className="font-medium text-gray-500 py-2">Sat</div>

                      {/* Calendar days */}
                      <div className="py-2 text-gray-400">29</div>
                      <div className="py-2 text-gray-400">30</div>
                      <div className="py-2 text-gray-400">31</div>
                      <div className="py-2">1</div>
                      <div className="py-2 bg-blue-100 rounded">2</div>
                      <div className="py-2">3</div>
                      <div className="py-2">4</div>

                      <div className="py-2">5</div>
                      <div className="py-2">6</div>
                      <div className="py-2">7</div>
                      <div className="py-2">8</div>
                      <div className="py-2">9</div>
                      <div className="py-2">10</div>
                      <div className="py-2">11</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Data Entry */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Data Entry</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Activity Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Field Visit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="field-visit">Field Visit</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Project</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Water & Sanitation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">Water & Sanitation</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="livelihood">Livelihood</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                      <Input type="date" defaultValue="2025-01-23" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Participants</label>
                      <Input placeholder="Number of participants" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
                      <Textarea placeholder="Activity notes..." rows={3} />
                    </div>

                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}