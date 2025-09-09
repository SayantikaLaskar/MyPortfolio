import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Target, Clock, TrendingUp } from 'lucide-react';
import type { Project } from '../../types';
import { colorPalette } from '../../utils/colors';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const categoryLabels: Record<string, string> = {
    'computer-vision': 'Computer Vision',
    'nlp': 'Natural Language Processing',
    'health-ml': 'Health ML',
    'general-ml': 'General ML'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: colorPalette.background.card }}
            >
              {/* Header */}
              <div 
                className="sticky top-0 p-6 flex items-center justify-between"
                style={{ 
                  backgroundColor: colorPalette.background.card,
                  borderBottom: `1px solid ${colorPalette.interactive.border}`
                }}
              >
                <div className="flex items-center gap-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: colorPalette.secondary,
                      color: colorPalette.text.primary
                    }}
                  >
                    {categoryLabels[project.category]}
                  </span>
                  {project.featured && (
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: colorPalette.accent,
                        color: colorPalette.text.inverse
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 transition-colors hover:opacity-80"
                  style={{ color: colorPalette.text.secondary }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Project Image Placeholder */}
                <div 
                  className="relative h-64 rounded-lg mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${colorPalette.secondary}40, ${colorPalette.accent}40)`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${colorPalette.accent}, ${colorPalette.dark})`
                      }}
                    >
                      <TrendingUp className="w-10 h-10" style={{ color: colorPalette.text.inverse }} />
                    </div>
                  </div>
                </div>

                {/* Title and Description */}
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ color: colorPalette.text.primary }}
                >
                  {project.title}
                </h2>
                
                <p 
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: colorPalette.text.secondary }}
                >
                  {project.longDescription}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {project.metrics.accuracy && (
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: colorPalette.secondary }}
                      >
                        <div 
                          className="flex items-center gap-2 mb-1"
                          style={{ color: colorPalette.accent }}
                        >
                          <Target className="w-5 h-5" />
                          <span className="font-medium">Accuracy</span>
                        </div>
                        <p 
                          className="text-2xl font-bold"
                          style={{ color: colorPalette.text.primary }}
                        >
                          {project.metrics.accuracy}%
                        </p>
                      </div>
                    )}
                    
                    {project.metrics.performance && (
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: colorPalette.secondary }}
                      >
                        <div 
                          className="flex items-center gap-2 mb-1"
                          style={{ color: colorPalette.accent }}
                        >
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">Performance</span>
                        </div>
                        <p 
                          className="text-lg font-bold"
                          style={{ color: colorPalette.text.primary }}
                        >
                          {project.metrics.performance}
                        </p>
                      </div>
                    )}
                    
                    {project.metrics.impact && (
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: colorPalette.secondary }}
                      >
                        <div 
                          className="flex items-center gap-2 mb-1"
                          style={{ color: colorPalette.accent }}
                        >
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-medium">Impact</span>
                        </div>
                        <p 
                          className="text-lg font-bold"
                          style={{ color: colorPalette.text.primary }}
                        >
                          {project.metrics.impact}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h3 
                    className="text-lg font-semibold mb-3"
                    style={{ color: colorPalette.text.primary }}
                  >
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: colorPalette.secondary,
                          color: colorPalette.text.primary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg transition-colors hover:opacity-80"
                      style={{ 
                        backgroundColor: colorPalette.dark,
                        color: colorPalette.text.inverse
                      }}
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  )}
                  
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg transition-colors hover:opacity-80"
                      style={{ 
                        backgroundColor: colorPalette.accent,
                        color: colorPalette.text.inverse
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}