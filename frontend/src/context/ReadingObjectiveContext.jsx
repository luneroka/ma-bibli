import React, { createContext, useState, useEffect } from 'react';

export const ReadingObjectiveContext = createContext({
  readingObjective: 0,
  setReadingObjective: () => {},
});

export const ReadingObjectiveProvider = ({ children }) => {
  // Initialize state from localStorage if available, otherwise default to 0.
  const [readingObjective, setReadingObjectiveState] = useState(() => {
    const storedObjective = localStorage.getItem('readingObjective');
    return storedObjective !== null ? Number(storedObjective) : 0;
  });

  // Update both state and localStorage whenever the reading objective changes.
  const setReadingObjective = (value) => {
    setReadingObjectiveState(value);
    localStorage.setItem('readingObjective', value);
  };

  return (
    <ReadingObjectiveContext.Provider
      value={{ readingObjective, setReadingObjective }}
    >
      {children}
    </ReadingObjectiveContext.Provider>
  );
};
