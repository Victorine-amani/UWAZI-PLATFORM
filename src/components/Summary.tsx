import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  FileText, 
  Shield,
  Flag,
  Target,
  Activity,
  Calendar
} from 'lucide-react';

// Mock data for the summary
const summaryData = {
  overview: {
    totalProjects: 147,
    totalBudget: 245000000000, // KSh 245B
    totalSpent: 156000000000, // KSh 156B
    activeTenders: 23,
    totalLoans: 12,
    totalLoanAmount: 180000000000, // KSh 180B
    citizenReports: 456
  },
  projectStatus: {
    completed: 89,
    inProgress: 42,
    delayed: 16,
    cancelled: 0
  },
  sectorBreakdown: [
    { name: 'Health', projects: 34, budget: 78000000000, spent: 45000000000 },
    { name: 'Education', projects: 28, budget: 45000000000, spent: 32000000000 },
    { name: 'Infrastructure', projects: 41, budget: 89000000000, spent: 58000000000 },
    { name: 'Water & Sanitation', projects: 22, budget: 23000000000, spent: 15000000000 },
    { name: 'Agriculture', projects: 22, budget: 10000000000, spent: 6000000000 }
  ],
  recentActivity: [
    {
      type: 'project_completion',
      message: 'Kisumu Primary School Expansion completed',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      type: 'citizen_report',
      message: '8 new citizen reports filed for Thika Highway project',
      timestamp: '4 hours ago',
      status: 'warning'
    },
    {
      type: 'milestone_achieved',
      message: 'Nakuru Cancer Center reached 65% completion',
      timestamp: '1 day ago',
      status: 'info'
    },
    {
      type: 'tender_awarded',
      message: 'New tender awarded for Mombasa Port expansion',
      timestamp: '2 days ago',
      status: 'info'
    },
    {
      type: 'budget_release',
      message: 'KSh 2.5B budget released for Q4 projects',
      timestamp: '3 days ago',
      status: 'success'
    }
  ],
  performance: {
    onTimeProjects: 78,
    delayedProjects: 16,
    budgetVariance: -12, // Percentage
    citizenSatisfaction: 72 // Percentage
  },
  alerts: [
    {
      type: 'urgent',
      message: 'Thika Highway Phase 2 is 6 months behind schedule',
      count: 8,
      severity: 'high'
    },
    {
      type: 'budget',
      message: '5 projects are approaching budget limits',
      count: 5,
      severity: 'medium'
    },
    {
      type: 'tender',
      message: 'Tender applications closing in 3 days',
      count: 3,
      severity: 'low'
    }
  ]
};

function formatCurrency(amount: number): string {
  return `KSh ${(amount / 1000000000).toFixed(1)}B`;
}

function formatCurrencyM(amount: number): string {
  return `KSh ${(amount / 1000000).toFixed(0)}M`;
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'project_completion':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'citizen_report':
      return <Flag className="w-4 h-4 text-red-600" />;
    case 'milestone_achieved':
      return <Target className="w-4 h-4 text-red-600" />;
    case 'tender_awarded':
      return <FileText className="w-4 h-4 text-red-600" />;
    case 'budget_release':
      return <DollarSign className="w-4 h-4 text-green-600" />;
    default:
      return <Activity className="w-4 h-4 text-gray-600" />;
  }
}

function getAlertIcon(severity: string) {
  switch (severity) {
    case 'high':
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    case 'medium':
      return <Clock className="w-4 h-4 text-red-600" />;
    case 'low':
      return <Shield className="w-4 h-4 text-red-600" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-gray-600" />;
  }
}

export function Summary() {
  const budgetUtilization = (summaryData.overview.totalSpent / summaryData.overview.totalBudget) * 100;
  const projectCompletionRate = (summaryData.projectStatus.completed / summaryData.overview.totalProjects) * 100;

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl">{summaryData.overview.totalProjects}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">+12 this month</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl">{formatCurrency(summaryData.overview.totalBudget)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">{budgetUtilization.toFixed(1)}% utilized</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl">{summaryData.projectStatus.completed}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">{projectCompletionRate.toFixed(0)}% completion rate</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Citizen Reports</p>
                <p className="text-2xl">{summaryData.overview.citizenReports}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">+23 this week</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle>Project Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{summaryData.projectStatus.completed}</span>
                  <Badge variant="secondary">{projectCompletionRate.toFixed(0)}%</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{summaryData.projectStatus.inProgress}</span>
                  <Badge variant="secondary">{((summaryData.projectStatus.inProgress / summaryData.overview.totalProjects) * 100).toFixed(0)}%</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Delayed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{summaryData.projectStatus.delayed}</span>
                  <Badge variant="destructive">{((summaryData.projectStatus.delayed / summaryData.overview.totalProjects) * 100).toFixed(0)}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle>Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>On-Time Completion Rate</span>
                  <span>{((summaryData.performance.onTimeProjects / (summaryData.performance.onTimeProjects + summaryData.performance.delayedProjects)) * 100).toFixed(0)}%</span>
                </div>
                <Progress value={((summaryData.performance.onTimeProjects / (summaryData.performance.onTimeProjects + summaryData.performance.delayedProjects)) * 100)} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Budget Utilization</span>
                  <span>{budgetUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={budgetUtilization} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Citizen Satisfaction</span>
                  <span>{summaryData.performance.citizenSatisfaction}%</span>
                </div>
                <Progress value={summaryData.performance.citizenSatisfaction} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sector Breakdown */}
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
        <CardHeader>
          <CardTitle>Budget by Sector</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {summaryData.sectorBreakdown.map((sector, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b last:border-b-0">
                <div>
                  <div className="text-sm text-gray-600">Sector</div>
                  <div>{sector.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Projects</div>
                  <div>{sector.projects}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div>{formatCurrency(sector.budget)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Spent ({((sector.spent / sector.budget) * 100).toFixed(0)}%)</div>
                  <div>{formatCurrency(sector.spent)}</div>
                  <Progress value={(sector.spent / sector.budget) * 100} className="h-2 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {summaryData.alerts.map((alert, index) => (
                <div key={index} className={`flex items-start gap-3 p-4 border-b last:border-b-0 ${alert.severity === 'high' ? 'bg-red-50' : alert.severity === 'medium' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-sm">{alert.message}</span>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                        {alert.count}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summaryData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="text-sm">{activity.message}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Summary */}
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-red-600" />
            Loan Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl">{summaryData.overview.totalLoans}</div>
              <div className="text-sm text-gray-600">Active Loans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{formatCurrency(summaryData.overview.totalLoanAmount)}</div>
              <div className="text-sm text-gray-600">Total Loan Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">68%</div>
              <div className="text-sm text-gray-600">Average Disbursement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}