
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { FeatureNews } from '../ManagerFeatureNews';

interface FeatureNewsManagementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newsList: FeatureNews[];
}

const FeatureNewsManagementDialog: React.FC<FeatureNewsManagementDialogProps> = ({
  isOpen,
  onOpenChange,
  newsList
}) => {
  const [editingNews, setEditingNews] = useState<FeatureNews | null>(null);

  const handleEdit = (news: FeatureNews) => {
    setEditingNews(news);
    toast.success("Edit functionality will be implemented in the next phase");
  };

  const handleDelete = (newsId: number) => {
    toast.success(`News item ${newsId} would be deleted`);
  };

  const handleToggleStatus = (newsId: number) => {
    toast.success(`News item ${newsId} status toggled`);
  };

  const handleAddNew = () => {
    toast.success("Add new news functionality will be implemented in the next phase");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Manage Feature News</span>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add New News
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-4">
            {newsList.map((news) => (
              <Card key={news.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={`https://images.unsplash.com/${news.image}?w=120&h=80&fit=crop`}
                      alt={news.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{news.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{news.description}</p>
                        </div>
                        <Badge variant={news.isActive ? "default" : "secondary"}>
                          {news.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 space-x-4">
                          <span>Published: {format(new Date(news.publishDate), 'MMM d, yyyy')}</span>
                          <span>Priority: {news.priority}</span>
                          <span>ID: {news.id}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(news.id)}
                          >
                            {news.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(news)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(news.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {newsList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No news items found. Click "Add New News" to create your first news item.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureNewsManagementDialog;
