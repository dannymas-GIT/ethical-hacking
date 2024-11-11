export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  topics: CourseTopic[];
  tools: LabTool[];
}

export interface CourseTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'theory' | 'practical' | 'assessment';
  resources: string[]; // IDs linking to ResourceLibrary
  labId?: string; // Optional link to lab environment
}

export interface LabTool {
  id: string;
  name: string;
  description: string;
  category: 'network' | 'web' | 'system' | 'forensics';
  setupInstructions: string;
  documentationUrl: string;
} 