import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Building2, Calendar, Award } from 'lucide-react';
import { Section } from '../ui/Section';
import { experiences } from '../../data/experience';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
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
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#568F87] rounded-full border-4 border-[#FFF5F2] z-20" />

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
                  {experience.position}
                </h3>
                <div className="flex items-center gap-2 text-[#568F87] mb-2">
                  <Building2 size={16} />
                  <span className="font-semibold">{experience.company}</span>
                </div>
                <div className="flex items-center gap-2 text-[#568F87] text-sm">
                  <Calendar size={14} />
                  <span>{experience.duration.start} - {experience.duration.end}</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 flex-shrink-0"
              >
                <ChevronDown className="text-[#568F87]" size={20} />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-[#064232] mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Technology Stack Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#F5BABB] text-[#064232] text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
              {experience.technologies.length > 4 && (
                <span className="px-3 py-1 bg-[#568F87] text-white text-xs font-medium rounded-full">
                  +{experience.technologies.length - 4} more
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
                {/* Key Achievements */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="text-[#568F87]" size={16} />
                    <h4 className="font-semibold text-[#064232]">Key Achievements</h4>
                  </div>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#064232]">
                        <span className="w-1.5 h-1.5 bg-[#568F87] rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complete Technology Stack */}
                <div>
                  <h4 className="font-semibold text-[#064232] mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-[#F5BABB] text-[#064232] text-xs font-medium rounded-full border border-[#568F87]"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" className="py-20" style={{ backgroundColor: '#F5BABB' }}>
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
            Professional Experience
          </h2>
          <p className="text-lg text-[#568F87] max-w-3xl mx-auto leading-relaxed">
            My journey in machine learning and data science, from internships to open source 
            contributions that make a real-world impact.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-[#568F87] to-[#F5BABB] h-92 mt-44" />
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-[#568F87] mb-6">
            Interested in collaborating or learning more about my experience?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#568F87] text-white font-semibold rounded-full border-2 border-[#064232] transition-all duration-300 hover:bg-[#064232]"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}