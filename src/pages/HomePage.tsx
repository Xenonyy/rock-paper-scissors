import { Box } from '../components/common/Box';
import { Container } from '../components/common/Container';
import { Text } from '../components/common/Text';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { RPSButton } from '../components/RPSButton/RPSButton';

export const HomePage = () => {
  const score = 12; // This should come from a state or props
  return (
    <DefaultLayout>
      <Container className="[background-image:radial-gradient(circle_at_top,_#354063,_#2c3450,_#15183b)] p-8">
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
        <Box className="flex gap-16 justify-center mt-14 ">
          <RPSButton type="paper" onClick={() => console.log('Paper')} />
          <RPSButton type="scissors" onClick={() => console.log('Scissors')} />
        </Box>
        <img src="bg-triangle.svg" alt="" aria-hidden className="relative z-0 h-48 w-48 -top-20 -mb-40" />
        <Box className="">
          <RPSButton type="rock" onClick={() => console.log('Rock')} />
        </Box>
      </Container>
    </DefaultLayout>
  );
};
