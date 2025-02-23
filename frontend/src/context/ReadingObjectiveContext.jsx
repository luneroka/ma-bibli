import React, { createContext, useState } from 'react';

export const ReadingObjectiveContext = createContext({
  readingObjective: { objective: 0, timeframe: '' },
  setReadingObjective: () => {},
});

export const ReadingObjectiveProvider = ({ children }) => {
  const [readingObjective, setReadingObjectiveState] = useState(() => {
    const stored = localStorage.getItem('readingObjective');
    return stored ? JSON.parse(stored) : { objective: 0, timeframe: '' };
  });

  const setReadingObjective = (value) => {
    setReadingObjectiveState(value);
    localStorage.setItem('readingObjective', JSON.stringify(value));
  };

  return (
    <ReadingObjectiveContext.Provider
      value={{ readingObjective, setReadingObjective }}
    >
      {children}
    </ReadingObjectiveContext.Provider>
  );
};
