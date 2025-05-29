import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { GameMode } from '../types/gameModes';

type GameModeProps = {
  mode: GameMode;
  setMode: Dispatch<SetStateAction<GameMode>>;
};

const GameModeContext = createContext<GameModeProps | null>(null);

export const GameModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<GameMode>('classic');

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);
  return <GameModeContext value={value}>{children}</GameModeContext>;
};

export const useGameMode = () => {
  const context = useContext(GameModeContext);
  if (!context) throw new Error('useGameMode must be used within a WGameModeProvider');
  return context;
};
