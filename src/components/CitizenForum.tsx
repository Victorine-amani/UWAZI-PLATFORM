import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Clock, CheckCircle, X, Plus, Users, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  proposedBy: string;
  votes: number;
  status: 'voting' | 'forwarded' | 'approved' | 'rejected';
  daysLeft: number;
  estimatedCost: number;
  officialResponse?: {
    date: string;
    response: string;
    alternative?: string;
  };
}

const mockProposals: Proposal[] = [
  {
    id: 'PROP-KSM-001',
    title: 'Community Health Center in Kondele',
    description: 'Build a new health center to serve Kondele and surrounding areas. The nearest facility is 15km away.',
    category: 'Health',
    location: 'Kisumu County, Kondele Ward',
    proposedBy: 'Mary Atieno',
    votes: 1247,
    status: 'forwarded',
    daysLeft: 0,
    estimatedCost: 25000000,
    officialResponse: {
      date: '2026-08-10',
      response: 'Proposal has been reviewed and approved for inclusion in the 2027 county budget. Site selection process will begin in September 2026.',
      alternative: undefined
    }
  },
  {
    id: 'PROP-NKR-002',
    title: 'Secondary School for Rongai',
    description: 'Many students travel over 20km to access secondary education. We need a local secondary school.',
    category: 'Education',
    location: 'Nakuru County, Rongai Ward',
    proposedBy: 'Peter Kimani',
    votes: 892,
    status: 'voting',
    daysLeft: 12,
    estimatedCost: 80000000
  },
  {
    id: 'PROP-NRB-003',
    title: 'Public Wi-Fi in Matatu Terminals',
    description: 'Install free public Wi-Fi in major matatu terminals to help commuters stay connected.',
    category: 'Technology',
    location: 'Nairobi County, Multiple Wards',
    proposedBy: 'Jane Wanjiku',
    votes: 634,
    status: 'voting',
    daysLeft: 8,
    estimatedCost: 5000000
  },
  {
    id: 'PROP-MSA-004',
    title: 'Drainage System for Old Town',
    description: 'Improve drainage in Old Town to prevent flooding during rainy seasons.',
    category: 'Infrastructure',
    location: 'Mombasa County, Old Town Ward',
    proposedBy: 'Ahmed Hussein',
    votes: 445,
    status: 'rejected',
    daysLeft: 0,
    estimatedCost: 45000000,
    officialResponse: {
      date: '2026-07-25',
      response: 'Current drainage project under UNESCO heritage site restrictions requires specialized approach.',
      alternative: 'Smaller-scale drainage improvements will be included in Q1 2027 heritage-compatible infrastructure upgrades.'
    }
  }
];

function formatCurrency(amount: number): string {
  return `KSh ${(amount / 1000000).toLocaleString()}M`;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'forwarded': return 'bg-blue-100 text-blue-800';
    case 'voting': return 'bg-yellow-100 text-yellow-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'forwarded':
      return <ArrowUp className="w-4 h-4 text-blue-600" />;
    case 'voting':
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'rejected':
      return <X className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
}

function NewProposalDialog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [county, setCounty] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit New Community Proposal</DialogTitle>
          <DialogDescription>
            Submit a new proposal for community consideration. Proposals with the most votes will be forwarded to officials for review.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 block">Proposal Title</label>
            <Input
              placeholder="Brief, descriptive title for your proposal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="water">Water & Sanitation</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">County</label>
              <Select value={county} onValueChange={setCounty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nairobi">Nairobi</SelectItem>
                  <SelectItem value="nakuru">Nakuru</SelectItem>
                  <SelectItem value="kisumu">Kisumu</SelectItem>
                  <SelectItem value="mombasa">Mombasa</SelectItem>
                  <SelectItem value="machakos">Machakos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm mb-2 block">Detailed Description</label>
            <Textarea
              placeholder="Explain the problem this proposal solves, why it's needed, and how it would benefit the community. Include specific details about location, scope, and impact."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
          </div>

          <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
            <strong>How it works:</strong> Community proposals with the most votes are forwarded to county officials. 
            Officials must respond within 14 days with either an acceptance plan or a rejection with alternative suggestions.
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Submit Proposal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProposalCard({ proposal }: { proposal: Proposal }) {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-2">{proposal.title}</CardTitle>
            <div className="text-sm text-gray-600 mt-1">{proposal.location}</div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {getStatusIcon(proposal.status)}
            <Badge className={getStatusColor(proposal.status)}>
              {proposal.status === 'voting' ? 'Open for Voting' : 
               proposal.status === 'forwarded' ? 'Forwarded to Officials' :
               proposal.status === 'approved' ? 'Approved' : 'Rejected'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-700 line-clamp-3">{proposal.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Category</div>
              <div>{proposal.category}</div>
            </div>
            <div>
              <div className="text-gray-600">Estimated Cost</div>
              <div>{formatCurrency(proposal.estimatedCost)}</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {proposal.votes} votes
              </span>
            </div>
            
            {proposal.status === 'voting' && (
              <div className="text-sm text-gray-600">
                {proposal.daysLeft} days left
              </div>
            )}
          </div>

          {proposal.status === 'voting' && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleVote}
                disabled={hasVoted}
                className={`flex-1 ${hasVoted ? 'bg-green-600' : ''}`}
                variant={hasVoted ? 'default' : 'outline'}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {hasVoted ? 'Voted' : 'Vote for This'}
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          )}

          {proposal.officialResponse && (
            <div className="border-t pt-4">
              <div className="text-sm mb-2">
                <strong>Official Response</strong> ({new Date(proposal.officialResponse.date).toLocaleDateString()}):
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {proposal.officialResponse.response}
              </div>
              {proposal.officialResponse.alternative && (
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <strong>Alternative Suggestion:</strong> {proposal.officialResponse.alternative}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CitizenForum() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProposals = mockProposals.filter(proposal => {
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || proposal.status === selectedStatus;
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || proposal.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const stats = {
    totalProposals: mockProposals.length,
    activeVoting: mockProposals.filter(p => p.status === 'voting').length,
    forwarded: mockProposals.filter(p => p.status === 'forwarded').length,
    approved: mockProposals.filter(p => p.status === 'approved').length,
    totalVotes: mockProposals.reduce((sum, p) => sum + p.votes, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="text-2xl">{stats.totalProposals}</div>
            <div className="text-sm text-gray-600">Total Proposals</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="text-2xl text-yellow-600">{stats.activeVoting}</div>
            <div className="text-sm text-gray-600">Open for Voting</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="text-2xl text-blue-600">{stats.forwarded}</div>
            <div className="text-sm text-gray-600">Forwarded</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="text-2xl text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-4">
            <div className="text-2xl">{stats.totalVotes.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Votes</div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl">Community Forum</h2>
          <p className="text-gray-600">Propose and vote on community priorities</p>
        </div>
        <NewProposalDialog />
      </div>

      {/* Filters */}
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm mb-2 block">Filter by Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="voting">Open for Voting</SelectItem>
                  <SelectItem value="forwarded">Forwarded</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedStatus('all');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#8B0000] bg-white">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">No proposals match your current filters.</div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedStatus('all');
                setSelectedCategory('all');
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