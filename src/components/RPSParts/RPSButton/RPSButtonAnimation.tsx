import clsx from 'clsx';
import type { GameStage } from '../../../types/RPSState';
import type { ExtendedChoices, StandardChoices } from '../../../types/gameChoices';
import { RPSButton } from './RPSButton';
import { AnimatePresence, motion } from 'framer-motion';
import type { CalculateWinnerType } from '../../../utils/calculateWinner';
import { memo } from 'react';
import { useGameMode } from '../../../contexts/GameModeContext';

interface RPSButtonAnimationProps {
  stage: GameStage;
  playerChoice: ExtendedChoices | null;
  computerChoice: ExtendedChoices | null;
  winner: CalculateWinnerType;
  handleRPSButtonClick: (type: ExtendedChoices) => Promise<void>;
}

const RPSButtonAnimationComponent = ({
  stage,
  playerChoice,
  computerChoice,
  winner,
  handleRPSButtonClick,
}: RPSButtonAnimationProps) => {
  const { mode } = useGameMode();

  const trianglePositions: Record<StandardChoices, string> = {
    paper: 'top-0 left-0 max-md:left-6',
    scissors: 'top-0 right-0 max-md:right-6',
    rock: 'bottom-0 max-md:bottom-6 left-1/2 -translate-x-1/2',
  };

  const pentagonPositions: Record<ExtendedChoices, string> = {
    paper: '-top-15 max-md:-top-3 left-1/2 -translate-x-1/2',
    scissors: 'top-1/5 max-md:top-1/4 -right-15 max-md:right-6',
    rock: '-bottom-15 max-md:bottom-5 max-md:left-[62%] left-2/3 -translate-x-2/6',
    lizard: '-bottom-15 max-md:bottom-5 max-md:left-[42%] left-1/3 -translate-x-4/5',
    spock: 'top-1/5 max-md:top-1/4 -left-15 max-md:left-6',
  };

  const pickOptions =
    mode === 'classic'
      ? (['rock', 'paper', 'scissors'] as StandardChoices[])
      : (['rock', 'paper', 'scissors', 'lizard', 'spock'] as ExtendedChoices[]);

  const backgroundImage = mode === 'classic' ? 'bg-triangle.svg' : 'bg-pentagon.svg';

  const finalPlayerPosition = 'top-1/2 left-10 sm:left-0 -translate-y-1/2 md:-translate-x-[80%]';
  const finalComputerPosition = 'top-1/2 right-10 sm:right-0 md:left-5/6 -translate-y-1/2';

  return (
    <>
      <img
        src={backgroundImage}
        alt=""
        aria-hidden
        className={clsx('inset-0 m-auto z-0', {
          ['absolute']: stage === 'idle',
          ['hidden']: stage !== 'idle',
          ['w-60 h-60 md:w-80 md:h-80 xl:w-100 xl:h-100']: mode === 'advanced',
          ['w-60 h-60 md:w-70 md:h-70']: mode === 'classic',
        })}
      />

      <AnimatePresence>
        {pickOptions.map((type) => {
          const isSelected = type === playerChoice;
          const shouldRender = stage === 'idle' || isSelected;

          let finalClass: string = '';
          if (stage === 'idle') {
            finalClass = mode === 'classic' ? trianglePositions[type as StandardChoices] : pentagonPositions[type];
          } else if (isSelected) {
            finalClass = finalPlayerPosition;
          }

          return (
            shouldRender && (
              <motion.div
                key={`${mode}-${type}`}
                className={clsx('absolute origin-center w-fit', finalClass)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                layout
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <RPSButton
                  winner={winner === playerChoice}
                  selected={isSelected}
                  type={type}
                  onClick={handleRPSButtonClick}
                />
              </motion.div>
            )
          );
        })}
      </AnimatePresence>

      {computerChoice && (
        <motion.div
          key={`computer-${computerChoice}`}
          className={clsx('absolute transition-all w-fit', finalComputerPosition)}
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, ease: 'linear' }}
        >
          <RPSButton winner={winner === computerChoice} type={computerChoice} onClick={() => {}} selected />
        </motion.div>
      )}
    </>
  );
};

export const RPSButtonAnimation = memo(RPSButtonAnimationComponent);
RPSButtonAnimation.displayName = 'RPSButtonAnimation';
