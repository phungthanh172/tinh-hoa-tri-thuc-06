
export interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration?: string;
  description?: string;
  content?: string;
  videoFile?: File;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}
