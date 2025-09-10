import type { Education, Publication } from '../types';

export const education: Education[] = [
  {
    id: 'btech-cse',
    institution: 'VIT Bhopal University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering (Health Informatics)',
    duration: {
      start: '2022',
      end: '2026'
    },
    gpa: 8.68,
    relevantCoursework: [
      'Machine Learning',
      'Deep Learning',
      'Artificial Intelligence',
      'Health Informatics',
      'Medical Data Analytics',
      'Data Structures and Algorithms',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Statistics and Probability',
      'Linear Algebra',
      'Computer Vision',
      'Natural Language Processing',
      'Big Data Analytics',
      'Healthcare Systems',
      'Biomedical Signal Processing'
    ],
    achievements: [
      'Maintained excellent academic performance with 8.68 CGPA',
      'Specialized in Health Informatics with focus on ML applications in healthcare',
      'Active participant in ML/AI workshops and seminars',
      'Member of Computer Science Society',
      'Completed multiple healthcare ML projects as part of coursework',
      'Participated in coding competitions and hackathons',
      'Research experience in medical data analysis'
    ]
  },
  {
    id: 'higher-secondary',
    institution: 'Hindi Higher Secondary School, Agartala',
    degree: 'Higher Secondary Certificate',
    field: 'Science (Physics, Chemistry, Mathematics, Biology)',
    duration: {
      start: '2020',
      end: '2022'
    },
    relevantCoursework: [
      'Advanced Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Statistics'
    ],
    achievements: [
      'Strong foundation in PCMB subjects',
      'Excellent performance in Mathematics and Biology',
      'Participated in science exhibitions and competitions',
      'Active in school science club activities',
      'Developed early interest in computational biology'
    ]
  }
];

// Publications and Conferences
export const publications: Publication[] = [
  {
    id: 'climate-change-arima',
    title: 'Mitigating Climate Change: Utilizing Global Warming Through ARIMA Modelling',
    conference: 'International Conference on Data Computation and Communication (ICDCC)',
    date: 'Apr 2025',
    location: 'Sehore, India',
    description: 'Explored the application of ARIMA time series modeling to analyze global temperature rise patterns and forecast future climate trends, providing insights for climate change mitigation strategies.',
    doi: 'Status: Published, DOI: 10.1109/ICDCC62744.2024.1096096',
    type: 'conference',
    topics: ['ARIMA Modeling', 'Climate Change', 'Time Series Analysis', 'Global Warming', 'Environmental Data Science']
  },
  {
    id: 'timestamp-log-classification',
    title: 'Timestamp Extraction and Log Classification Using Supervised Machine Learning: A Comparative Study',
    conference: 'Journal of Software Engineering Tools & Technology Trends',
    date: '2024',
    location: 'Under Review',
    description: 'Conducted a comprehensive comparative study on supervised machine learning techniques for timestamp extraction and log classification, analyzing various algorithms and their effectiveness in software engineering applications.',
    doi: 'Status: Accepted, DOI: Yet to recieve',
    type: 'journal',
    topics: ['Machine Learning', 'Log Analysis', 'Timestamp Extraction', 'Classification', 'Software Engineering', 'Supervised Learning']
  },
  {
    id: 'skinsight-detection',
    title: 'SkinSight: An Intelligent Skin Type Detection System',
    conference: 'Journal of Image Processing & Pattern Recognition Progress (JIPPRP)',
    date: '2024',
    location: 'Under Review',
    description: 'Developed an intelligent system for skin type detection using advanced image processing and machine learning techniques, providing accurate classification for dermatological applications and skincare recommendations.',
    doi: 'Status: Accepted, DOI: Yet to receive',
    type: 'journal',
    topics: ['Image Processing', 'Skin Type Detection', 'Computer Vision', 'Machine Learning', 'Dermatology', 'Pattern Recognition']
  },
  {
    id: 'heart-disease-ml',
    title: 'Heart Disease Prediction using Machine Learning',
    conference: 'International Conference on Data Computation and Communication (ICDCC)',
    date: 'Nov 2024',
    location: 'Bhopal, India',
    description: 'Presented research on applying machine learning algorithms for early detection and prediction of heart diseases, contributing to healthcare informatics and cardiovascular diagnostics.',
    doi: 'Status: Presented',
    type: 'conference',
    topics: ['Machine Learning', 'Healthcare', 'Heart Disease', 'Predictive Analytics', 'Medical Informatics', 'Cardiology']
  }
];