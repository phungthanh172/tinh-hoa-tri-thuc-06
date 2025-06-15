
import React from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InstructorData {
    name: string;
    revenue: number;
    students: number;
    courses: number;
}

interface TopInstructorsCardProps {
    instructors: InstructorData[];
    onExport: (type: string) => void;
}

const TopInstructorsCard: React.FC<TopInstructorsCardProps> = ({ instructors, onExport }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Top Performing Instructors
                    </span>
                    <Button variant="outline" size="sm" onClick={() => onExport('instructors')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {instructors.map((instructor, index) => (
                        <div key={instructor.name} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{instructor.name}</h3>
                                    <p className="text-sm text-gray-500">{instructor.courses} courses</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">${instructor.revenue.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">{instructor.students} students</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TopInstructorsCard;
