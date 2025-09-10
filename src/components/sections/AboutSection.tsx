import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

import { ContactLinks } from '../ui/ContactLinks';
import { aboutData } from '../../data/about';
import { colorPalette } from '../../utils/colors';
import { useSectionAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { SkillTag as InteractiveSkillTag } from '../animations/InteractiveHoverEffects';
import { FloatingParticles } from '../animations/FloatingParticles';

export function AboutSection() {
  const { description, skills, contact, highlights } = aboutData;

  // Enhanced scroll animations
  const titleAnimation = useSectionAnimation<HTMLHeadingElement>('bounce');
  const { ref: skillsRef, shouldAnimate, getChildVariants } = useStaggeredAnimation<HTMLDivElement>(
    skills.length,
    { staggerDelay: 0.05 }
  );

  return (
    <Section id="about" background="alternate" className="relative">
      {/* Floating particles background */}
      <FloatingParticles
        className="opacity-30"
        count={15}
        dataVisualization={true}
        interactive={false}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: colorPalette.text.primary }}
        >
          About Me
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {/* Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3 mb-12"
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: colorPalette.text.primary }}
            >
              Key Highlights
            </h3>
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette.accent }}
                />
                <span style={{ color: colorPalette.text.secondary }}>{highlight}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Description and Skills Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              {description.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed"
                  style={{ color: colorPalette.text.secondary }}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </motion.div>

            {/* Skills Section with Enhanced Animations */}
            <motion.div
              ref={skillsRef}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              <motion.h3
                variants={getChildVariants(0)}
                className="text-xl font-semibold"
                style={{ color: colorPalette.text.primary }}
              >
                Technical Expertise
              </motion.h3>

              {/* Group skills by category with staggered animations */}
              {['ml', 'programming', 'frameworks', 'tools'].map((category, categoryIndex) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                const categoryLabels = {
                  ml: 'Machine Learning & AI',
                  programming: 'Programming Languages',
                  frameworks: 'Frameworks & Libraries',
                  tools: 'Tools & Platforms'
                };

                return (
                  <motion.div
                    key={category}
                    variants={getChildVariants(categoryIndex + 1)}
                    className="space-y-3"
                  >
                    <h4
                      className="text-sm font-medium uppercase tracking-wide"
                      style={{ color: colorPalette.text.muted }}
                    >
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          variants={getChildVariants(categoryIndex * 5 + skillIndex + 2)}
                        >
                          <InteractiveSkillTag
                            category={skill.category as 'ml' | 'programming' | 'frameworks' | 'tools'}
                          >
                            {skill.name}
                          </InteractiveSkillTag>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Contact Links */}
        <ContactLinks contact={contact} />
      </div>
    </Section>
  );
}