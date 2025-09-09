import { motion } from 'framer-motion';
import { colorPalette } from '../../utils/colors';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface ProjectFilterProps {
  categories: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function ProjectFilter({ categories, activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
          style={{
            backgroundColor: activeFilter === category.id 
              ? colorPalette.accent 
              : colorPalette.background.card,
            color: activeFilter === category.id 
              ? colorPalette.text.inverse 
              : colorPalette.text.primary,
            border: `1px solid ${activeFilter === category.id 
              ? colorPalette.accent 
              : colorPalette.interactive.border}`
          }}
        >
          {category.label}
          <span 
            className="ml-2 text-xs"
            style={{
              color: activeFilter === category.id 
                ? colorPalette.text.inverse 
                : colorPalette.text.secondary
            }}
          >
            ({category.count})
          </span>
        </motion.button>
      ))}
    </div>
  );
}