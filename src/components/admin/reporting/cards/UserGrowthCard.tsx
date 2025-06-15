
import React from 'react';
import { Users, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserGrowthData {
    month: string;
    students: number;
    instructors: number;
}

interface UserGrowthCardProps {
    data: UserGrowthData[];
    onExport: (type: string) => void;
}

const UserGrowthCard: React.FC<UserGrowthCardProps> = ({ data, onExport }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        User Growth
                    </span>
                    <Button variant="outline" size="sm" onClick={() => onExport('users')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="students" stroke="#8884d8" name="Students" />
                            <Line type="monotone" dataKey="instructors" stroke="#82ca9d" name="Instructors" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserGrowthCard;
