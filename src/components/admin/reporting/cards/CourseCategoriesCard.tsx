
import React from 'react';
import { BookOpen, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryData {
    name: string;
    value: number;
    color: string;
}

interface CourseCategoriesCardProps {
    data: CategoryData[];
    onExport: (type: string) => void;
}

const CourseCategoriesCard: React.FC<CourseCategoriesCardProps> = ({ data, onExport }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Course Categories
                    </span>
                    <Button variant="outline" size="sm" onClick={() => onExport('categories')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseCategoriesCard;
