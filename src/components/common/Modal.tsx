import { clsx } from 'clsx';
import type { FC } from 'react';
import { Container } from './Container';

interface ModalProps {
  active?: boolean;
  children?: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ active = false, children }) => {
  return (
    <Container
      className={clsx(
        'fixed top-1/5 inset-0 z-20 flex items-center justify-center bg-transparent transition-opacity duration-300',
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      aria-modal="true"
      aria-hidden={!active}
    >
      {children}
    </Container>
  );
};
