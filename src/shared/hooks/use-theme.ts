import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Obtener el tema guardado del localStorage o usar 'system' por defecto
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    return storedTheme || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remover clases anteriores
    root.classList.remove('light', 'dark');

    let effectiveTheme: 'light' | 'dark';

    if (theme === 'system') {
      // Detectar preferencia del sistema
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      effectiveTheme = systemTheme;
    } else {
      effectiveTheme = theme;
    }

    // Aplicar la clase correspondiente
    root.classList.add(effectiveTheme);

    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
