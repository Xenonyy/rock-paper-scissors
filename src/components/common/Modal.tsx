import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { Container } from './Container';

interface ModalProps {
  active?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ active, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onClose]);

  return (
    <Container
      className={clsx(
        'fixed top-1/5 inset-0 z-20 flex items-center justify-center transition-opacity duration-300',
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      aria-modal="true"
      aria-hidden={!active}
    >
      <div ref={modalRef}>{children}</div>
    </Container>
  );
};
