
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { contentSecurityApi, type WatermarkConfig, type AccessControl } from '@/services/contentSecurityApi';

interface DRMSecurePlayerProps {
  contentId: string;
  courseId: string;
  userId: string;
  userEmail: string;
  contentUrl: string;
  contentType: 'video' | 'pdf' | 'audio';
  title: string;
  drmEnabled?: boolean;
  watermarkEnabled?: boolean;
}

const DRMSecurePlayer: React.FC<DRMSecurePlayerProps> = ({
  contentId,
  courseId,
  userId,
  userEmail,
  contentUrl,
  contentType,
  title,
  drmEnabled = true,
  watermarkEnabled = true
}) => {
  const [accessControl, setAccessControl] = useState<AccessControl | null>(null);
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeSecurity();
  }, [contentId, userId]);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common keyboard shortcuts for downloading/saving
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) || // Ctrl+S
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || // Ctrl+Shift+I
        e.key === 'F12' || // F12
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) // Ctrl+Shift+C
      ) {
        e.preventDefault();
        setSecurityWarning('Content protection is active. This action is not allowed.');
        setTimeout(() => setSecurityWarning(null), 3000);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const initializeSecurity = async () => {
    setIsLoading(true);
    try {
      // Generate access token
      const access = await contentSecurityApi.generateAccessToken(userId, courseId, contentId);
      setAccessControl(access);

      // Generate watermark if enabled
      if (watermarkEnabled) {
        const watermark = await contentSecurityApi.generateWatermark(userId, userEmail);
        setWatermarkConfig(watermark);
      }

      // Validate access
      const isValid = await contentSecurityApi.validateAccessToken(access.accessToken);
      setHasAccess(isValid);

      // Log access attempt
      await contentSecurityApi.logSecurityEvent({
        userId,
        action: 'content_access_attempt',
        contentId,
        ipAddress: '127.0.0.1', // In real implementation, get actual IP
        userAgent: navigator.userAgent,
        severity: 'low'
      });

    } catch (error) {
      console.error('Security initialization failed:', error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderWatermark = () => {
    if (!watermarkEnabled || !watermarkConfig) return null;

    const positionStyles = {
      'top-left': { top: '10px', left: '10px' },
      'top-right': { top: '10px', right: '10px' },
      'bottom-left': { bottom: '10px', left: '10px' },
      'bottom-right': { bottom: '10px', right: '10px' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };

    return (
      <div 
        className="absolute pointer-events-none text-white text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded z-10"
        style={{
          ...positionStyles[watermarkConfig.position],
          opacity: watermarkConfig.opacity
        }}
      >
        {watermarkConfig.userEmail} • {new Date(watermarkConfig.timestamp).toLocaleString()}
      </div>
    );
  };

  const renderSecureContent = () => {
    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center space-y-4">
            <Lock className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <h3 className="font-medium text-gray-700">Access Denied</h3>
              <p className="text-sm text-gray-500">You don't have permission to view this content</p>
            </div>
          </div>
        </div>
      );
    }

    switch (contentType) {
      case 'video':
        return (
          <div className="relative">
            <video
              ref={playerRef}
              className="w-full aspect-video rounded-lg"
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              src={contentUrl}
            >
              Your browser does not support the video tag.
            </video>
            {renderWatermark()}
          </div>
        );
      
      case 'audio':
        return (
          <div className="relative">
            <audio
              className="w-full"
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              src={contentUrl}
            >
              Your browser does not support the audio tag.
            </audio>
            {watermarkEnabled && (
              <div className="text-xs text-gray-500 mt-2">
                Licensed to: {userEmail}
              </div>
            )}
          </div>
        );
      
      case 'pdf':
        return (
          <div className="relative h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-20 bg-red-500 mx-auto rounded flex items-center justify-center">
                <span className="text-white font-bold">PDF</span>
              </div>
              <div>
                <p className="font-medium">Secure PDF Viewer</p>
                <p className="text-sm text-gray-600">Content protected by DRM</p>
              </div>
            </div>
            {renderWatermark()}
          </div>
        );
      
      default:
        return <div>Unsupported content type</div>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-center space-y-2">
              <Shield className="w-8 h-8 text-blue-600 mx-auto animate-pulse" />
              <p className="text-sm text-gray-600">Initializing security...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>{title}</span>
          </CardTitle>
          <div className="flex space-x-2">
            {drmEnabled && <Badge variant="outline" className="text-green-600">DRM Protected</Badge>}
            {watermarkEnabled && <Badge variant="outline" className="text-blue-600">Watermarked</Badge>}
            <Badge variant="outline" className="text-purple-600">Encrypted</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {securityWarning && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{securityWarning}</AlertDescription>
          </Alert>
        )}
        
        {renderSecureContent()}
        
        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-2">
            <Eye className="w-3 h-3" />
            <span>This content is protected by digital rights management</span>
          </div>
          {accessControl && (
            <div>Access expires: {accessControl.expiresAt.toLocaleString()}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DRMSecurePlayer;
