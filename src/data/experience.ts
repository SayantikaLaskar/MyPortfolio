import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'akai-space-intern',
    company: 'Akai Space',
    position: 'Data Labeler and AI Developer',
    duration: {
      start: 'Jul 2025',
      end: 'Present'
    },
    description: 'Contributing to AI model development by labeling datasets, testing model outputs, and supporting data-centric ML workflows in a hybrid work environment.',
    achievements: [
      'Labeled and curated high-quality datasets for computer vision and NLP models',
      'Tested and validated AI model outputs to ensure accuracy and reliability',
      'Supported data-centric ML workflows and pipeline optimization',
      'Collaborated with remote team members in hybrid work environment'
    ],
    technologies: ['Python', 'Data Labeling Tools', 'Computer Vision', 'NLP', 'Model Testing', 'ML Pipelines'],
    logoUrl: '/companies/akai-space.png'
  },
  {
    id: 'girlscript-gsoc',
    company: 'GirlScript Summer of Code',
    position: 'Open Source Contributor',
    duration: {
      start: 'May 2024',
      end: 'Aug 2024'
    },
    description: 'Participated in GirlScript Summer of Code 2024-25, contributing to open source machine learning and web development projects.',
    achievements: [
      'Contributed to multiple open source ML projects with 50+ commits',
      'Implemented feature enhancements and bug fixes for community projects',
      'Collaborated with global developer community on GitHub',
      'Mentored junior contributors and reviewed pull requests'
    ],
    technologies: ['Python', 'JavaScript', 'React', 'Machine Learning', 'Git', 'GitHub', 'Open Source'],
    logoUrl: '/companies/girlscript.png'
  }
];