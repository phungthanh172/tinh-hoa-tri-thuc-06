
import React, { useState } from 'react';
import { AlertTriangle, Shield, Flag, Search, Upload, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentSecurityApi } from '@/services/contentSecurityApi';

interface PiracyReport {
  id: string;
  contentId: string;
  contentTitle: string;
  reportType: 'unauthorized_copy' | 'illegal_distribution' | 'copyright_violation' | 'other';
  description: string;
  evidenceUrl?: string;
  reporterUserId: string;
  status: 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'dismissed';
  submittedAt: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const PiracyReportingSystem: React.FC = () => {
  const [reportForm, setReportForm] = useState({
    contentId: '',
    reportType: '',
    description: '',
    evidenceUrl: '',
    priority: 'medium'
  });

  const [submittedReport, setSubmittedReport] = useState<{ reportId: string; status: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration
  const mockReports: PiracyReport[] = [
    {
      id: 'report_001',
      contentId: 'course_video_123',
      contentTitle: 'JavaScript Fundamentals - Lesson 5',
      reportType: 'unauthorized_copy',
      description: 'Found this video uploaded on YouTube without permission',
      evidenceUrl: 'https://youtube.com/example-link',
      reporterUserId: 'user_456',
      status: 'under_review',
      submittedAt: new Date('2024-01-15'),
      priority: 'high'
    },
    {
      id: 'report_002',
      contentId: 'course_pdf_789',
      contentTitle: 'Advanced React Patterns PDF',
      reportType: 'illegal_distribution',
      description: 'PDF being shared on file-sharing websites',
      reporterUserId: 'user_789',
      status: 'investigating',
      submittedAt: new Date('2024-01-10'),
      priority: 'medium'
    }
  ];

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await contentSecurityApi.reportPiracy({
        contentId: reportForm.contentId,
        reporterUserId: 'current_user_id', // In real app, get from auth context
        description: reportForm.description,
        evidenceUrl: reportForm.evidenceUrl || undefined
      });

      setSubmittedReport(result);
      setReportForm({
        contentId: '',
        reportType: '',
        description: '',
        evidenceUrl: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'under_review':
        return <Search className="w-4 h-4 text-yellow-600" />;
      case 'investigating':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'dismissed':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Anti-Piracy & Copyright Protection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="report-piracy">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="report-piracy">Report Piracy</TabsTrigger>
              <TabsTrigger value="my-reports">My Reports</TabsTrigger>
              <TabsTrigger value="protection-info">Protection Info</TabsTrigger>
            </TabsList>

            <TabsContent value="report-piracy" className="space-y-4">
              {submittedReport ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your report has been submitted successfully. Report ID: <strong>{submittedReport.reportId}</strong>
                    <br />
                    Status: {submittedReport.status}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <Flag className="h-4 w-4" />
                  <AlertDescription>
                    Help us protect content creators by reporting suspected piracy or copyright violations.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Content ID or URL</label>
                    <Input
                      value={reportForm.contentId}
                      onChange={(e) => setReportForm({...reportForm, contentId: e.target.value})}
                      placeholder="Enter content identifier or original URL"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Report Type</label>
                    <Select 
                      value={reportForm.reportType} 
                      onValueChange={(value) => setReportForm({...reportForm, reportType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select violation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unauthorized_copy">Unauthorized Copy</SelectItem>
                        <SelectItem value="illegal_distribution">Illegal Distribution</SelectItem>
                        <SelectItem value="copyright_violation">Copyright Violation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Evidence URL (Optional)</label>
                  <Input
                    value={reportForm.evidenceUrl}
                    onChange={(e) => setReportForm({...reportForm, evidenceUrl: e.target.value})}
                    placeholder="Link to the infringing content"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    placeholder="Provide detailed description of the violation..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <Select 
                    value={reportForm.priority} 
                    onValueChange={(value) => setReportForm({...reportForm, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Submit Report
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="my-reports" className="space-y-4">
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{report.contentTitle}</h4>
                            <Badge className={getStatusColor(report.status)}>
                              {getStatusIcon(report.status)}
                              <span className="ml-1">{report.status.replace('_', ' ')}</span>
                            </Badge>
                            <Badge className={getPriorityColor(report.priority)}>
                              {report.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          {report.evidenceUrl && (
                            <p className="text-xs text-blue-600">
                              Evidence: <a href={report.evidenceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                                {report.evidenceUrl}
                              </a>
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Report ID: {report.id} • Submitted: {report.submittedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protection-info" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Our Anti-Piracy Measures</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Technical Protection</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Digital Rights Management (DRM)</li>
                          <li>• Content encryption</li>
                          <li>• Watermarking technology</li>
                          <li>• Download protection</li>
                          <li>• Secure streaming protocols</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Legal Measures</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• DMCA takedown procedures</li>
                          <li>• Copyright registration</li>
                          <li>• Legal action against infringers</li>
                          <li>• International cooperation</li>
                          <li>• ISP notification systems</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">What to Report:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 mt-1">
                          <li>• Unauthorized copies of course content</li>
                          <li>• Illegal distribution on file-sharing sites</li>
                          <li>• Copyright violations on social media</li>
                          <li>• Reselling of content without permission</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">How We Respond:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 mt-1">
                          <li>• Investigation within 24-48 hours</li>
                          <li>• DMCA takedown notices sent</li>
                          <li>• Legal action when appropriate</li>
                          <li>• Regular status updates to reporters</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiracyReportingSystem;
