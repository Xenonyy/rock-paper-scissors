import { Box } from '../../common/Box';
import { RPSResult } from '../RPSResult';
import { RPSAnnouncement } from '../RPSAnnouncement';
import { useRPSGameLogic } from '../../../hooks/useRPSGameLogic';
import { RPSButtonAnimation } from './RPSButtonAnimation';

export const RPSButtonsWrapper = () => {
  const { computerChoice, playerChoice, handleGameStart, handleReset, stage, winner, rules } = useRPSGameLogic();
  return (
    <>
      <Box className="justify-center space-x-60 text-white text-2xl uppercase font-semibold tracking-wider w-full">
        <RPSAnnouncement playerChoice={playerChoice} computerChoice={computerChoice} stage={stage} />
      </Box>
      <Box className="relative w-90 h-90 mx-auto">
        <RPSButtonAnimation
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          stage={stage}
          handleRPSButtonClick={handleGameStart}
          winner={winner}
        />
        {stage === 'result' && playerChoice && computerChoice && (
          <RPSResult playerChoice={playerChoice} computerChoice={computerChoice} onReset={handleReset} rules={rules} />
        )}
      </Box>
    </>
  );
};
