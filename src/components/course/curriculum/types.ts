
export interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'resource';
  duration?: string;
  content?: string;
  file?: File;
  url?: string;
  isPreview?: boolean;
  description?: string;
  downloadable?: boolean;
  passingScore?: number;
  timeLimit?: number;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'open-ended';
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  points: number;
  explanation?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
  isExpanded?: boolean;
  learningObjectives?: string[];
}

export interface CourseData {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  targetAudience?: string;
  learningObjectives: string[];
  prerequisites?: string;
  thumbnail?: File | string;
  promotionalVideo?: File | string;
  keywords?: string;
  isDraft: boolean;
  instructor: string;
  instructorAvatar?: string;
  image?: string;
  duration?: string;
  lectures?: number;
  sections?: Section[];
  // SEO fields
  seoTitle?: string;
  metaDescription?: string;
  // Settings
  allowDownloads?: boolean;
  enableDiscussions?: boolean;
  enableCertificates?: boolean;
  mobileOptimized?: boolean;
  // Publishing
  scheduledPublishDate?: string;
  publishOption?: 'draft' | 'review' | 'immediate' | 'scheduled';
}
