import React from 'react';
import { ArrowLeft, DollarSign, Calendar, FileText, Building2, TrendingUp, AlertTriangle, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Loan, formatCurrency, getStatusColor, mockProjects } from '../data/mockData';

interface LoanDetailProps {
  loan: Loan;
  onBack: () => void;
}

function formatCurrencyB(amount: number): string {
  return `KSh ${(amount / 1000000000).toFixed(1)}B`;
}

// Mock detailed loan data extending the new structure
const mockLoanDetails = {
  'LOAN-2026-WB-002': {
    conditions: [
      'Environmental compliance certification required',
      'Quarterly progress reports mandatory',
      'Anti-corruption measures implementation',
      'Public procurement transparency'
    ],
    disbursements: [
      { date: '2026-01-15', amount: 2000000000, purpose: 'Initial infrastructure setup', status: 'Completed' },
      { date: '2026-04-15', amount: 3000000000, purpose: 'Phase 1 construction', status: 'Completed' },
      { date: '2026-08-01', amount: 3000000000, purpose: 'Phase 2 construction', status: 'Completed' },
      { date: '2026-11-15', amount: 2500000000, purpose: 'Equipment procurement', status: 'Pending' },
      { date: '2027-03-15', amount: 4000000000, purpose: 'Phase 3 construction', status: 'Pending' }
    ],
    covenants: [
      { type: 'Financial', description: 'Maintain debt-to-GDP ratio below 55%', status: 'Compliant' },
      { type: 'Technical', description: 'Implement e-procurement system', status: 'In Progress' },
      { type: 'Environmental', description: 'Complete environmental impact assessments', status: 'Compliant' },
      { type: 'Social', description: 'Community engagement programs', status: 'Compliant' }
    ]
  },
  'LOAN-2025-JICA-105': {
    conditions: [
      'Technical capacity building program',
      'Local content requirements (30% minimum)',
      'Gender equality measures in employment',
      'Technology transfer agreements'
    ],
    disbursements: [
      { date: '2025-10-01', amount: 1500000000, purpose: 'Project preparation', status: 'Completed' },
      { date: '2026-06-01', amount: 1500000000, purpose: 'Initial construction', status: 'Completed' },
      { date: '2026-12-01', amount: 2000000000, purpose: 'Main construction phase', status: 'Pending' },
      { date: '2027-06-01', amount: 3000000000, purpose: 'Infrastructure completion', status: 'Pending' }
    ],
    covenants: [
      { type: 'Financial', description: 'Quarterly financial reporting', status: 'Compliant' },
      { type: 'Technical', description: 'Use of Japanese technology standards', status: 'Compliant' },
      { type: 'Environmental', description: 'Zero-emission targets for operations', status: 'In Progress' },
      { type: 'Social', description: 'Skills development programs', status: 'Compliant' }
    ]
  }
};

export function LoanDetail({ loan, onBack }: LoanDetailProps) {
  const details = mockLoanDetails[loan.loan_id as keyof typeof mockLoanDetails];
  const disbursementRate = (loan.disbursed / loan.amount) * 100;
  const linkedProjectDetails = mockProjects.filter(p => loan.linked_projects.includes(p.project_id));

  return (
    <div className="space-y-6">
      {/* Loan Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Loan Agreement</h1>
              <p className="text-red-600">{loan.purpose}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Lender:</span>
                <span className="text-gray-900">{loan.lender}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Signed:</span>
                <span className="text-gray-900">{new Date(loan.signed_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Interest Rate:</span>
                <span className="text-gray-900">{loan.terms.interest_rate}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Term:</span>
                <span className="text-gray-900">{loan.terms.duration_years} years</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-700">
                  <span>Disbursement Progress</span>
                  <span className="text-red-700">{disbursementRate.toFixed(1)}%</span>
                </div>
                <Progress value={disbursementRate} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-red-600">Total Amount</div>
                  <div className="text-lg text-gray-900">{formatCurrencyB(loan.amount)}</div>
                </div>
                <div>
                  <div className="text-red-600">Disbursed</div>
                  <div className="text-lg text-green-600">{formatCurrencyB(loan.disbursed)}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="text-red-600">Remaining</div>
                <div className="text-lg text-gray-900">{formatCurrencyB(loan.amount - loan.disbursed)}</div>
              </div>

              <div className="text-sm">
                <div className="text-red-600">Linked Projects</div>
                <div className="text-gray-900">{loan.linked_projects.length} active projects</div>
              </div>

              <div className="text-sm">
                <div className="text-red-600">Status</div>
                <Badge className={getStatusColor(loan.status)}>
                  {loan.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="disbursements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="projects">Linked Projects</TabsTrigger>
          <TabsTrigger value="covenants">Covenants</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="disbursements">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Disbursement Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details?.disbursements.map((disbursement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-red-100 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg text-gray-900">{formatCurrencyB(disbursement.amount)}</div>
                        <Badge className={getStatusColor(disbursement.status)}>
                          {disbursement.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-red-600">{disbursement.purpose}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(disbursement.date).toLocaleDateString()}
                      </div>
                    </div>
                    {disbursement.status === 'Completed' && (
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Linked Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {linkedProjectDetails.length > 0 ? linkedProjectDetails.map((project) => (
                  <div key={project.project_id} className="flex items-center justify-between p-4 border border-red-100 rounded-lg cursor-pointer hover:bg-red-50">
                    <div className="flex-1">
                      <div className="text-lg text-gray-900">{project.title}</div>
                      <div className="text-sm text-red-600">
                        {project.county} • {project.sector}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.progress}% Complete • {formatCurrency(project.budget)} Budget
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      View Project
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No linked projects found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="covenants">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Loan Covenants & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-gray-900">Loan Conditions</h4>
                  <div className="space-y-2">
                    {details?.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-gray-900">Compliance Status</h4>
                  <div className="space-y-3">
                    {details?.covenants.map((covenant, index) => (
                      <div key={index} className="p-3 border border-red-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-red-600">{covenant.type}</div>
                          <Badge className={getStatusColor(covenant.status)}>
                            {covenant.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-700">{covenant.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Loan Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Loan Agreement</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Original signed loan agreement</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Disbursement Schedule</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Detailed disbursement timeline</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Compliance Reports</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Quarterly compliance assessments</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Financial Statements</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Project financial tracking reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}