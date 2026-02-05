import { createContext, useContext, useState, useEffect, ReactNode,useLayoutEffect } from 'react';


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
  // const [themeMode, setThemeModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  // const [accentColor, setAccentColorState] = useState<AccentColor>(DEFAULT_ACCENT_COLOR);


  // Apply theme mode to document
  // useEffect(() => {
  //   const root = document.documentElement;
    
  //   if (themeMode === 'dark') {
  //     root.classList.add('theme-dark');
  //   } else {
  //     root.classList.remove('theme-dark');
  //   }
  // }, [themeMode]);

  // Apply accent color to CSS variable
  // useEffect(() => {
  //   document.documentElement.style.setProperty('--accent-color', accentColor);
  // }, [accentColor]);

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || DEFAULT_THEME_MODE;
  });
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    return (localStorage.getItem('accentColor') as AccentColor) || DEFAULT_ACCENT_COLOR;
  });
  

  useLayoutEffect(() => {
    const root = document.documentElement;
  
    if (themeMode === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);
  
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);
  


  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  // const resetTheme = () => {
  //   setThemeModeState(DEFAULT_THEME_MODE);
  //   setAccentColorState(DEFAULT_ACCENT_COLOR);
  // };

  const resetTheme = () => {
    setThemeModeState(DEFAULT_THEME_MODE);
    setAccentColorState(DEFAULT_ACCENT_COLOR);
    localStorage.removeItem('themeMode');
    localStorage.removeItem('accentColor');
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
