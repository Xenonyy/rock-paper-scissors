import { GameModeProvider } from './contexts/GameModeContext';
import { GameStageProvider } from './contexts/GameStateContext';
import { ScoreProvider } from './contexts/ScoreContext';
import { WinnerProvider } from './contexts/WinnerContext';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <GameModeProvider>
      <GameStageProvider>
        <ScoreProvider>
          <WinnerProvider>
            <HomePage />
          </WinnerProvider>
        </ScoreProvider>
      </GameStageProvider>
    </GameModeProvider>
  );
};
