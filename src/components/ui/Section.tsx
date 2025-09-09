import { type ReactNode, forwardRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  background?: 'default' | 'alternate';
  style?: CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className, fullHeight = false, background = 'default', style }, ref) => {
    const backgroundClasses = {
      default: '',
      alternate: '',
    };

    return (
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'relative',
          backgroundClasses[background],
          fullHeight ? 'min-h-screen' : 'py-16 md:py-24',
          className
        )}
        style={{
          backgroundColor: background === 'default' ? '#FFF5F2' : '#F5BABB',
          ...style
        }}
      >
        <div className="container mx-auto px-4">
          {children}
        </div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';