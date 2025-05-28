import type { FC } from 'react';

interface CloseButtonProps {
  onClick?: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className="cursor-pointer z-50 relative" onClick={onClick} aria-label="Close modal">
      <img
        src="icon-close.svg"
        alt=""
        aria-hidden
        className="filter brightness-80 hover:brightness-0 transition-all duration-150"
      />
    </button>
  );
};
