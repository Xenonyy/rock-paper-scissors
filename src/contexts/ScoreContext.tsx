import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type ScoreContextProps = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
};

const ScoreContext = createContext<ScoreContextProps | null>(null);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);
  const value = useMemo(() => ({ score, setScore }), [score, setScore]);
  return <ScoreContext value={value}>{children}</ScoreContext>;
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) throw new Error('useScore must be used within a ScoreProvider');
  return context;
};
