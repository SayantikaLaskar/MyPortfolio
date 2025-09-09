import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Clock, Target } from 'lucide-react';
import type { Project } from '../../types';
import { colorPalette } from '../../utils/colors';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    'computer-vision': 'Computer Vision',
    'nlp': 'Natural Language Processing',
    'health-ml': 'Health ML',
    'general-ml': 'General ML'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ 
        backgroundColor: colorPalette.background.card,
        border: `1px solid ${colorPalette.interactive.border}`
      }}
    >
      {/* Project Image */}
      <div 
        className="relative h-48"
        style={{ 
          background: `linear-gradient(135deg, ${colorPalette.secondary}40, ${colorPalette.accent}40)`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${colorPalette.accent}, ${colorPalette.dark})`
            }}
          >
            <TrendingUp className="w-8 h-8" style={{ color: colorPalette.text.inverse }} />
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: colorPalette.accent,
                color: colorPalette.text.inverse
              }}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: colorPalette.secondary,
              color: colorPalette.text.primary
            }}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Title and Description */}
        <h3 
          className="text-xl font-bold mb-2 line-clamp-2"
          style={{ color: colorPalette.text.primary }}
        >
          {project.title}
        </h3>
        <p 
          className="mb-4 line-clamp-3"
          style={{ color: colorPalette.text.secondary }}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded text-xs"
                style={{ 
                  backgroundColor: colorPalette.secondary,
                  color: colorPalette.text.primary
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span 
                className="px-2 py-1 rounded text-xs"
                style={{ 
                  backgroundColor: colorPalette.secondary,
                  color: colorPalette.text.secondary
                }}
              >
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
            {project.metrics.accuracy && (
              <div 
                className="flex items-center gap-1"
                style={{ color: colorPalette.accent }}
              >
                <Target className="w-3 h-3" />
                <span>{project.metrics.accuracy}%</span>
              </div>
            )}
            {project.metrics.performance && (
              <div 
                className="flex items-center gap-1"
                style={{ color: colorPalette.accent }}
              >
                <Clock className="w-3 h-3" />
                <span className="truncate">{project.metrics.performance}</span>
              </div>
            )}
            {project.metrics.impact && (
              <div 
                className="flex items-center gap-1"
                style={{ color: colorPalette.accent }}
              >
                <TrendingUp className="w-3 h-3" />
                <span className="truncate">{project.metrics.impact}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewDetails(project)}
            className="font-medium text-sm transition-colors hover:opacity-80"
            style={{ color: colorPalette.interactive.primary }}
          >
            View Details
          </button>
          
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors hover:opacity-80"
                style={{ color: colorPalette.text.secondary }}
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors hover:opacity-80"
                style={{ color: colorPalette.text.secondary }}
                title="View Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}