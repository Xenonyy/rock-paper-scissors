import { clsx } from 'clsx';
import type { FC } from 'react';

interface BoxProps {
  className: string;
  children: React.ReactNode;
}

export const Box: FC<BoxProps> = ({ className, children }) => {
  return <div className={clsx('flex items-center text-center', className)}>{children}</div>;
};
