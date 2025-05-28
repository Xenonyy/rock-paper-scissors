import type { RPSChoice } from '../../types/RPSChoice';
import { calculateOutcome } from '../../utils/calculateOutcome';
import { motion } from 'framer-motion';
import { Text } from '../common/Text';
import clsx from 'clsx';

interface RPSResultProps {
  playerChoice: RPSChoice;
  computerChoice: RPSChoice;
  onReset: () => void;
}

export const RPSResult = ({ playerChoice, computerChoice, onReset }: RPSResultProps) => {
  const result = calculateOutcome(playerChoice, computerChoice);

  return (
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 text-white text-lg flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Text text={String(result)} className="uppercase text-4xl tracking-wider font-bold" />
      <button
        onClick={onReset}
        className="bg-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
      >
        <Text
          text="play again"
          className={clsx('uppercase px-4 tracking-widest font-semibold', {
            ['text-red-500']: result === 'you lose',
            ['text-black']: result !== 'you lose',
          })}
        />
      </button>
    </motion.div>
  );
};
