import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Text } from '../common/Text';
import type { GameStage } from '../../types/RPSState';
import type { ExtendedChoices } from '../../types/gameChoices';
import { memo } from 'react';
import { Box } from '../common/Box';

interface RPSAnnoucementProps {
  stage: GameStage;
  playerChoice: ExtendedChoices | null;
  computerChoice: ExtendedChoices | null;
}

const RPSAnnouncementComponent = ({ stage, playerChoice, computerChoice }: RPSAnnoucementProps) => {
  const isVisible = stage === 'result';

  return (
    <Box className="mt-4 md:mt-10 text-sm md:text-2xl max-md:w-5/6 text-center justify-center md:space-x-60">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
        <Text text={`you picked ${playerChoice}`} className={clsx({ 'opacity-0': !isVisible })} />
      </motion.span>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1 }}>
        <Text text={`the house picked ${computerChoice}`} className={clsx({ 'opacity-0': !isVisible })} />
      </motion.span>
    </Box>
  );
};

export const RPSAnnouncement = memo(RPSAnnouncementComponent);
RPSAnnouncement.displayName = 'RPSAnnouncement';
