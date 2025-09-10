import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

import { ContactLinks } from '../ui/ContactLinks';
import { aboutData } from '../../data/about';
import { colorPalette } from '../../utils/colors';
import { useSectionAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { InteractiveCard, SkillTag as InteractiveSkillTag } from '../animations/InteractiveHoverEffects';
import { FloatingParticles } from '../animations/FloatingParticles';

export function AboutSection() {
  const { description, photoUrl, skills, contact, highlights } = aboutData;

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Photo and Highlights */}
          <div className="space-y-8">
            {/* Profile Image Container with Interactive Effects */}
            <InteractiveCard
              className="mx-auto lg:mx-0 w-64 h-64"
              glowEffect={true}
              tiltEffect={true}
              scaleEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gray-200"
              >
              <img
                src={photoUrl}
                alt="Sayantika Laskar"
                className="w-full h-full object-cover"
                onLoad={() => console.log('Image loaded successfully')}
                onError={(e) => {
                  console.log('Image failed to load:', photoUrl);
                  // Fallback to a gradient placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show the fallback div
                  const fallbackDiv = target.nextElementSibling as HTMLElement;
                  if (fallbackDiv) {
                    fallbackDiv.style.display = 'flex';
                  }
                }}
                loading="lazy"
              />
              {/* Gradient overlay for placeholder - hidden by default */}
              <div
                className="absolute inset-0 flex items-center justify-center font-semibold text-lg"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.accent} 0%, ${colorPalette.dark} 100%)`,
                  color: colorPalette.text.inverse,
                  display: 'none' // Hidden by default, only shown on image error
                }}
              >
                <span className="opacity-90">Sayantika Laskar</span>
              </div>
              </motion.div>
            </InteractiveCard>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
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
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
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
          </div>

          {/* Right Column - Description and Skills */}
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