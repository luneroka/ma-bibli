import React, { createContext, useState } from 'react';

export const ReadingObjectiveContext = createContext();

export const ReadingObjectiveProvider = ({ children }) => {
  const [readingObjective, setReadingObjective] = useState(0);

  return (
    <ReadingObjectiveContext.Provider
      value={{ readingObjective, setReadingObjective }}
    >
      {children}
    </ReadingObjectiveContext.Provider>
  );
};
