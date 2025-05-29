import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Text } from '../common/Text';
import type { GameStage } from '../../types/RPSState';
import type { RPSChoice } from '../../types/RPSChoice';
import { memo } from 'react';

interface RPSAnnoucementProps {
  stage: GameStage;
  playerChoice: RPSChoice | null;
  computerChoice: RPSChoice | null;
}

const RPSAnnouncementComponent = ({ stage, playerChoice, computerChoice }: RPSAnnoucementProps) => {
  const isVisible = stage === 'result';

  return (
    <div className="mt-10 justify-center space-x-60 text-white text-2xl uppercase font-semibold tracking-wider w-full flex">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
        <Text text={`you picked ${playerChoice}`} className={clsx({ 'opacity-0': !isVisible })} />
      </motion.span>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
        <Text text={`the house picked ${computerChoice}`} className={clsx({ 'opacity-0': !isVisible })} />
      </motion.span>
    </div>
  );
};

export const RPSAnnouncement = memo(RPSAnnouncementComponent);
RPSAnnouncement.displayName = 'RPSAnnouncement';
