import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import { colorPalette } from '../../utils/colors';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  glowEffect?: boolean;
  tiltEffect?: boolean;
  scaleEffect?: boolean;
  magneticEffect?: boolean;
}

export function InteractiveCard({
  children,
  className = '',
  glowEffect = true,
  tiltEffect = true,
  scaleEffect = true,
  magneticEffect = false,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: scaleEffect ? 1.05 : 1,
        z: 50,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${colorPalette.accent}40, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      
      {/* Magnetic cursor effect */}
      {magneticEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${useTransform(mouseX, [-1, 1], [0, 100])}% ${useTransform(mouseY, [-1, 1], [0, 100])}%, ${colorPalette.accent}20, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}

interface FloatingButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function FloatingButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
}: FloatingButtonProps) {
  const colors = {
    primary: {
      bg: colorPalette.accent,
      text: colorPalette.text.inverse,
      border: colorPalette.dark,
    },
    secondary: {
      bg: colorPalette.secondary,
      text: colorPalette.dark,
      border: colorPalette.accent,
    },
  };

  return (
    <motion.button
      className={`relative px-6 py-3 rounded-full font-semibold border-2 overflow-hidden ${className}`}
      style={{
        backgroundColor: colors[variant].bg,
        color: colors[variant].text,
        borderColor: colors[variant].border,
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors[variant].border}30, transparent 70%)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: 1.5,
          opacity: 1,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${colorPalette.primary}60, transparent 70%)`,
        }}
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
        }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface SkillTagProps {
  children: ReactNode;
  category: 'ml' | 'programming' | 'frameworks' | 'tools';
  className?: string;
}

export function SkillTag({ children, category, className = '' }: SkillTagProps) {
  const colors = colorPalette.skill[category];

  return (
    <motion.div
      className={`relative px-4 py-2 rounded-full border-2 cursor-pointer overflow-hidden ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
      whileHover={{
        scale: 1.1,
        y: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: colors.border,
        }}
        initial={{ scale: 1, opacity: 1 }}
        whileHover={{
          scale: 1.3,
          opacity: 0,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          backgroundColor: colors.border,
          filter: 'blur(8px)',
        }}
        whileHover={{
          opacity: 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10 font-semibold text-sm">
        {children}
      </span>
    </motion.div>
  );
}

interface ProjectCardHoverProps {
  children: ReactNode;
  className?: string;
  imageUrl?: string;
}

export function ProjectCardHover({ children, className = '' }: ProjectCardHoverProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      whileHover={{
        scale: 1.02,
        z: 50,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${colorPalette.accent}30, ${colorPalette.secondary}30)`,
          filter: 'blur(20px)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: colorPalette.accent }}
        animate={{
          y: [0, -10, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}