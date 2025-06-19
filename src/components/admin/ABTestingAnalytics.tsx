
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Play, Pause, Settings, Plus, Eye, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const ABTestingAnalytics = () => {
  const [selectedTest, setSelectedTest] = useState('all');

  const activeTests = [
    {
      id: 1,
      name: 'Course Landing Page - CTA Colors',
      status: 'running',
      startDate: '2024-01-15',
      traffic: 2500,
      variants: [
        { name: 'Control (Blue CTA)', visitors: 1250, conversions: 87, conversionRate: 6.96 },
        { name: 'Variant A (Green CTA)', visitors: 1250, conversions: 112, conversionRate: 8.96 }
      ],
      winner: 'Variant A',
      confidence: 95.2,
      improvement: 28.7
    },
    {
      id: 2,
      name: 'Pricing Page - Monthly vs Annual Focus',
      status: 'running',
      startDate: '2024-01-20',
      traffic: 1800,
      variants: [
        { name: 'Control (Monthly First)', visitors: 900, conversions: 54, conversionRate: 6.0 },
        { name: 'Variant A (Annual First)', visitors: 900, conversions: 72, conversionRate: 8.0 }
      ],
      winner: 'Variant A',
      confidence: 89.3,
      improvement: 33.3
    },
    {
      id: 3,
      name: 'Course Preview - Video vs Text',
      status: 'draft',
      startDate: '2024-02-01',
      traffic: 0,
      variants: [
        { name: 'Control (Text Preview)', visitors: 0, conversions: 0, conversionRate: 0 },
        { name: 'Variant A (Video Preview)', visitors: 0, conversions: 0, conversionRate: 0 }
      ],
      winner: null,
      confidence: 0,
      improvement: 0
    }
  ];

  const performanceData = [
    { day: 'Day 1', control: 5.2, variant: 6.1 },
    { day: 'Day 2', control: 5.8, variant: 7.3 },
    { day: 'Day 3', control: 6.1, variant: 8.2 },
    { day: 'Day 4', control: 6.9, variant: 8.8 },
    { day: 'Day 5', control: 7.0, variant: 9.1 },
    { day: 'Day 6', control: 6.8, variant: 8.9 },
    { day: 'Day 7', control: 7.1, variant: 9.0 }
  ];

  const handleStartTest = (testId: number) => {
    toast.success('A/B test started successfully');
  };

  const handlePauseTest = (testId: number) => {
    toast.success('A/B test paused');
  };

  const handleCreateTest = () => {
    toast.success('New A/B test created');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">A/B Testing Analytics</h2>
          <p className="text-gray-600">Optimize your platform with data-driven experiments</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedTest} onValueChange={setSelectedTest}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tests</SelectItem>
              <SelectItem value="running">Running Tests</SelectItem>
              <SelectItem value="completed">Completed Tests</SelectItem>
              <SelectItem value="draft">Draft Tests</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleCreateTest}>
            <Plus className="w-4 h-4 mr-2" />
            Create Test
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {activeTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {test.name}
                        <Badge variant={test.status === 'running' ? 'default' : test.status === 'draft' ? 'secondary' : 'outline'}>
                          {test.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Started: {test.startDate} • Traffic: {test.traffic.toLocaleString()} visitors
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {test.status === 'draft' && (
                        <Button size="sm" onClick={() => handleStartTest(test.id)}>
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {test.status === 'running' && (
                        <Button size="sm" variant="outline" onClick={() => handlePauseTest(test.id)}>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {test.variants.map((variant, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${test.winner === variant.name ? 'border-green-500 bg-green-50' : ''}`}>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">{variant.name}</h4>
                          {test.winner === variant.name && (
                            <Badge variant="default" className="bg-green-600">Winner</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1 text-blue-600" />
                              <span className="text-gray-600">Visitors</span>
                            </div>
                            <p className="font-semibold">{variant.visitors.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1 text-green-600" />
                              <span className="text-gray-600">Conversions</span>
                            </div>
                            <p className="font-semibold">{variant.conversions}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-purple-600" />
                              <span className="text-gray-600">Conv. Rate</span>
                            </div>
                            <p className="font-semibold">{variant.conversionRate}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {test.confidence > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Statistical Confidence</span>
                        <Badge variant={test.confidence >= 95 ? 'default' : 'secondary'}>
                          {test.confidence}%
                        </Badge>
                      </div>
                      <Progress value={test.confidence} className="mt-2" />
                      {test.improvement > 0 && (
                        <div className="flex items-center mt-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-green-600">+{test.improvement}% improvement</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Line type="monotone" dataKey="control" stroke="#8884d8" strokeWidth={2} name="Control" />
                  <Line type="monotone" dataKey="variant" stroke="#82ca9d" strokeWidth={2} name="Variant A" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800">Winning Variant</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Green CTA button shows 28.7% improvement in conversion rates with 95.2% confidence.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800">Statistical Significance</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Results are statistically significant. Safe to implement winning variant.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800">Recommendation</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Deploy green CTA across all course landing pages for maximum impact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Active Tests</span>
                    <Badge variant="outline">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Successful Tests (Last 30 days)</span>
                    <Badge variant="default">4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Lift</span>
                    <Badge variant="outline">+24.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Revenue Impact</span>
                    <Badge variant="default">+$12,450</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTestingAnalytics;
