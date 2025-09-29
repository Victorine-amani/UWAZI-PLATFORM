import React, { useState } from 'react';
import { Flag, Shield, AlertTriangle, Camera, FileText, MapPin, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Project, getUserById, getContractorById } from '../data/mockData';

interface ReportIssueProps {
  project: Project;
  onBack: () => void;
}

export function ReportIssue({ project, onBack }: ReportIssueProps) {
  const [formData, setFormData] = useState({
    issueType: '',
    priority: '',
    description: '',
    location: '',
    witnessName: '',
    witnessContact: '',
    anonymous: false,
    evidence: false
  });

  const assignedOfficial = getUserById(project.assigned_official_id);
  const contractor = project.contractor_id ? getContractorById(project.contractor_id) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitting report:', formData);
    alert('Report submitted successfully! You will receive a confirmation number.');
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-red-100 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Flag className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl text-gray-900">Report Project Issue</h1>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h4 className="mb-2 text-gray-900">{project.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-gray-700">{project.county}, {project.ward}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-red-600" />
              <span className="text-gray-700">{assignedOfficial?.name || 'Unknown Official'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-red-200 text-red-700">{project.project_id}</Badge>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Details */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="text-gray-900">Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block text-red-600">Issue Type *</label>
                    <Select value={formData.issueType} onValueChange={(value) => setFormData({...formData, issueType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delay">Project Delay</SelectItem>
                        <SelectItem value="quality">Poor Quality Work</SelectItem>
                        <SelectItem value="budget">Budget Concerns</SelectItem>
                        <SelectItem value="safety">Safety Issues</SelectItem>
                        <SelectItem value="fraud">Suspected Fraud</SelectItem>
                        <SelectItem value="environmental">Environmental Impact</SelectItem>
                        <SelectItem value="corruption">Corruption Allegation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block text-red-600">Priority Level *</label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor concern</SelectItem>
                        <SelectItem value="medium">Medium - Significant issue</SelectItem>
                        <SelectItem value="high">High - Urgent attention needed</SelectItem>
                        <SelectItem value="critical">Critical - Safety/legal concern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block text-red-600">Specific Location (optional)</label>
                  <Input
                    placeholder="e.g., Building Block A, North Gate, Construction Site 2"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm mb-2 block text-red-600">Issue Description *</label>
                  <Textarea
                    placeholder="Describe the issue in detail. Include specific details, dates, times, and any other relevant information that would help authorities investigate."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Witness Information */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="text-gray-900">Witness Information (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Witness Name</label>
                    <Input
                      placeholder="Full name of witness"
                      value={formData.witnessName}
                      onChange={(e) => setFormData({...formData, witnessName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Witness Contact</label>
                    <Input
                      placeholder="Phone number or email"
                      value={formData.witnessContact}
                      onChange={(e) => setFormData({...formData, witnessContact: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="evidence"
                    checked={formData.evidence}
                    onCheckedChange={(checked) => setFormData({...formData, evidence: checked as boolean})}
                  />
                  <label htmlFor="evidence" className="text-sm">
                    I have photos, documents, or other evidence to support this report
                  </label>
                </div>

                {formData.evidence && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 mb-2">
                      Upload photos, documents, or other evidence
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      Supported formats: JPG, PNG, PDF, DOC (Max 10MB each)
                    </div>
                    <Button type="button" variant="outline">Choose Files</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Options */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData({...formData, anonymous: checked as boolean})}
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    Submit this report anonymously
                  </label>
                </div>

                <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded">
                  <strong>Important:</strong> Anonymous reports are still investigated, but you won't receive updates. 
                  For follow-up communication, provide your contact information.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Report Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Be Specific:</strong> Include dates, times, locations, and detailed descriptions.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Stay Safe:</strong> Only report what you've directly observed. Don't put yourself at risk.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Evidence Helps:</strong> Photos, documents, and witness information strengthen reports.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</div>
                  <span>Report is reviewed within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">2</div>
                  <span>Assigned to relevant authority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">3</div>
                  <span>Investigation begins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">4</div>
                  <span>You receive updates (if not anonymous)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>Emergency Issues:</strong>
                  <br />
                  Call: +254 700 UWAZI (89294)
                </div>
                <div>
                  <strong>Email Support:</strong>
                  <br />
                  reports@uwazi.go.ke
                </div>
                <div>
                  <strong>Office Hours:</strong>
                  <br />
                  Mon-Fri: 8:00 AM - 5:00 PM
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!formData.issueType || !formData.priority || !formData.description}
            className="bg-red-600 hover:bg-red-700"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}