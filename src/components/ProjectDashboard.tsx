import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Flag, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProjectDashboard({ projects, onProjectSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'Delayed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Planning': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.assignedOfficial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = countyFilter === 'all' || project.county === countyFilter;
    const matchesSector = sectorFilter === 'all' || project.sector === sectorFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesCounty && matchesSector && matchesStatus;
  });

  const counties = [...new Set(projects.map(p => p.county))];
  const sectors = [...new Set(projects.map(p => p.sector))];
  const statuses = [...new Set(projects.map(p => p.status))];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects, counties, or officials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={countyFilter} onValueChange={setCountyFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="County" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {counties.map(county => (
                  <SelectItem key={county} value={county}>{county}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onProjectSelect(project)}>
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getStatusColor(project.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(project.status)}
                    {project.status}
                  </div>
                </Badge>
              </div>
              {project.flagCount > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    {project.flagCount}
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {project.county}, {project.ward}
                </div>
                <Badge variant="outline">{project.sector}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Budget</div>
                  <div className="font-medium">{formatCurrency(project.budget)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Funding</div>
                  <div className="font-medium">{project.fundingType}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-600">Project Manager</div>
                <div className="text-sm font-medium">{project.assignedOfficial}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-600">Contractor</div>
                <div className="text-sm font-medium">{project.contractor}</div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-xs text-gray-500">
                  Updated {new Date(project.lastUpdate).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No projects found matching your criteria.</div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setCountyFilter('all');
              setSectorFilter('all');
              setStatusFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}