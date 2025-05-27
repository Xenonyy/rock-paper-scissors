import { clsx } from 'clsx';
import { Modal } from '../common/Modal';
import type { FC } from 'react';
import { Box } from '../common/Box';
import { CloseButton } from '../common/CloseButton';
import { Text } from '../common/Text';

interface RulesModalProps {
  className?: string;
  src: string;
  active?: boolean;
  close?: () => void;
}

export const RulesModal: FC<RulesModalProps> = ({ className, src, active = false, close }) => {
  return (
    <Modal active={active}>
      <Box className={clsx('mb-4 rounded-lg shadow-lg bg-white relative items-start p-10 flex-col', className)}>
        <Box className={clsx('flex-row justify-between w-full mb-10', className)}>
          <Text text="rules" className="uppercase font-semibold text-3xl text-gray-700" />
          <CloseButton onClick={close} />
        </Box>
        <img src={src} alt="" aria-hidden />
      </Box>
    </Modal>
  );
};
