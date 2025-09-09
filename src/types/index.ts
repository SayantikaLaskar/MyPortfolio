// Core data interfaces for the ML Portfolio Website

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'health-ml' | 'computer-vision' | 'nlp' | 'general-ml';
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  featured: boolean;
  metrics?: {
    accuracy?: number;
    performance?: string;
    impact?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: {
    start: string;
    end: string | 'Present';
  };
  description: string;
  achievements: string[];
  technologies: string[];
  logoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: {
    start: string;
    end: string;
  };
  gpa?: number;
  relevantCoursework: string[];
  achievements?: string[];
}

export interface Skill {
  name: string;
  category: 'ml' | 'programming' | 'tools' | 'frameworks';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  conference: string;
  date: string;
  location: string;
  description: string;
  doi?: string;
  type: 'conference' | 'journal' | 'workshop';
  topics: string[];
}
