import { useCallback, useState } from 'react';
import { Box } from '../components/common/Box';
import { Container } from '../components/common/Container';
import { Text } from '../components/common/Text';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import clsx from 'clsx';
import { RulesModal } from '../components/RulesModal/RulesModal';
import { RPSButtonsWrapper } from '../components/RPSParts/RPSButton/RPSButtonsWrapper';
import { useScore } from '../contexts/ScoreContext';
import { useGameMode } from '../contexts/GameModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStage } from '../contexts/GameStateContext';

export const HomePage = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalActive(true), []);
  const handleModalClose = useCallback(() => setIsModalActive(false), []);

  const { score } = useScore();
  const { mode, setMode } = useGameMode();

  const handleGameModeSwitch = () => {
    setMode((prev) => (prev === 'classic' ? 'advanced' : 'classic'));
  };

  const { stage } = useGameStage();

  return (
    <DefaultLayout>
      <Container
        className={clsx('[background-image:radial-gradient(circle_at_top,_#354063,_#2c3450,_#15183b)] p-4', {
          'opacity-10 pointer-events-none': isModalActive,
        })}
      >
        <Box
          className={clsx(
            'uppercase font-semibold border-solid border-3 border-gray-500 rounded-2xl justify-between px-6 py-4',
            'w-3/4 sm:w-fit lg:w-[60%] xl:w-[40%] md:items-center flex-col gap-2 md:gap-4 text-xl md:text-3xl md:flex-row'
          )}
        >
          <Box className="flex-col items-start justify-center relative md:w-40 md:h-32 w-32 h-28">
            <AnimatePresence mode="wait">
              {mode === 'classic' && (
                <motion.img
                  key="classic-logo"
                  src="logo.svg"
                  alt="default mode"
                  className="md:w-40 w-32"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              {mode === 'advanced' && (
                <motion.img
                  key="advanced-logo"
                  src="logo-bonus.svg"
                  alt="extended mode"
                  className="md:w-32 md:h-32 w-28 h-28"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
          </Box>
          <button
            className="not-disabled:cursor-pointer uppercase font-semibold md:text-2xl border-solid border-3 disabled:border-red-400 disabled:opacity-40 not-disabled:hover:border-gray-300 transition-all duration-300 border-gray-500 rounded-2xl md:py-2 md:px-6 text-lg px-4 py-1"
            onClick={handleGameModeSwitch}
            disabled={stage !== 'idle'}
          >
            <Text text="switch" />
          </button>
          <Box className="md:w-32 md:h-24 bg-white rounded-2xl flex-col items-center justify-center text-gray-500 text-base w-24 h-20">
            <Text text="score" className="font-thin tracking-widest md:text-base text-xs" />
            <Text text={score} className="font-bold md:text-5xl text-3xl" />
          </Box>
        </Box>
        <RPSButtonsWrapper />
        <Box className="justify-end w-full max-sm:px-10 ">
          <button
            className="cursor-pointer uppercase font-semibold tracking-widest border-solid border-3 hover:border-gray-300 transition-all duration-300 border-gray-500 rounded-2xl py-2 md:px-8 px-4 text-sm md:text-base mt-15 md:mt-0"
            onClick={handleModalOpen}
          >
            <Text text="Rules" />
          </button>
        </Box>
      </Container>
      <RulesModal
        src={mode === 'classic' ? 'image-rules.svg' : 'image-rules-bonus.svg'}
        active={isModalActive}
        close={handleModalClose}
      />
    </DefaultLayout>
  );
};
