import type { Skill, ContactInfo } from '../types';

export const aboutData = {
  name: 'Sayantika Laskar',
  title: 'Machine Learning Engineer & Developer',
  description: `Passionate about leveraging machine learning and deep learning to solve real-world problems, 
    particularly in healthcare and other critical domains. I specialize in developing modern, 
    scalable ML solutions that make a meaningful impact on people's lives.
    
    With expertise in both traditional machine learning and cutting-edge deep learning techniques, 
    I focus on creating robust, production-ready systems that bridge the gap between research and 
    practical applications.`,


  skills: [
    // ML/DL Core
    { name: 'Machine Learning', category: 'ml', proficiency: 'expert' },
    { name: 'Deep Learning', category: 'ml', proficiency: 'expert' },
    { name: 'Computer Vision', category: 'ml', proficiency: 'advanced' },
    { name: 'Natural Language Processing', category: 'ml', proficiency: 'advanced' },
    { name: 'Healthcare ML', category: 'ml', proficiency: 'expert' },

    // Programming Languages
    { name: 'Python', category: 'programming', proficiency: 'expert' },
    { name: 'R', category: 'programming', proficiency: 'advanced' },
    { name: 'JavaScript', category: 'programming', proficiency: 'intermediate' },
    { name: 'SQL', category: 'programming', proficiency: 'advanced' },

    // Frameworks & Libraries
    { name: 'TensorFlow', category: 'frameworks', proficiency: 'expert' },
    { name: 'PyTorch', category: 'frameworks', proficiency: 'expert' },
    { name: 'Scikit-learn', category: 'frameworks', proficiency: 'expert' },
    { name: 'Keras', category: 'frameworks', proficiency: 'expert' },
    { name: 'Pandas', category: 'frameworks', proficiency: 'expert' },
    { name: 'NumPy', category: 'frameworks', proficiency: 'expert' },

    // Tools & Platforms
    { name: 'Docker', category: 'tools', proficiency: 'advanced' },
    { name: 'Git', category: 'tools', proficiency: 'advanced' },
    { name: 'Jupyter', category: 'tools', proficiency: 'expert' },
    { name: 'AWS', category: 'tools', proficiency: 'intermediate' },
    { name: 'MLflow', category: 'tools', proficiency: 'advanced' },
  ] as Skill[],

  contact: {
    email: 'sayantikalaskar2002@gmail.com',
    linkedin: 'https://linkedin.com/in/sayantika-laskar',
    github: 'https://github.com/sayantikalaskar',
    twitter: 'https://www.kaggle.com/sayantikalaskar1712',
  } as ContactInfo,

  highlights: [
    'Specialized in ML applications',
    'Published researcher in multiple fields',
    'Full-stack ML pipeline development',
  ],
};