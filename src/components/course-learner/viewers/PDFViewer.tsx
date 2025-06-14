
import React from 'react';
import { Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PDFViewerProps {
  title: string;
  pdfUrl?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ title, pdfUrl = "/placeholder.svg" }) => {
  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center border rounded-b-lg">
          <div className="text-center space-y-4">
            <div className="w-16 h-20 bg-red-500 mx-auto rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">PDF</span>
            </div>
            <div>
              <p className="text-gray-600 font-medium">{title}</p>
              <p className="text-sm text-gray-500">PDF document ready for viewing</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Open PDF Viewer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFViewer;
