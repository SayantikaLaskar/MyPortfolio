import { motion } from 'framer-motion';
import type { Skill } from '../../types';
import { cn } from '../../utils/cn';
import { colorPalette } from '../../utils/colors';

interface SkillTagProps {
  skill: Skill;
  index: number;
}

const getCategoryStyle = (category: string) => {
  const styles = colorPalette.skill[category as keyof typeof colorPalette.skill];
  return {
    backgroundColor: styles.bg,
    color: styles.text,
    borderColor: styles.border,
  };
};

const proficiencyIndicator = {
  beginner: '●',
  intermediate: '●●',
  advanced: '●●●',
  expert: '●●●●',
};

export function SkillTag({ skill, index }: SkillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: 'easeOut'
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
        'border backdrop-blur-sm hover:shadow-md transition-all duration-200'
      )}
      style={getCategoryStyle(skill.category)}
    >
      <span>{skill.name}</span>
      <span 
        className="text-xs opacity-70" 
        title={`Proficiency: ${skill.proficiency}`}
      >
        {proficiencyIndicator[skill.proficiency]}
      </span>
    </motion.div>
  );
}