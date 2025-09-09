import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectFilter } from '../ui/ProjectFilter';
import { ProjectModal } from '../ui/ProjectModal';
import { projects, projectCategories } from '../../data/projects';
import type { Project } from '../../types';
import { colorPalette } from '../../utils/colors';
import { useSectionAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { ProjectCardHover } from '../animations/InteractiveHoverEffects';
import { DataFlowAnimation } from '../animations/DataFlowAnimation';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Enhanced scroll animations
  const titleAnimation = useSectionAnimation<HTMLHeadingElement>('slide');
  const { ref: projectsRef, shouldAnimate, getChildVariants } = useStaggeredAnimation<HTMLDivElement>(
    filteredProjects.length,
    { staggerDelay: 0.1 }
  );

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Section id="projects" className="relative">
      {/* Data Flow Background Animation */}
      <DataFlowAnimation 
        className="opacity-20" 
        streams={3} 
        animated={true}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ color: colorPalette.text.primary }}
        >
          Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-center max-w-2xl mx-auto mb-8"
          style={{ color: colorPalette.text.secondary }}
        >
          Explore my portfolio of machine learning projects, from computer vision
          to natural language processing applications.
        </motion.p>

        {/* Project Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <ProjectFilter
            categories={projectCategories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Projects Grid with Enhanced Animations */}
        <motion.div
          ref={projectsRef}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={getChildVariants(index)}
            >
              <ProjectCardHover
                className="h-full"
                imageUrl={project.imageUrl}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              </ProjectCardHover>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p
              className="text-lg"
              style={{ color: colorPalette.text.secondary }}
            >
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </Section>
  );
}