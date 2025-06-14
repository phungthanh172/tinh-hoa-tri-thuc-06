
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  explanation?: string;
  options: QuizOption[];
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit?: number;
  passingScore: number;
  questions: QuizQuestion[];
}
