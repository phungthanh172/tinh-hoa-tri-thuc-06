
import React, { useState } from 'react';
import { User, Camera, Save, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const InstructorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced software developer with 10+ years in web development and teaching.',
    expertise: 'JavaScript, React, Node.js, Python',
    experience: '10+ years',
    education: 'Computer Science, Stanford University',
    avatar: null as File | null
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile...', profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Instructor Profile</CardTitle>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2">
                  <Camera className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-lg font-semibold"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <p className="text-gray-600">Professional Instructor</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Experience</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  ) : (
                    <span>{profile.experience}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="education">Education</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Award className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                    />
                  ) : (
                    <span>{profile.education}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="expertise">Expertise</Label>
                {isEditing ? (
                  <Input
                    id="expertise"
                    value={profile.expertise}
                    onChange={(e) => handleInputChange('expertise', e.target.value)}
                    placeholder="JavaScript, React, Node.js..."
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.expertise.split(',').map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell students about yourself..."
                className="mt-1 min-h-[100px]"
              />
            ) : (
              <p className="mt-1 text-gray-700">{profile.bio}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfile;
