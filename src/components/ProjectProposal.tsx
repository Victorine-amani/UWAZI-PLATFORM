import React, { useState } from 'react';
import { Send, Upload, Plus, Minus, Calculator, TrendingUp, Users, DollarSign, Building, Target, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { formatCurrency } from '../data/mockData';

interface ImpactCategory {
  type: 'jobs' | 'revenue' | 'infrastructure';
  value: string;
  description: string;
}

interface ProjectMilestone {
  id: string;
  title: string;
  timeline: string;
  budget: string;
}

interface BusinessProjection {
  year: number;
  expectedRevenue: string;
  jobsCreated: string;
  infrastructureValue: string;
  socialImpact: string;
}

export function ProjectProposal() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: '',
    county: '',
    ward: '',
    constituency: '',
    totalBudget: '',
    requestedAmount: '',
    duration: '',
    startDate: '',
    endDate: '',
    objectives: [''],
    expectedBenefits: [''],
    ministry: '',
    department: '',
    projectManager: '',
    contactEmail: '',
    contactPhone: '',
    priority: ''
  });

  const [impactCategories, setImpactCategories] = useState<ImpactCategory[]>([
    { type: 'jobs', value: '', description: '' },
    { type: 'revenue', value: '', description: '' },
    { type: 'infrastructure', value: '', description: '' }
  ]);

  const [milestones, setMilestones] = useState<ProjectMilestone[]>([
    { id: '1', title: '', timeline: '', budget: '' }
  ]);

  const [businessProjections, setBusinessProjections] = useState<BusinessProjection[]>([
    { year: 1, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
    { year: 3, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
    { year: 5, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
    { year: 10, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sectors = [
    'Health', 'Education', 'Infrastructure', 'Water & Sanitation', 
    'Agriculture', 'Energy', 'Transport', 'Housing', 'ICT', 'Environment'
  ];

  const counties = [
    'Nairobi', 'Nakuru', 'Kisumu', 'Mombasa', 'Eldoret', 'Thika', 
    'Machakos', 'Meru', 'Nyeri', 'Kericho'
  ];

  const ministries = [
    'Ministry of Health', 'Ministry of Education', 'Ministry of Transport',
    'Ministry of Water & Sanitation', 'Ministry of Agriculture', 'Ministry of Energy',
    'Ministry of ICT', 'Ministry of Environment', 'Ministry of Interior'
  ];

  const priorities = [
    { value: 'critical', label: 'Critical - Immediate Action Required' },
    { value: 'high', label: 'High Priority - Within 6 Months' },
    { value: 'medium', label: 'Medium Priority - Within 1 Year' },
    { value: 'low', label: 'Low Priority - 1-2 Years' }
  ];

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      expectedBenefits: [...prev.expectedBenefits, '']
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expectedBenefits: prev.expectedBenefits.filter((_, i) => i !== index)
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      expectedBenefits: prev.expectedBenefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const addMilestone = () => {
    setMilestones(prev => [
      ...prev,
      { id: Date.now().toString(), title: '', timeline: '', budget: '' }
    ]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof ProjectMilestone, value: string) => {
    setMilestones(prev => prev.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const updateImpactCategory = (index: number, field: keyof ImpactCategory, value: string) => {
    setImpactCategories(prev => prev.map((cat, i) => 
      i === index ? { ...cat, [field]: value } : cat
    ));
  };

  const updateBusinessProjection = (year: number, field: keyof BusinessProjection, value: string) => {
    setBusinessProjections(prev => prev.map(p => 
      p.year === year ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success message
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form data
      setFormData({
        title: '', description: '', sector: '', county: '', ward: '', constituency: '',
        totalBudget: '', requestedAmount: '', duration: '', startDate: '', endDate: '',
        objectives: [''], expectedBenefits: [''], ministry: '', department: '',
        projectManager: '', contactEmail: '', contactPhone: '', priority: ''
      });
      setImpactCategories([
        { type: 'jobs', value: '', description: '' },
        { type: 'revenue', value: '', description: '' },
        { type: 'infrastructure', value: '', description: '' }
      ]);
      setMilestones([{ id: '1', title: '', timeline: '', budget: '' }]);
      setBusinessProjections([
        { year: 1, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
        { year: 3, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
        { year: 5, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' },
        { year: 10, expectedRevenue: '', jobsCreated: '', infrastructureValue: '', socialImpact: '' }
      ]);
    }, 3000);
  };

  const getImpactIcon = (type: string) => {
    switch (type) {
      case 'jobs': return Users;
      case 'revenue': return DollarSign;
      case 'infrastructure': return Building;
      default: return Target;
    }
  };

  const getImpactLabel = (type: string) => {
    switch (type) {
      case 'jobs': return 'Job Creation';
      case 'revenue': return 'Revenue Generation';
      case 'infrastructure': return 'Infrastructure Development';
      default: return 'Impact';
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border border-green-200 bg-green-50 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Project Proposal Submitted Successfully!
            </h2>
            <p className="text-green-700 mb-6">
              Your project proposal has been submitted for review. You will receive a confirmation email shortly with your submission reference number.
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
              <div className="text-sm text-green-600 font-medium mb-2">Submission Details:</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Reference:</strong> PROP-{Date.now().toString().slice(-6)}</div>
                <div><strong>Submitted:</strong> {new Date().toLocaleString()}</div>
                <div><strong>Status:</strong> Under Review</div>
                <div><strong>Expected Review Time:</strong> 5-7 business days</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              Proposal Under Review
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <CardTitle className="text-[#8B0000] font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Project Proposal Submission
          </CardTitle>
          <p className="text-sm text-gray-600">
            Submit new project proposals for government funding and implementation
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold">Basic Project Information</CardTitle>
            <p className="text-sm text-gray-600">Provide essential details about your project proposal</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector *</Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                  <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of the project"
                required
                rows={4}
                className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="county">County *</Label>
                <Select value={formData.county} onValueChange={(value) => setFormData(prev => ({ ...prev, county: value }))}>
                  <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map(county => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <Input
                  id="constituency"
                  value={formData.constituency}
                  onChange={(e) => setFormData(prev => ({ ...prev, constituency: e.target.value }))}
                  placeholder="Enter constituency"
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Ward</Label>
                <Input
                  id="ward"
                  value={formData.ward}
                  onChange={(e) => setFormData(prev => ({ ...prev, ward: e.target.value }))}
                  placeholder="Enter ward"
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget & Timeline */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Budget & Timeline
            </CardTitle>
            <p className="text-sm text-gray-600">Financial requirements and project timeline</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalBudget">Total Project Budget (KES) *</Label>
                <Input
                  id="totalBudget"
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalBudget: e.target.value }))}
                  placeholder="0"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestedAmount">Requested Government Funding (KES) *</Label>
                <Input
                  id="requestedAmount"
                  type="number"
                  value={formData.requestedAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestedAmount: e.target.value }))}
                  placeholder="0"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Project Duration (months) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="12"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Proposed Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Expected End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Project Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Project Objectives */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Project Objectives
            </CardTitle>
            <p className="text-sm text-gray-600">Define clear, measurable objectives for your project</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <Input
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder={`Objective ${index + 1}`}
                    required={index === 0}
                    className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeObjective(index)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addObjective}
              className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Objective
            </Button>
          </CardContent>
        </Card>

        {/* Expected Benefits */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold">Expected Benefits</CardTitle>
            <p className="text-sm text-gray-600">Describe the anticipated benefits and outcomes</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.expectedBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder={`Expected benefit ${index + 1}`}
                    required={index === 0}
                    className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addBenefit}
              className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </CardContent>
        </Card>

        {/* Impact Categories */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Impact Categories
            </CardTitle>
            <p className="text-sm text-gray-600">Quantify the expected impact on jobs, revenue, and infrastructure</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {impactCategories.map((category, index) => {
              const Icon = getImpactIcon(category.type);
              return (
                <div key={category.type} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-[#8B0000]" />
                    <h4 className="font-medium text-gray-900">{getImpactLabel(category.type)}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantitative Impact</Label>
                      <Input
                        value={category.value}
                        onChange={(e) => updateImpactCategory(index, 'value', e.target.value)}
                        placeholder={category.type === 'jobs' ? 'Number of jobs created' : 
                                   category.type === 'revenue' ? 'Revenue amount (KES)' : 
                                   'Infrastructure value (KES)'}
                        className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={category.description}
                        onChange={(e) => updateImpactCategory(index, 'description', e.target.value)}
                        placeholder="Describe the impact"
                        className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 10-Year Business Benefit Projection */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              10-Year Business Benefit Projection
            </CardTitle>
            <p className="text-sm text-gray-600">Project long-term benefits and returns on investment</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-900">Year</th>
                    <th className="text-left p-3 font-medium text-gray-900">Expected Revenue (KES)</th>
                    <th className="text-left p-3 font-medium text-gray-900">Jobs Created</th>
                    <th className="text-left p-3 font-medium text-gray-900">Infrastructure Value (KES)</th>
                    <th className="text-left p-3 font-medium text-gray-900">Social Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {businessProjections.map((projection) => (
                    <tr key={projection.year} className="border-b border-gray-100">
                      <td className="p-3">
                        <Badge variant="outline" className="border-[#8B0000] text-[#8B0000]">
                          Year {projection.year}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          value={projection.expectedRevenue}
                          onChange={(e) => updateBusinessProjection(projection.year, 'expectedRevenue', e.target.value)}
                          placeholder="0"
                          className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          value={projection.jobsCreated}
                          onChange={(e) => updateBusinessProjection(projection.year, 'jobsCreated', e.target.value)}
                          placeholder="0"
                          className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          value={projection.infrastructureValue}
                          onChange={(e) => updateBusinessProjection(projection.year, 'infrastructureValue', e.target.value)}
                          placeholder="0"
                          className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={projection.socialImpact}
                          onChange={(e) => updateBusinessProjection(projection.year, 'socialImpact', e.target.value)}
                          placeholder="Describe social impact"
                          className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Project Milestones */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold">Project Milestones</CardTitle>
            <p className="text-sm text-gray-600">Define key milestones and their timelines</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="space-y-2">
                  <Label>Milestone Title</Label>
                  <Input
                    value={milestone.title}
                    onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                    placeholder={`Milestone ${index + 1}`}
                    required={index === 0}
                    className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timeline (months)</Label>
                  <Input
                    value={milestone.timeline}
                    onChange={(e) => updateMilestone(milestone.id, 'timeline', e.target.value)}
                    placeholder="e.g., Month 6"
                    className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label>Budget Allocation (KES)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={milestone.budget}
                      onChange={(e) => updateMilestone(milestone.id, 'budget', e.target.value)}
                      placeholder="0"
                      className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMilestone(milestone.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50 px-3"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMilestone}
              className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </CardContent>
        </Card>

        {/* Ministry & Contact Information */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-[#8B0000] font-semibold">Ministry & Contact Information</CardTitle>
            <p className="text-sm text-gray-600">Provide ministry details and project contact information</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ministry">Ministry *</Label>
                <Select value={formData.ministry} onValueChange={(value) => setFormData(prev => ({ ...prev, ministry: value }))}>
                  <SelectTrigger className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]">
                    <SelectValue placeholder="Select ministry" />
                  </SelectTrigger>
                  <SelectContent>
                    {ministries.map(ministry => (
                      <SelectItem key={ministry} value={ministry}>{ministry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department/Unit</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Enter department or unit"
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectManager">Project Manager *</Label>
                <Input
                  id="projectManager"
                  value={formData.projectManager}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectManager: e.target.value }))}
                  placeholder="Full name"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="email@ministry.go.ke"
                  required
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+254 700 000 000"
                  className="border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please review all information carefully before submitting. Once submitted, this proposal will be reviewed by the relevant ministry and evaluation committee.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description || !formData.totalBudget}
                className="bg-[#8B0000] hover:bg-[#6B0000] text-white min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}