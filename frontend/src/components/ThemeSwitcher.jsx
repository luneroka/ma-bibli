//// filepath: /Users/Yoann/Documents/Coding/Projects/ma-bibli/frontend/src/components/ThemeSwitcher.jsx
import React, { useState, useEffect } from 'react';

const themes = {
  default: {
    '--color-main-blue': '#3e4c74',
    '--color-primary-btn': '#f76c5e',
    '--color-secondary-btn': '#5b8fa1',
    '--color-white-bg': '#f9f9f9',
  },
  urbanIndus: {
    '--color-main-blue': '#4A5568',
    '--color-primary-btn': '#ED64A6',
    '--color-secondary-btn': '#68D391',
    '--color-white-bg': '#F7FAFC',
  },
  spookyHalloween: {
    '--color-main-blue': '#512E5F',
    '--color-primary-btn': '#F39C12',
    '--color-secondary-btn': '#2980B9',
    '--color-white-bg': '#FDFEFE',
  },
  coastalCalm: {
    '--color-main-blue': '#34495E',
    '--color-primary-btn': '#1ABC9C',
    '--color-secondary-btn': '#F1C40F',
    '--color-white-bg': '#FDFEFE',
  },
  vintageTouch: {
    '--color-main-blue': '#5D6D7E',
    '--color-primary-btn': '#E67E22',
    '--color-secondary-btn': '#85C1E9',
    '--color-white-bg': '#F8F9F9',
  },
  tropicalPunch: {
    '--color-main-blue': '#0A3D62',
    '--color-primary-btn': '#F8C291',
    '--color-secondary-btn': '#82CCDD',
    '--color-white-bg': '#FFF8E1',
  },
};

function ThemeSwitcher() {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (themeKey) => {
    const themeProperties = themes[themeKey];
    Object.entries(themeProperties).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className='p-4'>
      <label htmlFor='theme-select' className='mr-2'>
        Theme:
      </label>
      <select
        id='theme-select'
        value={theme}
        onChange={handleThemeChange}
        className='p-2 border rounded'
      >
        <option value='default'>Default</option>
        <option value='deepForest'>Deep Forest</option>
        <option value='sunsetGlow'>Sunset Glow</option>
        <option value='coastalCalm'>Coastal Calm</option>
        <option value='vintageTouch'>Vintage Touch</option>
      </select>
    </div>
  );
}

export default ThemeSwitcher;
