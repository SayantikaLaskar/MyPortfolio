import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'face-emotion-detection',
    title: 'Face Emotion Detection System',
    description: 'CNN-based real-time facial emotion recognition system achieving 98% accuracy across seven emotion categories.',
    longDescription: 'Designed and trained a Convolutional Neural Network on the FER-2013 dataset, achieving 98% classification accuracy across seven emotion categories (happy, sad, angry, surprise, etc.). Integrated the trained model with OpenCV to enable real-time webcam-based facial emotion recognition as well as image uploads for testing. Deployed the system using Streamlit, providing an interactive interface where users could test live detection and visualize predictions in an accessible way.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit', 'FER-2013 Dataset'],
    category: 'computer-vision',
    githubUrl: 'https://github.com/sayantika/face-emotion-detection',
    imageUrl: '/projects/face-emotion.jpg',
    featured: true,
    metrics: {
      accuracy: 98.0,
      performance: 'Real-time detection',
      impact: 'Interactive emotion analysis'
    }
  },
  {
    id: 'sign-language-recognition',
    title: 'Sign Language Recognition',
    description: 'CNN-based model for real-time American Sign Language (ASL) hand gesture recognition using webcam input.',
    longDescription: 'Developed a CNN-based model capable of recognizing and classifying American Sign Language (ASL) hand gestures in real time using webcam input. Built a gesture preprocessing pipeline with OpenCV to detect, segment, and normalize hand gestures. Implemented a mapping system to convert detected gestures into ASL symbols, creating a foundation for a communication aid between signers and non-signers.',
    technologies: ['Python', 'OpenCV', 'CNN', 'TensorFlow', 'Keras'],
    category: 'computer-vision',
    githubUrl: 'https://github.com/sayantika/sign-language-recognition',
    imageUrl: '/projects/sign-language.jpg',
    featured: true,
    metrics: {
      accuracy: 95.2,
      performance: 'Real-time gesture detection',
      impact: 'Communication accessibility tool'
    }
  },
  {
    id: 'healthbot-medical-chatbot',
    title: 'HealthBot – AI-Powered Medical Chatbot',
    description: 'Retrieval-based medical chatbot using LLMs, LangChain, and FAISS for real-time medical question answering.',
    longDescription: 'Developed a retrieval-based medical chatbot using LLMs, LangChain, and FAISS for real-time question answering based on medical literature. Implemented memory and context management to enable multi-turn conversations, ensuring the chatbot could recall previous interactions for improved accuracy. Integrated the system with the OpenAI API for natural language understanding, making the chatbot capable of providing clear, human-like responses to users in real time.',
    technologies: ['Python', 'LangChain', 'FAISS', 'OpenAI API', 'NLP'],
    category: 'nlp',
    githubUrl: 'https://github.com/sayantika/healthbot-medical-chatbot',
    imageUrl: '/projects/healthbot.jpg',
    featured: true,
    metrics: {
      accuracy: 92.5,
      performance: 'Real-time responses',
      impact: 'Medical information accessibility'
    }
  }
];

export const projectCategories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'computer-vision', label: 'Computer Vision', count: projects.filter(p => p.category === 'computer-vision').length },
  { id: 'nlp', label: 'NLP', count: projects.filter(p => p.category === 'nlp').length }
];