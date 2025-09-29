import React from 'react';
import { User, MapPin, Calendar, TrendingUp, TrendingDown, CheckCircle, Clock, AlertTriangle, Building2, FileText, Award, Mail, Phone, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Official {
  id: string;
  name: string;
  position: string;
  county: string;
  projects: string[];
  performance: {
    score: number;
    quarter: string;
    deliverables: number;
    completed: number;
    onTrack: number;
    delayed: number;
  };
}

interface OfficialDetailProps {
  official: Official;
  onBack: () => void;
}

// Mock detailed official data with comprehensive information
const mockOfficialDetails = {
  'OFF-001': {
    email: 'sarah.mwangi@health.go.ke',
    phone: '+254 700 123 456',
    alternatePhone: '+254 711 234 567',
    fax: '+254 20 2717077',
    office: 'Office 425, Afya House, Cathedral Road, Nairobi',
    postalAddress: 'P.O. Box 30016-00100, Nairobi, Kenya',
    startDate: '2024-03-15',
    education: [
      'MD (Doctor of Medicine) - University of Nairobi (2009)',
      'MPH (Master of Public Health) - Harvard School of Public Health (2015)',
      'Certificate in Healthcare Leadership - Kenya School of Government (2018)',
      'Advanced Diploma in Project Management - UNEP Institute (2020)',
      'Fellowship in Public Health Administration - London School of Hygiene (2017)'
    ],
    currentProjects: [
      { id: 'PROJECT-NKR-CTC-001', name: 'Nakuru Cancer Treatment Center', status: 'In Progress', progress: 65, budget: 2500000000, spent: 1625000000 }
    ],
    performanceHistory: [
      { quarter: 'Q3 2026', score: 78, completed: 3, delayed: 1, budget_variance: -5, stakeholder_rating: 4.2, projects_initiated: 2 },
      { quarter: 'Q2 2026', score: 82, completed: 4, delayed: 0, budget_variance: 2, stakeholder_rating: 4.5, projects_initiated: 3 }
    ],
    aboveAndBeyond: [
      'Organized free medical camps in remote villages during personal weekends',
      'Mentored 15 young health professionals through voluntary leadership program',
      'Donated personal time to establish mobile health units for pastoralist communities',
      'Initiated inter-county health knowledge sharing forums on personal initiative'
    ],
    keyAchievements: [
      'Reduced hospital construction delays by 30% through improved project management',
      'Implemented digital health records system in 15 counties',
      'Led successful completion of 12 health infrastructure projects',
      'Established public-private partnerships for medical equipment procurement'
    ],
    citizenFeedback: [
      { type: 'Positive', count: 45, percentage: 78 },
      { type: 'Neutral', count: 8, percentage: 14 },
      { type: 'Negative', count: 5, percentage: 8 }
    ],
    qualifications: [
      { type: 'Professional License', title: 'Medical Practice License', issuer: 'Kenya Medical Practitioners Board', year: '2009', status: 'Active', renewalDate: '2027-12-31' },
      { type: 'Certification', title: 'Project Management Professional (PMP)', issuer: 'Project Management Institute', year: '2020', status: 'Active', renewalDate: '2026-08-15' },
      { type: 'Fellowship', title: 'Public Health Leadership Fellowship', issuer: 'African Field Epidemiology Network', year: '2016', status: 'Completed', description: 'Advanced training in epidemic response and health system strengthening' },
      { type: 'Award', title: 'Outstanding Public Service Award', issuer: 'President of Kenya', year: '2024', status: 'Received', description: 'Recognition for exceptional leadership in health infrastructure development' }
    ],
    workHistory: [
      { position: 'Cabinet Secretary, Ministry of Health', organization: 'Government of Kenya', startDate: '2024-03-15', endDate: 'Present', description: 'Leading national health policy formulation and implementation, overseeing KES 45B health budget, managing 47 county health programs' },
      { position: 'Director, Health Infrastructure Development', organization: 'Ministry of Health', startDate: '2020-01-15', endDate: '2024-03-14', description: 'Oversaw construction and upgrade of 45+ health facilities nationwide, managed KES 12B infrastructure budget, established quality standards' },
      { position: 'Regional Health Coordinator', organization: 'East African Community Secretariat', startDate: '2017-06-01', endDate: '2019-12-31', description: 'Coordinated cross-border health initiatives across 6 EAC countries, developed regional epidemic response protocols' },
      { position: 'Senior Medical Officer & Administrator', organization: 'Kenyatta National Hospital', startDate: '2015-01-10', endDate: '2017-05-31', description: 'Clinical practice specializing in internal medicine, hospital administration oversight, patient care quality improvement' }
    ]
  },
  'OFF-002': {
    email: 'james.ochieng@education.go.ke',
    phone: '+254 722 456 789',
    alternatePhone: '+254 733 567 890',
    fax: '+254 20 2717088',
    office: 'Room 201, Education House, Jogoo Road, Nairobi',
    postalAddress: 'P.O. Box 30040-00100, Nairobi, Kenya',
    startDate: '2023-01-10',
    education: [
      'MEd (Master of Education) - Kenyatta University (2014)',
      'BA Education (Mathematics & Physics) - Moi University (2010)',
      'Diploma in Educational Leadership - Kenya Education Management Institute (2017)',
      'Certificate in Digital Learning Technologies - University of Cape Town (2021)',
      'Advanced Certificate in Public Administration - Kenya School of Government (2019)'
    ],
    currentProjects: [
      { id: 'PROJECT-NRB-SCH-002', name: 'Nairobi Digital Learning Center', status: 'In Progress', progress: 75, budget: 850000000, spent: 637500000 }
    ],
    performanceHistory: [
      { quarter: 'Q3 2026', score: 85, completed: 2, delayed: 0, budget_variance: 3, stakeholder_rating: 4.4, projects_initiated: 3 },
      { quarter: 'Q2 2026', score: 82, completed: 3, delayed: 1, budget_variance: -2, stakeholder_rating: 4.2, projects_initiated: 2 }
    ],
    aboveAndBeyond: [
      'Volunteers as mathematics tutor at local children\'s home every Saturday',
      'Established scholarship fund for underprivileged students from personal resources',
      'Developed free educational mobile app for rural students during off-hours',
      'Coaches national mathematics olympiad team on voluntary basis'
    ],
    keyAchievements: [
      'Increased school completion rates by 25% in assigned counties',
      'Successfully built 8 new primary schools in underserved areas',
      'Launched digital learning program reaching 50 schools',
      'Reduced education infrastructure costs by 15% through improved procurement'
    ],
    citizenFeedback: [
      { type: 'Positive', count: 38, percentage: 82 },
      { type: 'Neutral', count: 6, percentage: 13 },
      { type: 'Negative', count: 2, percentage: 5 }
    ],
    qualifications: [
      { type: 'Professional License', title: 'Teaching Service Commission Registration', issuer: 'Teachers Service Commission', year: '2010', status: 'Active', renewalDate: '2027-06-30' },
      { type: 'Certification', title: 'Educational Leadership Certificate', issuer: 'Harvard Graduate School of Education', year: '2018', status: 'Active', description: 'Advanced training in educational administration and policy development' },
      { type: 'Award', title: 'Excellence in Education Innovation', issuer: 'Kenya Institute of Education', year: '2022', status: 'Received', description: 'Recognition for digital learning program implementation' },
      { type: 'Fellowship', title: 'UNESCO Education Policy Fellowship', issuer: 'UNESCO', year: '2020', status: 'Completed', description: 'Policy development and curriculum design training' }
    ],
    workHistory: [
      { position: 'County Education Director', organization: 'Kisumu County Government', startDate: '2023-01-10', endDate: 'Present', description: 'Overseeing educational policy implementation and infrastructure development across 285 schools, managing KES 2.8B education budget' },
      { position: 'Principal Education Officer', organization: 'Ministry of Education', startDate: '2019-03-01', endDate: '2022-12-31', description: 'Managed curriculum development and teacher training programs for secondary schools across 8 counties' },
      { position: 'Senior Education Officer', organization: 'Siaya County Education Office', startDate: '2015-07-15', endDate: '2019-02-28', description: 'Supervised school construction projects and educational quality assurance for 156 schools' },
      { position: 'Mathematics & Physics Teacher', organization: 'Maseno School', startDate: '2010-09-01', endDate: '2015-07-14', description: 'Taught advanced mathematics and physics, mentored students in national competitions, 95% pass rate' }
    ]
  },
  'OFF-003': {
    email: 'mary.kamau@infrastructure.go.ke',
    phone: '+254 733 567 890',
    alternatePhone: '+254 744 678 901',
    fax: '+254 20 2717099',
    office: 'Building A, Infrastructure House, Haile Selassie Avenue, Nairobi',
    postalAddress: 'P.O. Box 30050-00100, Nairobi, Kenya',
    startDate: '2022-06-01',
    education: [
      'MSc Civil Engineering (Structural) - University of Nairobi (2008)',
      'BSc Civil Engineering - Jomo Kenyatta University of Agriculture and Technology (2005)',
      'Project Management Professional (PMP) Certification - PMI (2015)',
      'Advanced Diploma in Sustainable Construction - Technical University of Kenya (2018)',
      'Certificate in Public Works Management - Institute of Engineers Kenya (2020)'
    ],
    currentProjects: [
      { id: 'PROJECT-RD-001', name: 'Rural Access Roads Phase 3', status: 'In Progress', progress: 55, budget: 4500000000, spent: 2475000000 }
    ],
    performanceHistory: [
      { quarter: 'Q3 2026', score: 92, completed: 4, delayed: 0, budget_variance: 8, stakeholder_rating: 4.7, projects_initiated: 2 },
      { quarter: 'Q2 2026', score: 89, completed: 3, delayed: 1, budget_variance: 4, stakeholder_rating: 4.5, projects_initiated: 3 }
    ],
    aboveAndBeyond: [
      'Personally funds construction of footbridges in flood-prone areas',
      'Trains young engineers in sustainable construction techniques during weekends',
      'Leads community clean-up initiatives for road maintenance awareness',
      'Advocates for climate-resilient infrastructure at international conferences'
    ],
    keyAchievements: [
      'Completed 150km of rural road construction ahead of schedule',
      'Implemented sustainable bridge construction standards',
      'Reduced infrastructure project costs by 20% through innovative methods',
      'Pioneered use of local materials in road construction'
    ],
    citizenFeedback: [
      { type: 'Positive', count: 52, percentage: 85 },
      { type: 'Neutral', count: 7, percentage: 11 },
      { type: 'Negative', count: 2, percentage: 4 }
    ],
    qualifications: [
      { type: 'Professional License', title: 'Practicing Engineer License', issuer: 'Engineers Board of Kenya', year: '2005', status: 'Active', renewalDate: '2027-03-31' },
      { type: 'Certification', title: 'LEED Accredited Professional', issuer: 'US Green Building Council', year: '2019', status: 'Active', description: 'Certified in sustainable construction practices and green building design' },
      { type: 'Fellowship', title: 'Institution of Engineers Kenya Fellow', issuer: 'Institution of Engineers Kenya', year: '2021', status: 'Active', description: 'Recognition for outstanding contribution to engineering profession' },
      { type: 'Award', title: 'Outstanding Woman Engineer Award', issuer: 'Kenya Association of Women Engineers', year: '2023', status: 'Received', description: 'Excellence in infrastructure development and mentorship' }
    ],
    workHistory: [
      { position: 'Chief Infrastructure Officer', organization: 'Ministry of Infrastructure', startDate: '2022-06-01', endDate: 'Present', description: 'Leading national infrastructure policy development, overseeing KES 25B annual budget, managing 150+ major projects' },
      { position: 'Chief Engineer', organization: 'Kenya Rural Roads Authority', startDate: '2018-04-15', endDate: '2022-05-31', description: 'Managed rural road construction program covering 15 counties and 350+ projects worth KES 8B' },
      { position: 'Senior Civil Engineer', organization: 'Kenya National Highways Authority', startDate: '2012-08-01', endDate: '2018-04-14', description: 'Supervised highway construction and maintenance including A104 Nairobi-Nakuru Highway upgrade' },
      { position: 'Project Engineer', organization: 'Techno Brain Limited', startDate: '2005-11-01', endDate: '2012-07-31', description: 'Designed and supervised construction of bridges, water systems, and commercial buildings' }
    ]
  }
};

export function OfficialDetail({ official, onBack }: OfficialDetailProps) {
  const details = mockOfficialDetails[official.id as keyof typeof mockOfficialDetails];
  const totalFeedback = details?.citizenFeedback.reduce((sum, feedback) => sum + feedback.count, 0) || 0;

  return (
    <div className="space-y-4">
      {/* Official Header - Enhanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h3 className="text-2xl text-gray-900 font-semibold">{official.name}</h3>
              <p className="text-[#8B0000] font-medium text-lg">{official.position}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <span className="text-gray-600 font-medium">Jurisdiction:</span>
                <span className="text-gray-900">{official.county}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <span className="text-gray-600 font-medium">Active Projects:</span>
                <span className="text-gray-900">{details?.currentProjects?.length || 0} projects</span>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-[#8B0000]" />
                <h4 className="font-medium text-[#8B0000]">Contact Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600 font-medium">Primary Phone:</span>
                  <div className="text-gray-900">{details?.phone}</div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-600 font-medium">Office Location:</span>
                  <div className="text-gray-900">{details?.office}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview - Right Column */}
        <div className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-4xl text-green-600 font-bold mb-2">{official.performance.score}%</div>
                <div className="text-sm text-gray-600 font-medium">Overall Performance</div>
                <div className="text-xs text-gray-500 mt-1">{official.performance.quarter}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-xl text-green-600 font-bold">{official.performance.completed}</div>
                  <div className="text-green-700 font-medium">Completed</div>
                </div>
                <div className="text-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-xl text-blue-600 font-bold">{official.performance.onTrack}</div>
                  <div className="text-blue-700 font-medium">On Track</div>
                </div>
                <div className="text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="text-xl text-red-600 font-bold">{official.performance.delayed}</div>
                  <div className="text-red-700 font-medium">Delayed</div>
                </div>
                <div className="text-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xl text-gray-900 font-bold">{official.performance.deliverables}</div>
                  <div className="text-gray-700 font-medium">Total</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span>Citizen Satisfaction</span>
                  <span className="text-[#8B0000]">{details?.citizenFeedback[0]?.percentage}%</span>
                </div>
                <Progress value={details?.citizenFeedback[0]?.percentage || 0} className="h-3" />
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Based on {totalFeedback} citizen reports
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="projects" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white">Projects</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white">Performance</TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white">Achievements</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white">Citizen Feedback</TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Assigned Projects</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {details?.currentProjects?.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      <Badge className={
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{project.id}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-blue-700 font-medium">Total Budget</div>
                        <div className="text-sm text-blue-900 font-bold">KES {(project.budget / 1000000).toFixed(0)}M</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-green-700 font-medium">Amount Spent</div>
                        <div className="text-sm text-green-900 font-bold">KES {(project.spent / 1000000).toFixed(0)}M</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-700 font-medium">Remaining</div>
                        <div className="text-sm text-gray-900 font-bold">KES {((project.budget - project.spent) / 1000000).toFixed(0)}M</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                          <span>Progress</span>
                          <span className="text-[#8B0000]">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Performance History</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {details?.performanceHistory?.map((period, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{period.quarter}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-green-600 font-bold">{period.score}%</span>
                        {index > 0 && details.performanceHistory && (
                          <div className="flex items-center gap-1">
                            {period.score > details.performanceHistory[index - 1].score ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center bg-green-50 p-3 rounded-lg">
                        <div className="text-lg text-green-600 font-bold">{period.completed}</div>
                        <div className="text-green-700 font-medium">Completed</div>
                      </div>
                      <div className="text-center bg-red-50 p-3 rounded-lg">
                        <div className="text-lg text-red-600 font-bold">{period.delayed}</div>
                        <div className="text-red-700 font-medium">Delayed</div>
                      </div>
                      <div className="text-center bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg text-blue-600 font-bold">{period.stakeholder_rating}/5</div>
                        <div className="text-blue-700 font-medium">Stakeholder Rating</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <div className={`text-lg font-bold ${period.budget_variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {period.budget_variance >= 0 ? '+' : ''}{period.budget_variance}%
                        </div>
                        <div className="text-gray-700 font-medium">Budget Variance</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Above and Beyond Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#8B0000]" />
                  <h3 className="font-semibold text-[#8B0000]">Above and Beyond</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Exceptional contributions outside regular duties that demonstrate commitment to public service</p>
                <div className="space-y-3">
                  {details?.aboveAndBeyond?.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-red-50">
                      <Heart className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-800">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Key Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {details?.keyAchievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-yellow-50">
                    <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-800">{achievement}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Citizen Feedback</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {details?.citizenFeedback?.map((feedback, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        feedback.type === 'Positive' 
                          ? 'bg-green-500' 
                          : feedback.type === 'Neutral'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{feedback.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{feedback.count} reports</span>
                      <span className="text-xl font-bold text-[#8B0000]">{feedback.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-[#8B0000] font-semibold">Professional Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-4 h-4 text-[#8B0000]" />
                    <h4 className="font-semibold text-[#8B0000]">Education</h4>
                  </div>
                  <div className="space-y-2">
                    {details?.education?.map((edu, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Contact Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4 text-[#8B0000]" />
                    <h4 className="font-semibold text-[#8B0000]">Complete Contact Information</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <span className="text-gray-600 font-medium">Official Email:</span>
                      <div className="text-gray-900 font-medium">{details?.email}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <span className="text-gray-600 font-medium">Primary Phone:</span>
                      <div className="text-gray-900 font-medium">{details?.phone}</div>
                    </div>
                    {details?.alternatePhone && (
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-gray-600 font-medium">Alternate Phone:</span>
                        <div className="text-gray-900 font-medium">{details.alternatePhone}</div>
                      </div>
                    )}
                    {details?.fax && (
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-gray-600 font-medium">Fax Number:</span>
                        <div className="text-gray-900 font-medium">{details.fax}</div>
                      </div>
                    )}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 md:col-span-2">
                      <span className="text-gray-600 font-medium">Office Address:</span>
                      <div className="text-gray-900 font-medium">{details?.office}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 md:col-span-2">
                      <span className="text-gray-600 font-medium">Postal Address:</span>
                      <div className="text-gray-900 font-medium">{details?.postalAddress}</div>
                    </div>
                  </div>
                </div>

                {/* Career Timeline */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-[#8B0000]" />
                    <h4 className="font-semibold text-[#8B0000]">Career Timeline</h4>
                  </div>
                  <div className="text-sm">
                    <div className="border-l-2 border-blue-200 pl-4 ml-2 space-y-6">
                      {details?.workHistory?.map((job, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full -ml-6 ${index === 0 ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                            <span className="font-medium text-gray-900">{job.position}</span>
                          </div>
                          <div className="text-[#8B0000] font-medium text-sm mb-1">{job.organization}</div>
                          <div className="text-gray-600 text-xs mb-2">
                            {new Date(job.startDate).toLocaleDateString()} - {job.endDate === 'Present' ? 'Present' : new Date(job.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-gray-600 text-sm leading-relaxed mb-4">{job.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Professional Qualifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-[#8B0000]" />
                    <h4 className="font-semibold text-[#8B0000]">Professional Qualifications & Certifications</h4>
                  </div>
                  <div className="space-y-3">
                    {details?.qualifications?.map((qual, index) => (
                      <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{qual.title}</span>
                          <Badge className={`text-xs ${
                            qual.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 
                            qual.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {qual.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{qual.type}</span> • {qual.issuer} • {qual.year}
                        </div>
                        {qual.renewalDate && (
                          <div className="text-xs text-gray-500">Renewal Date: {qual.renewalDate}</div>
                        )}
                        {qual.description && (
                          <div className="text-xs text-gray-600 mt-2 italic">{qual.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}