import { useState } from 'react';
import { Box } from '../components/common/Box';
import { Container } from '../components/common/Container';
import { Text } from '../components/common/Text';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import clsx from 'clsx';
import { RulesModal } from '../components/RulesModal/RulesModal';
import { RPSButtonsContainer } from '../components/RPSButton/RPSButtonsContainer';
import { useScore } from '../contexts/ScoreContext';

export const HomePage = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleModalOpen = () => setIsModalActive(true);
  const handleModalClose = () => setIsModalActive(false);

  const { score } = useScore();

  return (
    <DefaultLayout>
      <Container
        className={clsx('[background-image:radial-gradient(circle_at_top,_#354063,_#2c3450,_#15183b)] p-8', {
          'opacity-10 pointer-events-none': isModalActive,
        })}
      >
        <Box className="uppercase font-semibold text-3xl w-[40%] border-solid border-3 border-gray-500 rounded-2xl flex-row justify-between px-6 py-4">
          <Box className="flex-col items-start">
            <Text text="Rock" />
            <Text text="Paper" className="-my-3" />
            <Text text="Scissors" />
          </Box>
          <Box className="w-32 h-24 bg-white rounded-2xl flex-col items-center justify-center text-gray-500 text-base">
            <Text text="score" className="font-thin tracking-widest" />
            <Text text={score} className="font-bold text-5xl" />
          </Box>
        </Box>
        <RPSButtonsContainer />
        <Box className="justify-end w-full">
          <button
            className="cursor-pointer uppercase font-semibold tracking-widest border-solid border-3 hover:border-gray-300 transition-all duration-300 border-gray-500 rounded-2xl py-2 px-8"
            onClick={handleModalOpen}
          >
            <Text text="Rules" />
          </button>
        </Box>
      </Container>
      <RulesModal src="image-rules.svg" active={isModalActive} close={handleModalClose} />
    </DefaultLayout>
  );
};
