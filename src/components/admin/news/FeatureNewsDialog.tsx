
import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FeatureNews } from '../ManagerFeatureNews';

interface FeatureNewsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  news: FeatureNews | null;
}

const FeatureNewsDialog: React.FC<FeatureNewsDialogProps> = ({
  isOpen,
  onOpenChange,
  news
}) => {
  if (!news) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{news.title}</span>
            <Badge variant={news.isActive ? "default" : "secondary"}>
              {news.isActive ? "Active" : "Inactive"}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <img
              src={`https://images.unsplash.com/${news.image}?w=600&h=300&fit=crop`}
              alt={news.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Published: {format(new Date(news.publishDate), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Priority: {news.priority}
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {news.description}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">News Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Status:</span> {news.isActive ? "Active" : "Inactive"}
              </div>
              <div>
                <span className="font-medium">Priority:</span> {news.priority}
              </div>
              <div>
                <span className="font-medium">ID:</span> {news.id}
              </div>
              <div>
                <span className="font-medium">Publish Date:</span> {format(new Date(news.publishDate), 'MM/dd/yyyy')}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureNewsDialog;
