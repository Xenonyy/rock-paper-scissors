import { clsx } from 'clsx';
import { Modal } from '../common/Modal';
import { memo, type FC } from 'react';
import { Box } from '../common/Box';
import { CloseButton } from '../common/CloseButton';
import { Text } from '../common/Text';
import { useScrollLock } from '../../hooks/useScrollLock';

interface RulesModalProps {
  className?: string;
  src: string;
  active?: boolean;
  close?: () => void;
}

const RulesModalComponent: FC<RulesModalProps> = ({ className, src, active = false, close }) => {
  useScrollLock(active);
  if (!active) return null;

  return (
    <Modal active={active} onClose={close}>
      <Box className={clsx('mb-4 rounded-lg shadow-lg bg-white relative items-start p-10 flex-col', className)}>
        <Box className="flex-row justify-between w-full mb-6 md:mb-10">
          <Text text="rules" className="uppercase font-semibold text-xl md:text-3xl text-dark-text" />
          <CloseButton onClick={close} />
        </Box>
        <img src={src} alt="" aria-hidden />
      </Box>
    </Modal>
  );
};

export const RulesModal = memo(RulesModalComponent);
