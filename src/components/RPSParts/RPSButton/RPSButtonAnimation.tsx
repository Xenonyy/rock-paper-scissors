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
    paper: 'top-0 left-0',
    scissors: 'top-0 right-0',
    rock: 'bottom-0 left-1/2 -translate-x-1/2',
  };

  const pentagonPositions: Record<ExtendedChoices, string> = {
    paper: '-top-15 left-1/2 -translate-x-1/2',
    scissors: 'top-1/5 -right-15',
    rock: '-bottom-15 left-2/3 -translate-x-2/6',
    lizard: '-bottom-15 left-1/3 -translate-x-4/5',
    spock: 'top-20 top-1/4 -left-15',
  };

  const pickOptions =
    mode === 'classic'
      ? (['rock', 'paper', 'scissors'] as StandardChoices[])
      : (['rock', 'paper', 'scissors', 'lizard', 'spock'] as ExtendedChoices[]);

  const backgroundImage = mode === 'classic' ? 'bg-triangle.svg' : 'bg-pentagon.svg';

  const finalPlayerPosition = 'top-1/2 right-5/6 -translate-y-1/2';
  const finalComputerPosition = 'top-1/2 left-5/6 -translate-y-1/2';

  return (
    <>
      <img
        src={backgroundImage}
        alt=""
        aria-hidden
        className={clsx('inset-0 m-auto z-0', {
          ['absolute']: stage === 'idle',
          ['hidden']: stage !== 'idle',
          ['w-100 h-100']: mode === 'advanced',
          ['w-70 h-70']: mode === 'classic',
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
                className={clsx('absolute origin-center', finalClass)}
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
          className={clsx('absolute transition-all', finalComputerPosition)}
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
