import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, GraduationCap, Calendar, Award, BookOpen, Trophy, FileText, MapPin } from 'lucide-react';
import { Section } from '../ui/Section';
import { education, publications } from '../../data/education';
import type { Education, Publication } from '../../types';

interface EducationCardProps {
  education: Education;
  index: number;
}

function EducationCard({ education, index }: EducationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative flex items-center min-h-[200px]"
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#568F87] rounded-full border-4 border-[#FFF5F2] z-20 hidden md:block" />

      {/* Card positioned on alternating sides */}
      <div className={`w-full flex ${index % 2 === 0 ? 'justify-start pr-4 md:pr-8' : 'justify-end pl-4 md:pl-8'}`}>
        <div className="w-full max-w-md">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-[#F5BABB] p-6 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#064232] mb-1">
                  {education.degree}
                </h3>
                <p className="text-[#568F87] font-medium mb-2">{education.field}</p>
                <div className="flex items-center gap-2 text-[#568F87] mb-2">
                  <GraduationCap size={16} />
                  <span className="font-semibold">{education.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-[#568F87] text-sm mb-2">
                  <Calendar size={14} />
                  <span>{education.duration.start} - {education.duration.end}</span>
                </div>
                {education.gpa && (
                  <div className="flex items-center gap-2 text-[#064232] text-sm font-semibold">
                    <Trophy size={14} />
                    <span>CGPA: {education.gpa}/10.0</span>
                  </div>
                )}
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 flex-shrink-0"
              >
                <ChevronDown className="text-[#568F87]" size={20} />
              </motion.div>
            </div>

            {/* Relevant Coursework Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {education.relevantCoursework.slice(0, 4).map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-[#F5BABB] text-[#064232] text-xs font-medium rounded-full"
                >
                  {course}
                </span>
              ))}
              {education.relevantCoursework.length > 4 && (
                <span className="px-3 py-1 bg-[#568F87] text-white text-xs font-medium rounded-full">
                  +{education.relevantCoursework.length - 4} more
                </span>
              )}
            </div>

            {/* Expandable Content */}
            <motion.div
              variants={contentVariants}
              animate={isExpanded ? 'expanded' : 'collapsed'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-[#F5BABB]">
                {/* Relevant Coursework */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-[#568F87]" size={16} />
                    <h4 className="font-semibold text-[#064232]">Relevant Coursework</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {education.relevantCoursework.map((course) => (
                      <motion.span
                        key={course}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-[#F5BABB] text-[#064232] text-xs font-medium rounded-full border border-[#568F87]"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Academic Achievements */}
                {education.achievements && education.achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="text-[#568F87]" size={16} />
                      <h4 className="font-semibold text-[#064232]">Academic Achievements</h4>
                    </div>
                    <ul className="space-y-2">
                      {education.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#064232]">
                          <span className="w-1.5 h-1.5 bg-[#568F87] rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

function PublicationCard({ publication, index }: PublicationCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-lg shadow-md border border-[#F5BABB] p-6 h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#064232] mb-2 leading-tight">
            {publication.title}
          </h4>
          <p className="text-[#568F87] font-medium mb-2">{publication.conference}</p>
          <div className="flex items-center gap-2 text-[#568F87] text-sm mb-1">
            <Calendar size={14} />
            <span>{publication.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#568F87] text-sm mb-3">
            <MapPin size={14} />
            <span>{publication.location}</span>
          </div>
          {publication.doi && (
            <p className="text-xs text-[#064232] font-mono bg-[#F5BABB] px-2 py-1 rounded mb-3">
              {publication.doi}
            </p>
          )}
        </div>
        <FileText className="text-[#568F87] flex-shrink-0" size={24} />
      </div>
      
      <p className="text-sm text-[#064232] mb-4 leading-relaxed">
        {publication.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {publication.topics.map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 bg-[#F5BABB] text-[#064232] text-xs font-medium rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  return (
    <Section id="education" className="py-20" style={{ backgroundColor: '#FFF5F2' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#064232] mb-6">
            Education & Qualifications
          </h2>
          <p className="text-lg text-[#568F87] max-w-3xl mx-auto leading-relaxed">
            My academic journey and continuous learning in machine learning, computer science, 
            and artificial intelligence that forms the foundation of my expertise.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Main timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-[#568F87] to-[#F5BABB]  h-84 mt-40" />
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <EducationCard
                key={edu.id}
                education={edu}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Publications & Conferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-[#064232] text-center mb-8">
            Publications & Conferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((publication, index) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-[#568F87] mb-6">
            Interested in my research work or want to collaborate on ML projects?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#568F87] text-white font-semibold rounded-full border-2 border-[#064232] transition-all duration-300 hover:bg-[#064232]"
            onClick={() => {
              const aboutElement = document.getElementById('about');
              if (aboutElement) {
                const contactElement = aboutElement.querySelector('.flex.flex-wrap.justify-center.gap-4.mt-8');
                if (contactElement) {
                  const elementTop = contactElement.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementTop - 80; // 80px offset for navbar
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  aboutElement.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}