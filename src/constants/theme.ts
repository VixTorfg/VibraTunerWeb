/**
 * Sistema de Temas - Constantes de diseño
 * Los colores se definen en src/index.css como CSS variables
 */

// Tipo para el tema
export type ThemeType = 'light' | 'dark';

/**
 * Tipografías
 * Definiciones de tamaños y pesos de fuente
 */
export const typography = {
  // Tamaños
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  } as const,

  // Pesos
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  } as const,

  // Alturas de línea
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  } as const,

  // Familias de fuentes
  fontFamily: {
    sans: '"Inter", "Segoe UI", "Helvetica Neue", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  } as const,
} as const;

/**
 * Espaciado
 * Escala de espacios en rem
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const;

/**
 * Tamaños de bordes redondeados
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

/**
 * Sombras
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

/**
 * Transiciones
 */
export const transitions = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  } as const,
  timingFunction: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  } as const,
} as const;

/**
 * Estilos de componentes reutilizables
 * Usa CSS variables en lugar de colores hardcodeados
 */
export const componentStyles = {
  button: {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors duration-200',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors duration-200',
  },
  card: 'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md',
  input: 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] rounded-md px-3 py-2',
} as const;

