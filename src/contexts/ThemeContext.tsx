import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeType } from '../constants/theme';

/**
 * Interfaz del contexto de tema
 */
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

/**
 * Crear el contexto
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Proveedor de tema
 * Gestiona el estado del tema y lo persiste en localStorage
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar tema guardado al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('vibratuner-theme') as ThemeType | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
    setIsLoaded(true);
  }, []);

  // Aplicar tema al documento HTML
  useEffect(() => {
    if (isLoaded) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('vibratuner-theme', theme);
    }
  }, [theme, isLoaded]);

  // Guardar tema en localStorage cuando cambia
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // No renderizar hasta que se cargue el tema del localStorage
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para usar el contexto de tema
 * @returns {ThemeContextType} Objeto con theme, toggleTheme y setTheme
 * @throws {Error} Si se usa fuera del proveedor de tema
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
}

