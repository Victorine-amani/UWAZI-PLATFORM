import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, Clock, Flag, Users, FileText, Award, Target, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

function formatCurrency(amount: number): string {
  return `KSh ${(amount / 1000000000).toFixed(1)}B`;
}

export function AnalyticsDashboard() {
  // Mock analytics data
  const overallStats = {
    totalBudget: 150000000000, // KSh 150B
    totalSpent: 87500000000,   // KSh 87.5B
    totalProjects: 847,
    completedProjects: 234,
    onTimeDelivery: 78,
    budgetEfficiency: 92,
    citizenSatisfaction: 73,
    flagsResolved: 1247,
    totalFlags: 1398
  };

  const sectorBreakdown = [
    { sector: 'Health', budget: 35000000000, spent: 21000000000, projects: 145, completion: 68 },
    { sector: 'Education', budget: 28000000000, spent: 16800000000, projects: 198, completion: 74 },
    { sector: 'Infrastructure', budget: 45000000000, spent: 27000000000, projects: 87, completion: 60 },
    { sector: 'Water & Sanitation', budget: 18000000000, spent: 10800000000, projects: 156, completion: 82 },
    { sector: 'Agriculture', budget: 15000000000, spent: 9000000000, projects: 134, completion: 71 },
    { sector: 'Technology', budget: 9000000000, spent: 2700000000, projects: 127, completion: 45 }
  ];

  const countyPerformance = [
    { county: 'Nairobi', score: 84, projects: 98, flagRate: 12, satisfaction: 79 },
    { county: 'Nakuru', score: 78, projects: 67, flagRate: 8, satisfaction: 82 },
    { county: 'Kisumu', score: 92, projects: 89, flagRate: 5, satisfaction: 91 },
    { county: 'Mombasa', score: 71, projects: 54, flagRate: 18, satisfaction: 68 },
    { county: 'Machakos', score: 86, projects: 43, flagRate: 7, satisfaction: 85 }
  ];

  const timelineData = [
    { quarter: 'Q1 2025', completed: 45, budget: 18000000000, satisfaction: 69 },
    { quarter: 'Q2 2025', completed: 52, budget: 21000000000, satisfaction: 71 },
    { quarter: 'Q3 2025', completed: 48, budget: 19500000000, satisfaction: 74 },
    { quarter: 'Q4 2025', completed: 61, budget: 23000000000, satisfaction: 76 },
    { quarter: 'Q1 2026', completed: 58, budget: 22000000000, satisfaction: 73 },
    { quarter: 'Q2 2026', completed: 67, budget: 25000000000, satisfaction: 75 },
    { quarter: 'Q3 2026', completed: 72, budget: 26500000000, satisfaction: 73 }
  ];

  const riskIndicators = [
    {
      type: 'High Risk Projects',
      count: 23,
      description: 'Projects with significant delays or budget overruns',
      trend: 'down',
      color: 'text-red-600'
    },
    {
      type: 'Audit Red Flags',
      count: 8,
      description: 'Active investigations by Auditor General',
      trend: 'up',
      color: 'text-orange-600'
    },
    {
      type: 'Contract Disputes',
      count: 12,
      description: 'Projects with ongoing contractor disputes',
      trend: 'stable',
      color: 'text-yellow-600'
    },
    {
      type: 'Citizen Complaints',
      count: 151,
      description: 'Unresolved citizen flags requiring attention',
      trend: 'down',
      color: 'text-blue-600'
    }
  ];

  const loanTracking = {
    totalLoans: 15,
    totalValue: 85000000000, // KSh 85B
    disbursed: 31000000000,  // KSh 31B
    projectsLinked: 156,
    onSchedule: 87,
    averageInterest: 2.8
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl">Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive overview of government project performance and transparency metrics</p>
      </div>

      {/* Overall Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl">{formatCurrency(overallStats.totalBudget)}</p>
                <div className="text-xs text-gray-500">
                  {formatCurrency(overallStats.totalSpent)} spent ({Math.round((overallStats.totalSpent / overallStats.totalBudget) * 100)}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl">{overallStats.totalProjects}</p>
                <div className="text-xs text-gray-500">
                  {overallStats.completedProjects} completed ({Math.round((overallStats.completedProjects / overallStats.totalProjects) * 100)}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">On-Time Delivery</p>
                <p className="text-2xl">{overallStats.onTimeDelivery}%</p>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs last quarter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Citizen Satisfaction</p>
                <p className="text-2xl">{overallStats.citizenSatisfaction}%</p>
                <div className="text-xs text-red-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -2% vs last quarter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sector Performance */}
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
        <CardHeader>
          <CardTitle>Performance by Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorBreakdown.map((sector) => (
              <div key={sector.sector} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4>{sector.sector}</h4>
                  <Badge className={sector.completion >= 70 ? 'bg-green-100 text-green-800' : 
                                  sector.completion >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}>
                    {sector.completion}% Complete
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Budget</div>
                    <div>{formatCurrency(sector.budget)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Spent</div>
                    <div>{formatCurrency(sector.spent)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Projects</div>
                    <div>{sector.projects}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Efficiency</div>
                    <div>{Math.round((sector.spent / sector.budget) * 100)}%</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={sector.completion} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* County Performance and Risk Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle>Top Performing Counties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countyPerformance
                .sort((a, b) => b.score - a.score)
                .map((county, index) => (
                <div key={county.county} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div>{county.county}</div>
                      <div className="text-sm text-gray-600">{county.projects} projects</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">{county.score}%</div>
                    <div className="text-xs text-gray-600">{county.satisfaction}% satisfaction</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardHeader>
            <CardTitle>Risk Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskIndicators.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div>
                      <div>{risk.type}</div>
                      <div className="text-sm text-gray-600">{risk.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${risk.color}`}>{risk.count}</span>
                    {risk.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-600" />}
                    {risk.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-600" />}
                    {risk.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Tracking */}
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
        <CardHeader>
          <CardTitle>Loan Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <div className="text-sm text-gray-600">Active Loans</div>
              <div className="text-2xl">{loanTracking.totalLoans}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl">{formatCurrency(loanTracking.totalValue)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Disbursed</div>
              <div className="text-2xl">{formatCurrency(loanTracking.disbursed)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Linked Projects</div>
              <div className="text-2xl">{loanTracking.projectsLinked}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">On Schedule</div>
              <div className="text-2xl text-green-600">{loanTracking.onSchedule}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg Interest</div>
              <div className="text-2xl">{loanTracking.averageInterest}%</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Disbursement Progress</span>
              <span>{Math.round((loanTracking.disbursed / loanTracking.totalValue) * 100)}%</span>
            </div>
            <Progress value={(loanTracking.disbursed / loanTracking.totalValue) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineData.map((quarter, index) => (
              <div key={quarter.quarter} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm">{quarter.quarter}</div>
                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="text-gray-600">Completed</div>
                      <div>{quarter.completed} projects</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Budget</div>
                      <div>{formatCurrency(quarter.budget)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Satisfaction</div>
                      <div>{quarter.satisfaction}%</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && quarter.satisfaction > timelineData[index - 1].satisfaction && (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  )}
                  {index > 0 && quarter.satisfaction < timelineData[index - 1].satisfaction && (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Transparency Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">87%</div>
            <div className="text-sm text-gray-600 mb-4">
              Based on project documentation, milestone evidence, and audit compliance
            </div>
            <Progress value={87} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Accountability Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">74%</div>
            <div className="text-sm text-gray-600 mb-4">
              Official responsiveness to citizen flags and deliverable completion rates
            </div>
            <Progress value={74} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Citizen Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">92%</div>
            <div className="text-sm text-gray-600 mb-4">
              Platform usage, proposal submissions, and voting participation
            </div>
            <Progress value={92} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}