import { ScoreProvider } from './contexts/ScoreContext';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <ScoreProvider>
      <HomePage />
    </ScoreProvider>
  );
};
