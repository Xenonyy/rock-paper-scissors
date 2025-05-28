import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { CalculateWinnerType } from '../utils/calculateWinner';

type WinnerContextProps = {
  winner: CalculateWinnerType;
  setWinner: Dispatch<SetStateAction<CalculateWinnerType>>;
};

const WinnerContext = createContext<WinnerContextProps | null>(null);

export const WinnerProvider = ({ children }: { children: ReactNode }) => {
  const [winner, setWinner] = useState<CalculateWinnerType>('draw');
  const value = useMemo(() => ({ winner, setWinner }), [winner, setWinner]);
  return <WinnerContext value={value}>{children}</WinnerContext>;
};

export const useWinner = () => {
  const context = useContext(WinnerContext);
  if (!context) throw new Error('useWinner must be used within a WinnerProvider');
  return context;
};
