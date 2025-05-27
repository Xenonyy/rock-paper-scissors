import { useState } from 'react';
import type { RPSChoice } from '../../types/RPSChoice';
import type { GameStage } from '../../types/RPSState';
import { Box } from '../common/Box';
import { RPSButton } from './RPSButton';
import { getRandomComputerMove } from '../../utils/getRandomComputerMove';
import { calculateWinner } from '../../utils/calculateWinner';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Text } from '../common/Text';

const initialPositions: Record<RPSChoice, string> = {
  paper: 'top-0 left-0',
  scissors: 'top-0 right-0',
  rock: 'bottom-0 left-1/2 -translate-x-1/2',
};

const finalPlayerPosition = 'top-1/2 right-5/6 -translate-y-1/2';
const finalComputerPosition = 'top-1/2 left-5/6 -translate-y-1/2';

export const RPSButtonsContainer = () => {
  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [computerChoice, setComputerChoice] = useState<RPSChoice | null>(null);
  const [stage, setStage] = useState<GameStage>('idle');

  const handleRPSButtonClick = async (type: RPSChoice) => {
    if (stage !== 'idle') return;

    setPlayerChoice(type);
    setStage('animating');
    await new Promise((res) => setTimeout(res, 500));

    const computer = getRandomComputerMove();
    setComputerChoice(computer);
    setStage('reveal');
    await new Promise((res) => setTimeout(res, 200));

    setStage('result');
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setStage('idle');
  };

  const isVisible = stage === 'result';

  return (
    <>
      <Box className="mt-10 justify-center space-x-60 text-white text-2xl uppercase font-semibold tracking-wider w-full">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
          <Text text={`you picked ${playerChoice}`} className={clsx({ ['opacity-0']: !isVisible })} />
        </motion.span>

        <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
          <Text text={`the house picked ${computerChoice}`} className={clsx({ ['opacity-0']: !isVisible })} />
        </motion.span>
      </Box>
      <Box className="relative w-90 h-90 mx-auto">
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
          const finalClass = stage === 'idle' ? initialPositions[type] : isSelected ? finalPlayerPosition : '';

          return (
            shouldRender && (
              <motion.div
                key={type}
                className={clsx('absolute transition-all duration-500 origin-center', finalClass)}
                initial={{ opacity: 1, scale: 1 }}
                animate={
                  stage === 'animating' ? (isSelected ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 }) : {}
                }
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                <RPSButton selected={isSelected} type={type} onClick={handleRPSButtonClick} />
              </motion.div>
            )
          );
        })}

        {computerChoice && (
          <motion.div
            key={computerChoice}
            className={clsx('absolute transition-all', finalComputerPosition)}
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: 'linear' }}
          >
            <RPSButton type={computerChoice} onClick={() => {}} selected />
          </motion.div>
        )}

        {stage === 'result' && playerChoice && computerChoice && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 text-white text-lg flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            <Text
              text={calculateWinner(playerChoice, computerChoice)}
              className="uppercase text-4xl tracking-wider font-bold"
            />
            <button
              onClick={handleReset}
              className="bg-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
            >
              <Text
                text={'play again'}
                className={clsx('uppercase px-4 tracking-widest font-semibold', {
                  ['text-red-500']: calculateWinner(playerChoice, computerChoice) === 'you lose',
                  ['text-black']: calculateWinner(playerChoice, computerChoice) !== 'you lose',
                })}
              />
            </button>
          </motion.div>
        )}
      </Box>
    </>
  );
};
