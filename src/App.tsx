import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, CheckCircle, Clock, DollarSign, Users, Flag, FileText, BarChart3, Shield, Menu, Home, MessageSquare, TrendingUp, CreditCard, Building2, Plus } from 'lucide-react';
import logoImage from 'figma:asset/9ba773b0a9a88d90c8bba807429fb9bca0bbe446.png';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarInset,
  SidebarTrigger
} from './components/ui/sidebar';
import { ProjectDetail } from './components/ProjectDetail';
import { LoanDetail } from './components/LoanDetail';
import { OfficialDetail } from './components/OfficialDetail';
import { ReportIssue } from './components/ReportIssue';
import { CitizenForum } from './components/CitizenForum';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Summary } from './components/Summary';
import { ProjectProposal } from './components/ProjectProposal';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Import comprehensive mock data
import { 
  mockProjects, 
  mockLoans, 
  mockUsers,
  mockContractors,
  mockMilestones,
  mockTenders,
  mockBids,
  mockAudits,
  mockTransactions,
  mockFlags,
  mockPerformanceRecords,
  mockTaxpayerFunds,
  mockPanelMembers,
  mockChangeLogs,
  formatCurrency,
  getStatusColor,
  type Project,
  type Loan,
  type User
} from './data/mockData';

// Create officials data from users for backward compatibility
const mockOfficials = mockUsers.filter(user => user.role === 'official').map((user, index) => {
  const userProjects = mockProjects.filter(p => p.assigned_official_id === user.user_id);
  const performance = mockPerformanceRecords.find(p => p.official_id === user.user_id);
  
  // Map to expected IDs that match OfficialDetail component
  const officialId = `OFF-${String(index + 1).padStart(3, '0')}`;
  
  return {
    id: officialId,
    name: user.name,
    position: user.name === 'Dr. Sarah Mwangi' ? 'Cabinet Secretary, Ministry of Health' : 
             user.name === 'James Ochieng' ? 'County Education Director' : 
             user.name === 'Mary Kamau' ? 'Chief Infrastructure Officer' : 'Government Official',
    county: user.county,
    projects: userProjects.map(p => p.project_id),
    performance: {
      score: performance?.score || 75,
      quarter: performance?.quarter || 'Q3 2026',
      deliverables: userProjects.length,
      completed: userProjects.filter(p => p.status === 'Completed').length,
      onTrack: userProjects.filter(p => p.status === 'In Progress').length,
      delayed: userProjects.filter(p => p.status === 'Delayed').length
    }
  };
});

function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  const projectFlags = mockFlags.filter(f => f.project_id === project.project_id);
  
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white" onClick={onClick}>
      <div className="relative">
        <ImageWithFallback
          src={project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fHwxNzU2NjE5OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080'}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(project.status).replace('red', '[#8B0000]')}>
            {project.status}
          </Badge>
        </div>
        {projectFlags.length > 0 && (
          <div className="absolute top-4 left-4">
            <Badge variant="destructive" className="flex items-center gap-1 bg-[#8B0000] text-white border-[#8B0000]">
              <Flag className="w-3 h-3" />
              {projectFlags.length}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-gray-900 font-semibold">{project.title}</CardTitle>
        <div className="flex items-center text-sm text-[#8B0000] font-medium">
          <MapPin className="w-4 h-4 mr-1" />
          {project.county}, {project.ward}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2 text-gray-700">
              <span className="font-medium">Progress</span>
              <span className="text-[#8B0000] font-semibold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3 bg-gray-100" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-[#8B0000] font-medium mb-1">Budget</div>
              <div className="text-gray-900 font-semibold">{formatCurrency(project.budget)}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-[#8B0000] font-medium mb-1">Spent</div>
              <div className="text-gray-900 font-semibold">{formatCurrency(project.spent)}</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 border-t pt-2">
            <span className="font-medium">Last updated:</span> {new Date(project.updated_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [selectedOfficial, setSelectedOfficial] = useState<typeof mockOfficials[0] | null>(null);
  const [reportIssueProject, setReportIssueProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeView, setActiveView] = useState('summary');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.ward.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = !selectedCounty || selectedCounty === 'all' || project.county.includes(selectedCounty);
    const matchesSector = !selectedSector || selectedSector === 'all' || project.sector === selectedSector;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesCounty && matchesSector && matchesStatus;
  });

  const stats = {
    totalProjects: mockProjects.length,
    completedProjects: mockProjects.filter(p => p.status === 'Completed').length,
    inProgressProjects: mockProjects.filter(p => p.status === 'In Progress').length,
    delayedProjects: mockProjects.filter(p => p.status === 'Delayed').length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: mockProjects.reduce((sum, p) => sum + p.spent, 0)
  };

  const menuItems = [
    { id: 'summary', label: 'Summary', icon: Home },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'proposal', label: 'Submit Proposal', icon: Plus },
    { id: 'loans', label: 'Loans', icon: CreditCard },
    { id: 'officials', label: 'Officials', icon: Users },
    { id: 'forum', label: 'Forum', icon: MessageSquare },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const renderContent = () => {
    // Handle different detail views
    if (selectedProject) {
      return <ProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)}
        onReportIssue={(project) => {
          setSelectedProject(null);
          setReportIssueProject(project);
        }}
      />;
    }
    
    if (selectedLoan) {
      return <LoanDetail loan={selectedLoan} onBack={() => setSelectedLoan(null)} />;
    }
    
    if (selectedOfficial) {
      return <OfficialDetail official={selectedOfficial} onBack={() => setSelectedOfficial(null)} />;
    }
    
    if (reportIssueProject) {
      return <ReportIssue project={reportIssueProject} onBack={() => setReportIssueProject(null)} />;
    }

    switch (activeView) {
      case 'summary':
        return <Summary />;
      case 'projects':
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <CardTitle className="text-[#8B0000] font-semibold">Search & Filter Projects</CardTitle>
                <p className="text-sm text-gray-600">Filter projects by location, sector, and status</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                    />
                  </div>

                  <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                    <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                      <SelectValue placeholder="All Counties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Counties</SelectItem>
                      <SelectItem value="Nairobi">Nairobi</SelectItem>
                      <SelectItem value="Nakuru">Nakuru</SelectItem>
                      <SelectItem value="Kisumu">Kisumu</SelectItem>
                      <SelectItem value="Mombasa">Mombasa</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Water">Water</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.project_id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        );
      case 'loans':
        const loanStats = {
          totalLoans: mockLoans.length,
          totalAmount: mockLoans.reduce((sum, loan) => sum + loan.amount, 0),
          totalDisbursed: mockLoans.reduce((sum, loan) => sum + loan.disbursed, 0),
          averageInterestRate: mockLoans.reduce((sum, loan) => sum + parseFloat(loan.terms.interest_rate), 0) / mockLoans.length,
          totalLinkedProjects: mockLoans.reduce((sum, loan) => sum + loan.linked_projects.length, 0)
        };

        const lenderBreakdown = mockLoans.reduce((acc, loan) => {
          if (!acc[loan.lender]) {
            acc[loan.lender] = { count: 0, amount: 0, disbursed: 0 };
          }
          acc[loan.lender].count += 1;
          acc[loan.lender].amount += loan.amount;
          acc[loan.lender].disbursed += loan.disbursed;
          return acc;
        }, {} as Record<string, { count: number; amount: number; disbursed: number }>);

        return (
          <div className="space-y-6">
            {/* Loans Summary */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <CardTitle className="text-[#8B0000] font-semibold">Loans Portfolio Overview</CardTitle>
                <p className="text-sm text-gray-600">Comprehensive breakdown of government loans and disbursements</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium mb-1">Total Loans</div>
                    <div className="text-2xl text-blue-600 font-bold">{loanStats.totalLoans}</div>
                    <div className="text-xs text-blue-600 mt-1">Active loan agreements</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 font-medium mb-1">Total Portfolio</div>
                    <div className="text-2xl text-green-600 font-bold">{formatCurrency(loanStats.totalAmount)}</div>
                    <div className="text-xs text-green-600 mt-1">Committed loan amount</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-700 font-medium mb-1">Total Disbursed</div>
                    <div className="text-2xl text-yellow-600 font-bold">{formatCurrency(loanStats.totalDisbursed)}</div>
                    <div className="text-xs text-yellow-600 mt-1">Funds received</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-medium mb-1">Avg. Interest Rate</div>
                    <div className="text-2xl text-purple-600 font-bold">{loanStats.averageInterestRate.toFixed(1)}%</div>
                    <div className="text-xs text-purple-600 mt-1">Weighted average</div>
                  </div>
                </div>

                {/* Overall Disbursement Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-3 text-gray-700">
                    <span className="font-medium">Overall Disbursement Progress</span>
                    <span className="text-[#8B0000] font-semibold">{Math.round((loanStats.totalDisbursed / loanStats.totalAmount) * 100)}%</span>
                  </div>
                  <Progress value={(loanStats.totalDisbursed / loanStats.totalAmount) * 100} className="h-4 bg-gray-100" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Disbursed: {formatCurrency(loanStats.totalDisbursed)}</span>
                    <span>Remaining: {formatCurrency(loanStats.totalAmount - loanStats.totalDisbursed)}</span>
                  </div>
                </div>

                {/* Lender Breakdown */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Breakdown by Lender</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(lenderBreakdown).map(([lender, data]) => (
                      <div key={lender} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-900 mb-2">{lender}</div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loans:</span>
                            <span className="text-gray-900 font-medium">{data.count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="text-gray-900 font-medium">{formatCurrency(data.amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Disbursed:</span>
                            <span className="text-[#8B0000] font-medium">{formatCurrency(data.disbursed)}</span>
                          </div>
                          <div className="mt-2">
                            <Progress value={(data.disbursed / data.amount) * 100} className="h-2 bg-gray-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Loans */}
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Individual Loan Details</h2>
                <Badge variant="outline" className="border-[#8B0000] text-[#8B0000] font-medium">
                  {mockLoans.length} loans • {loanStats.totalLinkedProjects} linked projects
                </Badge>
              </div>
              
              {mockLoans.map((loan) => (
                <Card key={loan.loan_id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white" onClick={() => setSelectedLoan(loan)}>
                  <CardHeader className="border-b border-gray-100 bg-gray-50">
                    <CardTitle className="flex items-center justify-between text-gray-900">
                      <span className="font-semibold">{loan.purpose}</span>
                      <Badge variant="outline" className="border-[#8B0000] text-[#8B0000] font-medium">{loan.loan_id}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Lender</div>
                        <div className="text-gray-900 font-semibold">{loan.lender}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Total Amount</div>
                        <div className="text-gray-900 font-semibold">{formatCurrency(loan.amount)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Disbursed</div>
                        <div className="text-gray-900 font-semibold">{formatCurrency(loan.disbursed)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Interest Rate</div>
                        <div className="text-gray-900 font-semibold">{loan.terms.interest_rate}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Term</div>
                        <div className="text-gray-900 font-semibold">{loan.terms.duration_years} years</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-[#8B0000] font-medium mb-1">Linked Projects</div>
                        <div className="text-gray-900 font-semibold">{loan.linked_projects.length} projects</div>
                      </div>
                    </div>
                    <div className="mt-6 border-t pt-4">
                      <div className="flex justify-between text-sm mb-3 text-gray-700">
                        <span className="font-medium">Disbursement Progress</span>
                        <span className="text-[#8B0000] font-semibold">{Math.round((loan.disbursed / loan.amount) * 100)}%</span>
                      </div>
                      <Progress value={(loan.disbursed / loan.amount) * 100} className="h-3 bg-gray-100" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'officials':
        return (
          <div className="grid gap-6">
            {mockOfficials.map((official) => (
              <Card key={official.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white" onClick={() => setSelectedOfficial(official)}>
                <CardHeader className="border-b border-gray-100 bg-gray-50">
                  <CardTitle className="text-gray-900 font-semibold">{official.name}</CardTitle>
                  <p className="text-sm text-[#8B0000] font-medium">{official.position}</p>
                  <div className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">County:</span> {official.county}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                      <div className="text-sm text-green-700 font-medium mb-1">Performance Score</div>
                      <div className="text-2xl text-green-600 font-bold">{official.performance.score}%</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                      <div className="text-sm text-blue-700 font-medium mb-1">Total Projects</div>
                      <div className="text-2xl text-blue-600 font-bold">{official.projects.length}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                      <div className="text-sm text-green-700 font-medium mb-1">Completed</div>
                      <div className="text-2xl text-green-600 font-bold">{official.performance.completed}</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                      <div className="text-sm text-red-700 font-medium mb-1">Delayed</div>
                      <div className="text-2xl text-red-600 font-bold">{official.performance.delayed}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Performance Quarter:</span> {official.performance.quarter}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'proposal':
        return <ProjectProposal />;
      case 'forum':
        return <CitizenForum />;
      case 'performance':
        return <PerformanceMonitor />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <Summary />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100 flex w-full">
        <Sidebar className="bg-[#8B0000] border-r border-[rgba(255,255,255,0.1)]">
          <SidebarHeader className="border-b border-[rgba(255,255,255,0.1)] bg-[#8B0000] p-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={logoImage}
                  alt="Kenya Flag"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-semibold text-white whitespace-nowrap">UWAZI PLATFORM</h1>
                <p className="text-xs text-red-100 whitespace-nowrap">Government Transparency</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-[#8B0000] p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={
                      (selectedProject && item.id === 'projects') ||
                      (selectedLoan && item.id === 'loans') ||
                      (selectedOfficial && item.id === 'officials') ||
                      (reportIssueProject && item.id === 'projects') ||
                      (!selectedProject && !selectedLoan && !selectedOfficial && !reportIssueProject && activeView === item.id)
                    }
                    onClick={() => {
                      // Clear all detail views
                      setSelectedProject(null);
                      setSelectedLoan(null);
                      setSelectedOfficial(null);
                      setReportIssueProject(null);
                      setActiveView(item.id);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors data-[active=true]:bg-white data-[active=true]:text-[#8B0000] mb-1"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-[#8B0000] hover:bg-gray-50" />
                {(selectedProject || selectedLoan || selectedOfficial || reportIssueProject) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      if (selectedProject) setSelectedProject(null);
                      if (selectedLoan) setSelectedLoan(null);
                      if (selectedOfficial) setSelectedOfficial(null);
                      if (reportIssueProject) setReportIssueProject(null);
                    }}
                    className="h-8 px-3 text-[#8B0000] hover:bg-gray-50 font-medium"
                  >
                    ← Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">REPUBLIC OF KENYA</div>
                  <div className="text-xs text-gray-600">Ministry of Interior & National Administration</div>
                </div>
                <Button variant="outline" size="sm" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-50">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}