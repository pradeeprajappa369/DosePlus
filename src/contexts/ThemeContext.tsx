import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';
type AccentColor = '#2563EB' | '#16A34A' | '#7C3AED' | '#EA580C' | '#DC2626';

interface ThemeContextType {
  themeMode: ThemeMode;
  accentColor: AccentColor;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_THEME_MODE: ThemeMode = 'light';
const DEFAULT_ACCENT_COLOR: AccentColor = '#2563EB';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [accentColor, setAccentColorState] = useState<AccentColor>(DEFAULT_ACCENT_COLOR);

  // Apply theme mode to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (themeMode === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  }, [themeMode]);

  // Apply accent color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  const resetTheme = () => {
    setThemeModeState(DEFAULT_THEME_MODE);
    setAccentColorState(DEFAULT_ACCENT_COLOR);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        accentColor,
        setThemeMode,
        setAccentColor,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
