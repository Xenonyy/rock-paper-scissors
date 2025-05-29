import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { GameStage } from '../types/RPSState';

type GameStageProps = {
  stage: GameStage;
  setStage: Dispatch<SetStateAction<GameStage>>;
};

const GameStageContext = createContext<GameStageProps | null>(null);

export const GameStageProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<GameStage>('idle');

  const value = useMemo(() => ({ stage, setStage }), [stage, setStage]);
  return <GameStageContext value={value}>{children}</GameStageContext>;
};

export const useGameStage = () => {
  const context = useContext(GameStageContext);
  if (!context) throw new Error('useGameStage must be used within a WGameStageProvider');
  return context;
};
