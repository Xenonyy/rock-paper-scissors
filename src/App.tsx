import { ScoreProvider } from './contexts/ScoreContext';
import { WinnerProvider } from './contexts/WinnerContext';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <ScoreProvider>
      <WinnerProvider>
        <HomePage />
      </WinnerProvider>
    </ScoreProvider>
  );
};
