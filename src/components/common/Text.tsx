import type { FC } from 'react';

interface TextProps {
  className?: string;
  text: string | number;
}

export const Text: FC<TextProps> = ({ className = 'text-center', text }) => {
  return <span className={className}>{text}</span>;
};
