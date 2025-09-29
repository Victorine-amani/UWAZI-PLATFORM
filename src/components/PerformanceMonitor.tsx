import React, { useState } from 'react';
import { User, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Target, Award, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface Official {
  id: string;
  name: string;
  position: string;
  department: string;
  county: string;
  profileImage?: string;
  performance: {
    overallScore: number;
    quarter: string;
    totalProjects: number;
    completedProjects: number;
    onTrackProjects: number;
    delayedProjects: number;
    budgetAdherence: number;
    citizenSatisfaction: number;
    flagsResolved: number;
    totalFlags: number;
    quarterlyTrend: 'up' | 'down' | 'stable';
  };
  deliverables: Array<{
    id: string;
    promise: string;
    deadline: string;
    status: 'completed' | 'on-track' | 'delayed' | 'at-risk';
    progress: number;
    linkedProjectId?: string;
  }>;
  probationStatus?: {
    isOnProbation: boolean;
    quartersWithoutDelivery: number;
    probationStartDate?: string;
    probationEndDate?: string;
    reason: string;
  };
}

const mockOfficials: Official[] = [
  {
    id: 'OFF-001',
    name: 'Dr. Sarah Mwangi',
    position: 'Cabinet Secretary',
    department: 'Ministry of Health',
    county: 'National',
    performance: {
      overallScore: 78,
      quarter: 'Q3 2026',
      totalProjects: 8,
      completedProjects: 3,
      onTrackProjects: 4,
      delayedProjects: 1,
      budgetAdherence: 94,
      citizenSatisfaction: 82,
      flagsResolved: 15,
      totalFlags: 18,
      quarterlyTrend: 'up'
    },
    deliverables: [
      {
        id: 'DEL-001',
        promise: 'Complete 5 new health centers by end of 2026',
        deadline: '2026-12-31',
        status: 'on-track',
        progress: 60,
        linkedProjectId: 'PROJECT-NKR-CTC-001'
      },
      {
        id: 'DEL-002',
        promise: 'Reduce maternal mortality by 25%',
        deadline: '2027-06-30',
        status: 'on-track',
        progress: 45
      },
      {
        id: 'DEL-003',
        promise: 'Launch national telemedicine program',
        deadline: '2026-09-30',
        status: 'completed',
        progress: 100
      }
    ]
  },
  {
    id: 'OFF-002',
    name: 'Eng. Peter Kimani',
    position: 'Cabinet Secretary',
    department: 'Ministry of Transport',
    county: 'National',
    performance: {
      overallScore: 45,
      quarter: 'Q3 2026',
      totalProjects: 6,
      completedProjects: 1,
      onTrackProjects: 2,
      delayedProjects: 3,
      budgetAdherence: 67,
      citizenSatisfaction: 38,
      flagsResolved: 8,
      totalFlags: 23,
      quarterlyTrend: 'down'
    },
    deliverables: [
      {
        id: 'DEL-004',
        promise: 'Complete Thika Highway upgrade by Q4 2028',
        deadline: '2028-12-31',
        status: 'delayed',
        progress: 25,
        linkedProjectId: 'PROJECT-NRB-RD-078'
      },
      {
        id: 'DEL-005',
        promise: 'Launch BRT system in Nairobi',
        deadline: '2027-03-31',
        status: 'at-risk',
        progress: 15
      },
      {
        id: 'DEL-006',
        promise: 'Digitize transport licensing',
        deadline: '2026-10-31',
        status: 'delayed',
        progress: 35
      }
    ],
    probationStatus: {
      isOnProbation: false,
      quartersWithoutDelivery: 6,
      reason: 'Multiple project delays and citizen complaints. Two more quarters without significant delivery will trigger probation.'
    }
  },
  {
    id: 'OFF-003',
    name: 'James Ochieng',
    position: 'County Education Director',
    department: 'Education',
    county: 'Kisumu',
    performance: {
      overallScore: 89,
      quarter: 'Q3 2026',
      totalProjects: 12,
      completedProjects: 8,
      onTrackProjects: 3,
      delayedProjects: 1,
      budgetAdherence: 98,
      citizenSatisfaction: 91,
      flagsResolved: 22,
      totalFlags: 24,
      quarterlyTrend: 'up'
    },
    deliverables: [
      {
        id: 'DEL-007',
        promise: 'Build 10 new classrooms in Kisumu County',
        deadline: '2026-11-30',
        status: 'on-track',
        progress: 80,
        linkedProjectId: 'PROJECT-KSM-SCH-045'
      },
      {
        id: 'DEL-008',
        promise: 'Provide tablets to all primary schools',
        deadline: '2027-01-31',
        status: 'completed',
        progress: 100
      },
      {
        id: 'DEL-009',
        promise: 'Train 500 teachers on digital literacy',
        deadline: '2026-12-15',
        status: 'on-track',
        progress: 75
      }
    ]
  }
];

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'on-track': return 'bg-blue-100 text-blue-800';
    case 'delayed': return 'bg-red-100 text-red-800';
    case 'at-risk': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'on-track':
      return <TrendingUp className="w-4 h-4 text-blue-600" />;
    case 'delayed':
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    case 'at-risk':
      return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    default:
      return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  }
}

function OfficialCard({ official }: { official: Official }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{official.name}</CardTitle>
              <p className="text-sm text-gray-600">{official.position}</p>
              <p className="text-xs text-gray-500">{official.department} • {official.county}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon(official.performance.quarterlyTrend)}
            <Badge className={getScoreBadgeColor(official.performance.overallScore)}>
              {official.performance.overallScore}% Score
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Projects</div>
              <div className="text-lg">{official.performance.totalProjects}</div>
            </div>
            <div>
              <div className="text-gray-600">Completed</div>
              <div className="text-lg text-green-600">{official.performance.completedProjects}</div>
            </div>
            <div>
              <div className="text-gray-600">Budget Adherence</div>
              <div className="text-lg">{official.performance.budgetAdherence}%</div>
            </div>
            <div>
              <div className="text-gray-600">Citizen Satisfaction</div>
              <div className="text-lg">{official.performance.citizenSatisfaction}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Performance</span>
              <span className={getScoreColor(official.performance.overallScore)}>
                {official.performance.overallScore}%
              </span>
            </div>
            <Progress value={official.performance.overallScore} className="h-2" />
          </div>

          {/* Flags Resolution */}
          <div className="flex items-center justify-between text-sm">
            <span>Citizen Flags Resolved</span>
            <span>{official.performance.flagsResolved}/{official.performance.totalFlags}</span>
          </div>

          {/* Probation Warning */}
          {official.probationStatus && official.probationStatus.quartersWithoutDelivery >= 6 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <div className="flex items-center gap-2 text-yellow-800 text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                <strong>Performance Warning</strong>
              </div>
              <div className="text-xs text-yellow-700">
                {official.probationStatus.reason}
              </div>
            </div>
          )}

          {official.probationStatus?.isOnProbation && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <div className="flex items-center gap-2 text-red-800 text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                <strong>On Probation</strong>
              </div>
              <div className="text-xs text-red-700">
                Probation period: {official.probationStatus.probationStartDate} to {official.probationStatus.probationEndDate}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500">
            Performance data for {official.performance.quarter}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DeliverablesTab({ official }: { official: Official }) {
  return (
    <div className="space-y-4">
      {official.deliverables.map((deliverable) => (
        <Card key={deliverable.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="line-clamp-2">{deliverable.promise}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  Due: {new Date(deliverable.deadline).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {getStatusIcon(deliverable.status)}
                <Badge className={getStatusColor(deliverable.status)}>
                  {deliverable.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{deliverable.progress}%</span>
              </div>
              <Progress value={deliverable.progress} className="h-2" />
            </div>

            {deliverable.linkedProjectId && (
              <div className="mt-3">
                <Button variant="outline" size="sm">
                  View Linked Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PerformanceMonitor() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);

  const filteredOfficials = mockOfficials.filter(official => {
    const matchesDepartment = !selectedDepartment || selectedDepartment === 'all' || official.department.includes(selectedDepartment);
    const matchesCounty = !selectedCounty || selectedCounty === 'all' || official.county === selectedCounty;
    return matchesDepartment && matchesCounty;
  });

  const stats = {
    totalOfficials: mockOfficials.length,
    highPerformers: mockOfficials.filter(o => o.performance.overallScore >= 80).length,
    underPerformers: mockOfficials.filter(o => o.performance.overallScore < 60).length,
    onProbation: mockOfficials.filter(o => o.probationStatus?.isOnProbation).length,
    averageScore: Math.round(mockOfficials.reduce((sum, o) => sum + o.performance.overallScore, 0) / mockOfficials.length)
  };

  if (selectedOfficial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedOfficial(null)}>
            Back to Overview
          </Button>
          <div>
            <h2 className="text-2xl">{selectedOfficial.name}</h2>
            <p className="text-gray-600">{selectedOfficial.position}, {selectedOfficial.department}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl">{selectedOfficial.performance.overallScore}%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl">{selectedOfficial.performance.completedProjects}</div>
                  <div className="text-sm text-gray-600">Completed Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl">{selectedOfficial.performance.budgetAdherence}%</div>
                  <div className="text-sm text-gray-600">Budget Adherence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-2xl">{selectedOfficial.performance.citizenSatisfaction}%</div>
                  <div className="text-sm text-gray-600">Citizen Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deliverables" className="space-y-4">
          <TabsList>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="flags">Citizen Flags</TabsTrigger>
            <TabsTrigger value="performance">Performance History</TabsTrigger>
          </TabsList>

          <TabsContent value="deliverables">
            <DeliverablesTab official={selectedOfficial} />
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  Project details would be loaded here, showing all projects assigned to this official.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flags">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  Citizen flags and responses would be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  Historical performance data and trends would be shown here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl">{stats.totalOfficials}</div>
            <div className="text-sm text-gray-600">Total Officials</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-green-600">{stats.highPerformers}</div>
            <div className="text-sm text-gray-600">High Performers (80%+)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-red-600">{stats.underPerformers}</div>
            <div className="text-sm text-gray-600">Under Performers (&lt;60%)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-orange-600">{stats.onProbation}</div>
            <div className="text-sm text-gray-600">On Probation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl">{stats.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl">Official Performance Monitor</h2>
          <p className="text-gray-600">Track elected and appointed officials' delivery on promises</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm mb-2 block">Filter by Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Filter by County</label>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Counties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Counties</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="Nairobi">Nairobi</SelectItem>
                  <SelectItem value="Kisumu">Kisumu</SelectItem>
                  <SelectItem value="Nakuru">Nakuru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedCounty('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Officials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOfficials.map((official) => (
          <div key={official.id} onClick={() => setSelectedOfficial(official)} className="cursor-pointer">
            <OfficialCard official={official} />
          </div>
        ))}
      </div>

      {filteredOfficials.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">No officials match your current filters.</div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedCounty('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}