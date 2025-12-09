import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook para obtener estilos CSS basados en el tema
 * @param lightStyles - Estilos para tema claro
 * @param darkStyles - Estilos para tema oscuro
 * @returns Estilos según el tema actual
 */
export function useThemedStyles<T>(lightStyles: T, darkStyles: T): T {
  const { theme } = useTheme();
  return useMemo(() => (theme === 'light' ? lightStyles : darkStyles), [theme, lightStyles, darkStyles]);
}

/**
 * Hook para obtener un valor específico basado en el tema
 * @param lightValue - Valor para tema claro
 * @param darkValue - Valor para tema oscuro
 * @returns Valor según el tema actual
 */
export function useThemedValue<T>(lightValue: T, darkValue: T): T {
  const { theme } = useTheme();
  return useMemo(() => (theme === 'light' ? lightValue : darkValue), [theme, lightValue, darkValue]);
}

/**
 * Hook para obtener una clase Tailwind condicional basada en el tema
 * Útil para estilos complejos con Tailwind CSS
 * @param lightClasses - Clases para tema claro
 * @param darkClasses - Clases para tema oscuro
 * @returns Clases según el tema actual
 */
export function useThemedClasses(lightClasses: string, darkClasses: string): string {
  const { theme } = useTheme();
  return useMemo(
    () => (theme === 'light' ? lightClasses : darkClasses),
    [theme, lightClasses, darkClasses]
  );
}
