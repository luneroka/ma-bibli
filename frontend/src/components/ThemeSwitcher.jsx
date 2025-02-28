import React, { useState, useEffect } from 'react';
import themes from '../assets/themes';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'default';
  });

  const applyTheme = (themeKey) => {
    const themeProperties = themes[themeKey];
    if (!themeProperties) {
      console.warn(`Theme "${themeKey}" not found. Falling back to default.`);
      return;
    }
    Object.entries(themeProperties).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div>
      <select
        id='theme-select'
        value={theme}
        onChange={handleThemeChange}
        className='focus:outline-none w-full bg-white-bg'
      >
        <option value='default'>Ma Bibli (défaut)</option>
        <option value='urbanIndus'>Urban Indus</option>
        <option value='spookyHalloween'>Spooky Halloween</option>
        <option value='coastalCalm'>Coastal Calm</option>
        <option value='vintageTouch'>Vintage Touch</option>
        <option value='tropicalPunch'>Tropical Punch</option>
        <option value='oceanBreeze'>Ocean Breeze</option>
        <option value='sunsetVibes'>Sunset Vibes</option>
        <option value='darkMode'>Dark Mode</option>
      </select>
    </div>
  );
}

export default ThemeSwitcher;
