// Color Palette Configuration
// Ratios: #FFF5F2 (4) : #F5BABB (3) : #568F87 (2) : #064232 (1)

export const colorPalette = {
  // Primary colors with usage ratios
  primary: '#FFF5F2',     // 4 - Main background, dominant color
  secondary: '#F5BABB',   // 3 - Section backgrounds, cards
  accent: '#568F87',      // 2 - Interactive elements, highlights
  dark: '#064232',        // 1 - Text, borders, emphasis
  
  // Semantic color mappings
  background: {
    main: '#FFF5F2',
    alternate: '#F5BABB',
    card: '#FFF5F2',
    elevated: '#F5BABB',
  },
  
  text: {
    primary: '#064232',
    secondary: '#568F87',
    muted: '#568F87',
    inverse: '#FFF5F2',
  },
  
  interactive: {
    primary: '#568F87',
    hover: '#064232',
    active: '#064232',
    border: '#568F87',
  },
  
  skill: {
    ml: {
      bg: '#568F87',
      text: '#FFF5F2',
      border: '#064232',
    },
    programming: {
      bg: '#F5BABB',
      text: '#064232',
      border: '#568F87',
    },
    frameworks: {
      bg: '#568F87',
      text: '#FFF5F2', 
      border: '#064232',
    },
    tools: {
      bg: '#F5BABB',
      text: '#064232',
      border: '#568F87',
    },
  },
} as const;

// Utility function to get color with opacity
export const withOpacity = (color: string, opacity: number) => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};