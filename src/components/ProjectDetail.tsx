import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, DollarSign, User, Building, Flag, FileText, Eye, Download, AlertTriangle, CheckCircle, Clock, Upload, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Project, 
  getMilestonesByProjectId, 
  getTransactionsByProjectId, 
  getFlagsByProjectId, 
  getAuditsByProjectId,
  getContractorById,
  getUserById,
  formatCurrency,
  getStatusColor 
} from '../data/mockData';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onReportIssue?: (project: Project) => void;
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-red-600" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-gray-400" />;
    case 'delayed':
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
}

export function ProjectDetail({ project, onBack, onReportIssue }: ProjectDetailProps) {
  const milestones = getMilestonesByProjectId(project.project_id);
  const transactions = getTransactionsByProjectId(project.project_id);
  const flags = getFlagsByProjectId(project.project_id);
  const audits = getAuditsByProjectId(project.project_id);
  const contractor = project.contractor_id ? getContractorById(project.contractor_id) : null;
  const assignedOfficial = getUserById(project.assigned_official_id);

  return (
    <div className="space-y-6">
      {/* Action buttons - moved to top right */}
      <div className="flex justify-end gap-2">
        {onReportIssue && (
          <Button variant="outline" onClick={() => onReportIssue(project)} className="gap-2 border-red-200 text-red-700 hover:bg-red-50">
            <Flag className="w-4 h-4" />
            Report Issue
          </Button>
        )}
        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
          <Eye className="w-4 h-4 mr-2" />
          Follow
        </Button>
      </div>

      {/* Project Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative mb-6">
            <ImageWithFallback
              src={project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBkZXZlbG9wbWVudHxlbnwxfHx8fHwxNzU2NjE5OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080'}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
          </div>

          <h1 className="text-2xl text-gray-900 mb-4">{project.title}</h1>
          <p className="text-gray-700 mb-6">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-red-600">
              <MapPin className="w-4 h-4 mr-2" />
              {project.county}, {project.ward}
            </div>
            <div className="flex items-center text-sm text-red-600">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(project.start_date).toLocaleDateString()} - {new Date(project.planned_end).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-red-600">
              <User className="w-4 h-4 mr-2" />
              {assignedOfficial?.name || 'Unknown Official'}
            </div>
            <div className="flex items-center text-sm text-red-600">
              <Building className="w-4 h-4 mr-2" />
              {contractor?.name || 'No Contractor Assigned'}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-700">
                  <span>Progress</span>
                  <span className="text-red-700">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-red-600">Total Budget</div>
                  <div className="text-lg text-gray-900">{formatCurrency(project.budget)}</div>
                </div>
                <div>
                  <div className="text-red-600">Spent</div>
                  <div className="text-lg text-gray-900">{formatCurrency(project.spent)}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="text-red-600">Funding Type</div>
                <div className="flex items-center gap-2 text-gray-900">
                  {project.funding_type}
                  {project.loan_id && (
                    <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                      {project.loan_id}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-sm">
                <div className="text-red-600">Last Updated</div>
                <div className="text-gray-900">{new Date(project.updated_at).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="milestones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="flags">Citizen Reports</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.length > 0 ? milestones.map((milestone) => (
                  <div key={milestone.milestone_id} className="flex items-start gap-4 p-4 border border-red-100 rounded-lg">
                    <div className="flex-shrink-0">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">
                          {milestone.title}
                        </h4>
                        <div className="text-sm text-red-600">
                          {new Date(milestone.planned_end).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-red-600" />
                          {milestone.evidence_refs.length > 0 ? (
                            <span className="text-green-600">Evidence Uploaded</span>
                          ) : (
                            <span className="text-gray-500">No Evidence</span>
                          )}
                        </div>
                        {milestone.evidence_refs.length > 0 && (
                          <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                            <Eye className="w-4 h-4 mr-1" />
                            View Evidence
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No milestones available for this project.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Financial Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length > 0 ? transactions.map((transaction) => (
                  <div key={transaction.tx_id} className="flex items-center justify-between p-4 border border-red-100 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg text-gray-900">{formatCurrency(transaction.amount)}</div>
                        <Badge className={getStatusColor(transaction.approval_status)}>
                          {transaction.approval_status}
                        </Badge>
                      </div>
                      <div className="text-sm text-red-600">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        To: {transaction.recipient} | Invoice: {transaction.invoice_ref}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No transactions available for this project.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Audit Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audits.length > 0 ? audits.map((audit) => (
                  <div key={audit.audit_id} className="p-4 border border-red-100 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-gray-900">{audit.quarter} Audit</h4>
                        <div className="text-sm text-red-600">
                          {new Date(audit.audit_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {audit.findings.filter(f => f.severity === 'high' || f.severity === 'critical').length > 0 && (
                          <Badge variant="destructive" className="flex items-center gap-1 bg-red-600 text-white">
                            <AlertTriangle className="w-3 h-3" />
                            {audit.findings.filter(f => f.severity === 'high' || f.severity === 'critical').length} Issues
                          </Badge>
                        )}
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {audit.findings.map((finding, index) => (
                        <div key={finding.id} className="text-sm text-gray-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {finding.description}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                        <Download className="w-4 h-4 mr-2" />
                        Download Full Report
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No audit reports available for this project.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flags">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Citizen Reports & Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flags.length > 0 ? flags.map((flag) => (
                  <div key={flag.flag_id} className="p-4 border border-red-100 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize border-red-200 text-red-700">
                          {flag.category}
                        </Badge>
                        <span className="text-sm text-red-600">
                          {new Date(flag.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge className={getStatusColor(flag.status)}>
                        {flag.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-700">{flag.description}</div>
                    </div>

                    {flag.status === 'resolved' && (
                      <div className="bg-red-50 p-3 rounded border border-red-100">
                        <div className="text-sm mb-2 text-red-800">
                          <strong>Official Response</strong> ({flag.resolved_at && new Date(flag.resolved_at).toLocaleDateString()}):
                        </div>
                        <div className="text-sm text-gray-700">Issue has been addressed and resolved.</div>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No citizen reports available for this project.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Project Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Tender Documents</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Original tender specifications and requirements</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Contract Agreement</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Signed contract with {contractor?.name || 'contractor'}</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Environmental Impact Assessment</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Environmental compliance report</div>
                </div>

                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">Technical Drawings</h4>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-red-600">Architectural and engineering plans</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}