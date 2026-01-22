import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <span role="img" aria-label="Dark mode">🌙</span>
      ) : (
        // Sun icon for light mode
        <span role="img" aria-label="Light mode">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;