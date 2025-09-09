import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colorPalette } from '../../utils/colors';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'health' | 'ml' | 'data' | 'neural';
  color: string;
  opacity: number;
}

interface FloatingParticlesProps {
  className?: string;
  count?: number;
  dataVisualization?: boolean;
  interactive?: boolean;
}

export function FloatingParticles({ 
  className = '', 
  count = 25, 
  dataVisualization = false,
  interactive = false 
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<DataPoint[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Data visualization color scheme
  const dataColors = {
    health: colorPalette.accent, // #568F87 - Health ML data
    ml: colorPalette.secondary, // #F5BABB - General ML data  
    data: colorPalette.dark, // #064232 - Raw data points
    neural: colorPalette.text.secondary, // #568F87 - Neural network data
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const newParticles: DataPoint[] = Array.from({ length: count }, (_, index) => {
      const types: Array<'health' | 'ml' | 'data' | 'neural'> = ['health', 'ml', 'data', 'neural'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      return {
        id: index,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: dataVisualization ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        type,
        color: dataColors[type],
        opacity: Math.random() * 0.4 + 0.3,
      };
    });

    setParticles(newParticles);
  }, [count, dimensions, dataVisualization]);

  if (!dataVisualization) {
    // Simple floating particles for non-data visualization contexts
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: colorPalette.accent,
              opacity: 0.4,
            }}
            initial={{
              x: Math.random() * (dimensions.width || 1000),
              y: Math.random() * (dimensions.height || 800),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * (dimensions.width || 1000),
              y: Math.random() * (dimensions.height || 800),
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  // Advanced data visualization particles
  return (
    <div className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
          }}
          animate={{
            x: [
              particle.x,
              particle.x + particle.vx * 200,
              particle.x + particle.vx * 400,
              particle.x,
            ],
            y: [
              particle.y,
              particle.y + particle.vy * 200,
              particle.y + particle.vy * 400,
              particle.y,
            ],
            scale: [0, 1, 1, 0.8, 1],
            opacity: [0, particle.opacity, particle.opacity * 0.8, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
          whileHover={interactive ? {
            scale: 1.5,
            opacity: 0.8,
            transition: { duration: 0.2 }
          } : undefined}
        />
      ))}
      
      {/* Data connection lines for visualization effect */}
      {dataVisualization && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {particles.slice(0, 8).map((particle, index) => {
            const nextParticle = particles[(index + 1) % Math.min(8, particles.length)];
            if (!nextParticle) return null;
            
            return (
              <motion.line
                key={`connection-${index}`}
                x1={particle.x}
                y1={particle.y}
                x2={nextParticle.x}
                y2={nextParticle.y}
                stroke={colorPalette.accent}
                strokeWidth="0.5"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}