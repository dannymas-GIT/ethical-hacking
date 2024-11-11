export interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  icon: any; // We'll improve this type later
  downloadUrl: string;
}

export type ResourceType = 'guide' | 'tutorial' | 'code';

export interface Topic {
  id: string;
  label: string;
}

export interface Section {
  topics: string[];
}

export interface Sections {
  [key: string]: Section;
}

export type CompletedTopics = Record<string, boolean>; 