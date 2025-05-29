import { GameModeProvider } from './contexts/GameModeContext';
import { ScoreProvider } from './contexts/ScoreContext';
import { WinnerProvider } from './contexts/WinnerContext';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <GameModeProvider>
      <ScoreProvider>
        <WinnerProvider>
          <HomePage />
        </WinnerProvider>
      </ScoreProvider>
    </GameModeProvider>
  );
};
