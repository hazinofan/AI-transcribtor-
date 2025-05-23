import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType 
{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => 
{
  const context = useContext(ThemeContext);
  if (context === undefined) 
  {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => 
{
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => 
  {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) 
    {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => 
  {
    // Apply theme to document body
    if (isDarkMode) 
    {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } 
    else 
    {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => 
  {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 