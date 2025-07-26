import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

export const ReadingObjectiveContext = createContext({
  readingObjective: { objective: 0, timeframe: '' },
  setReadingObjective: () => {},
});

export const ReadingObjectiveProvider = ({ children }) => {
  const [readingObjective, setReadingObjectiveState] = useState({
    objective: 0,
    timeframe: '',
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdToken().then((token) => {
      fetch('/api/reading-objective', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setReadingObjectiveState(data))
        .catch(() =>
          setReadingObjectiveState({
            readingObjective: 0,
            objectiveStartDate: '',
          })
        );
    });
  }, [currentUser]);

  const setReadingObjective = async (value) => {
    if (!currentUser) return;
    const token = await currentUser.getIdToken();
    try {
      const res = await fetch('/api/reading-objective', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
      if (!res.ok) throw new Error('Failed to update reading objective');
      const data = await res.json();
      setReadingObjectiveState(data.readingObjective || value);
    } catch (err) {
      console.error({ message: 'Failed to set reading objective', err });
      setReadingObjectiveState(value);
    }
  };

  return (
    <ReadingObjectiveContext.Provider
      value={{ readingObjective, setReadingObjective }}
    >
      {children}
    </ReadingObjectiveContext.Provider>
  );
};

ReadingObjectiveProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
