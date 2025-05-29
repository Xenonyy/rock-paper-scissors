import clsx from 'clsx';
import type { GameStage } from '../../../types/RPSState';
import type { RPSChoice } from '../../../types/RPSChoice';
import { RPSButton } from './RPSButton';
import { motion } from 'framer-motion';
import type { CalculateWinnerType } from '../../../utils/calculateWinner';
import { memo } from 'react';

interface RPSButtonAnimationProps {
  stage: GameStage;
  playerChoice: RPSChoice | null;
  computerChoice: RPSChoice | null;
  winner: CalculateWinnerType;
  handleRPSButtonClick: (type: RPSChoice) => Promise<void>;
}

const RPSButtonAnimationComponent = ({
  stage,
  playerChoice,
  computerChoice,
  winner,
  handleRPSButtonClick,
}: RPSButtonAnimationProps) => {
  const initialPositions: Record<RPSChoice, string> = {
    paper: 'top-0 left-0',
    scissors: 'top-0 right-0',
    rock: 'bottom-0 left-1/2 -translate-x-1/2',
  };

  const finalPlayerPosition = 'top-1/2 right-5/6 -translate-y-1/2';
  const finalComputerPosition = 'top-1/2 left-5/6 -translate-y-1/2';

  return (
    <>
      <img
        src="bg-triangle.svg"
        alt=""
        aria-hidden
        className={clsx('inset-0 m-auto w-60 h-60 z-0', {
          ['absolute']: stage === 'idle',
          ['hidden']: stage !== 'idle',
        })}
      />

      {(['rock', 'paper', 'scissors'] as RPSChoice[]).map((type) => {
        const isSelected = type === playerChoice;
        const shouldRender = stage === 'idle' || playerChoice === type;
        let finalClass: string = '';
        if (stage === 'idle') {
          finalClass = initialPositions[type];
        } else if (isSelected) {
          finalClass = finalPlayerPosition;
        }

        let animateProps = {};
        if (stage === 'animating') {
          animateProps = isSelected ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 };
        }

        return (
          shouldRender && (
            <motion.div
              key={type}
              className={clsx('absolute transition-all duration-500 origin-center', finalClass)}
              initial={{ opacity: 1, scale: 1 }}
              animate={animateProps}
              transition={{ duration: 0.2, ease: 'linear' }}
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
