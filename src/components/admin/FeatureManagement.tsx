
import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const FeatureManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "AI Course Recommendations",
      description: "Personalized course suggestions using machine learning",
      category: "AI/ML",
      enabled: true,
      userType: "All Users",
      lastModified: "2024-01-15"
    },
    {
      id: 2,
      name: "Live Chat Support",
      description: "Real-time customer support chat widget",
      category: "Support",
      enabled: true,
      userType: "All Users",
      lastModified: "2024-01-14"
    },
    {
      id: 3,
      name: "Advanced Analytics",
      description: "Detailed learning analytics and progress tracking",
      category: "Analytics",
      enabled: false,
      userType: "Premium Users",
      lastModified: "2024-01-13"
    },
    {
      id: 4,
      name: "Mobile App Access",
      description: "Access courses through mobile applications",
      category: "Mobile",
      enabled: true,
      userType: "All Users",
      lastModified: "2024-01-12"
    },
    {
      id: 5,
      name: "Course Certification",
      description: "Generate certificates upon course completion",
      category: "Certification",
      enabled: true,
      userType: "Paid Users",
      lastModified: "2024-01-11"
    },
    {
      id: 6,
      name: "Social Learning",
      description: "Study groups and peer-to-peer learning features",
      category: "Social",
      enabled: false,
      userType: "All Users",
      lastModified: "2024-01-10"
    },
    {
      id: 7,
      name: "Offline Downloads",
      description: "Download courses for offline viewing",
      category: "Mobile",
      enabled: true,
      userType: "Premium Users",
      lastModified: "2024-01-09"
    },
    {
      id: 8,
      name: "Multi-language Support",
      description: "Platform available in multiple languages",
      category: "Localization",
      enabled: false,
      userType: "All Users",
      lastModified: "2024-01-08"
    },
    {
      id: 9,
      name: "Instructor Live Streaming",
      description: "Live streaming capabilities for instructors",
      category: "Streaming",
      enabled: true,
      userType: "Instructors",
      lastModified: "2024-01-07"
    },
    {
      id: 10,
      name: "Gamification System",
      description: "Points, badges, and leaderboards for engagement",
      category: "Gamification",
      enabled: true,
      userType: "All Users",
      lastModified: "2024-01-06"
    }
  ]);

  const filteredFeatures = features.filter(feature => 
    feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeatures = filteredFeatures.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFeature = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id 
        ? { ...feature, enabled: !feature.enabled, lastModified: new Date().toISOString().split('T')[0] }
        : feature
    ));
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis1" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis2" />);
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink 
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI/ML': 'bg-purple-100 text-purple-800',
      'Support': 'bg-blue-100 text-blue-800',
      'Analytics': 'bg-green-100 text-green-800',
      'Mobile': 'bg-orange-100 text-orange-800',
      'Certification': 'bg-yellow-100 text-yellow-800',
      'Social': 'bg-pink-100 text-pink-800',
      'Localization': 'bg-indigo-100 text-indigo-800',
      'Streaming': 'bg-red-100 text-red-800',
      'Gamification': 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Platform Features</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFeatures.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={feature.description}>
                      {feature.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(feature.category)}>
                      {feature.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{feature.userType}</TableCell>
                  <TableCell>
                    <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                      {feature.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{feature.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {features.filter(f => f.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Enabled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {features.filter(f => !f.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Disabled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {features.filter(f => f.userType === 'All Users').length}
            </div>
            <div className="text-sm text-gray-600">Public Features</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {features.length}
            </div>
            <div className="text-sm text-gray-600">Total Features</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureManagement;
