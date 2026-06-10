

export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgSecondary: "var(--color-bg-secondary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    accentPrimary: "var(--color-accent-primary)",
    accentSuccess: "var(--color-accent-success)",
    accentError: "var(--color-accent-error)",
    borderPrimary: "var(--color-border-primary)",
  },
  spacing: {
    xs: "0.25rem",   
    sm: "0.5rem",    
    md: "1rem",      
    lg: "1.5rem",    
    xl: "2rem",      
    xxl: "3rem",     
  },
  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  fonts: {
    sans: "'Outfit', 'Inter', sans-serif",
  }
} as const;
