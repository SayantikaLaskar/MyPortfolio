import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colorPalette } from '../../utils/colors';

interface DataStream {
  id: string;
  path: string;
  color: string;
  type: 'health' | 'vision' | 'nlp' | 'general';
  speed: number;
  particles: number;
}

interface DataFlowAnimationProps {
  className?: string;
  streams?: number;
  animated?: boolean;
}

export function DataFlowAnimation({ 
  className = '', 
  streams = 4, 
  animated = true 
}: DataFlowAnimationProps) {
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Color-coded data types
  const streamColors = {
    health: colorPalette.accent, // #568F87 - Health ML
    vision: colorPalette.secondary, // #F5BABB - Computer Vision
    nlp: colorPalette.dark, // #064232 - NLP
    general: colorPalette.text.secondary, // #568F87 - General ML
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Math.min(window.innerWidth, 800),
        height: Math.min(window.innerHeight, 600),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const types: Array<'health' | 'vision' | 'nlp' | 'general'> = ['health', 'vision', 'nlp', 'general'];
    
    const newStreams: DataStream[] = Array.from({ length: streams }, (_, index) => {
      const type = types[index % types.length];
      const startX = (dimensions.width / (streams + 1)) * (index + 1);
      const controlX1 = startX + (Math.random() - 0.5) * 200;
      const controlY1 = dimensions.height * 0.3 + (Math.random() - 0.5) * 100;
      const controlX2 = startX + (Math.random() - 0.5) * 200;
      const controlY2 = dimensions.height * 0.7 + (Math.random() - 0.5) * 100;
      const endX = startX + (Math.random() - 0.5) * 100;
      
      // Create smooth bezier curve path
      const path = `M ${startX} 0 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${dimensions.height}`;
      
      return {
        id: `stream-${index}`,
        path,
        color: streamColors[type],
        type,
        speed: Math.random() * 3 + 2,
        particles: Math.floor(Math.random() * 3) + 2,
      };
    });

    setDataStreams(newStreams);
  }, [streams, dimensions]);

  if (!animated) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Stream paths */}
        {dataStreams.map((stream) => (
          <g key={stream.id}>
            {/* Base path */}
            <motion.path
              d={stream.path}
              stroke={stream.color}
              strokeWidth="2"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: Math.random() * 1,
                ease: "easeInOut",
              }}
            />
            
            {/* Animated data particles */}
            {Array.from({ length: stream.particles }).map((_, particleIndex) => (
              <motion.circle
                key={`${stream.id}-particle-${particleIndex}`}
                r="3"
                fill={stream.color}
                opacity="0.8"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: stream.speed,
                  repeat: Infinity,
                  delay: particleIndex * (stream.speed / stream.particles),
                  ease: "linear",
                }}
                style={{
                  offsetPath: `path('${stream.path}')`,
                  filter: `drop-shadow(0 0 4px ${stream.color})`,
                }}
              />
            ))}
            
            {/* Pulsing effect at start */}
            <motion.circle
              cx={dataStreams.length > 0 ? parseFloat(stream.path.split(' ')[1]) : 0}
              cy="0"
              r="6"
              fill={stream.color}
              opacity="0.6"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          </g>
        ))}
        
        {/* Data processing nodes */}
        {[0.3, 0.7].map((position, index) => (
          <g key={`node-${index}`}>
            <motion.circle
              cx={dimensions.width / 2}
              cy={dimensions.height * position}
              r="8"
              fill={colorPalette.dark}
              stroke={colorPalette.accent}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                strokeWidth: [2, 4, 2],
              }}
              transition={{
                scale: { duration: 0.5, delay: index * 0.3 },
                strokeWidth: { 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 1 
                },
              }}
            />
            
            {/* Processing indicator */}
            <motion.circle
              cx={dimensions.width / 2}
              cy={dimensions.height * position}
              r="12"
              fill="none"
              stroke={colorPalette.accent}
              strokeWidth="1"
              opacity="0.5"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.75,
              }}
            />
          </g>
        ))}
        
        {/* Data labels */}
        <text
          x={dimensions.width / 2}
          y="30"
          textAnchor="middle"
          fill={colorPalette.text.secondary}
          fontSize="12"
          fontWeight="500"
        >
          .
        </text>
        <text
          x={dimensions.width / 2}
          y={dimensions.height - 10}
          textAnchor="middle"
          fill={colorPalette.text.secondary}
          fontSize="12"
          fontWeight="500"
        >
          .
        </text>
      </svg>
    </div>
  );
}