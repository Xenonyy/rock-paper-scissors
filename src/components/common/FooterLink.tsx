import { Text } from './Text';
import clsx from 'clsx';

interface FooterLinkProps {
  href: string;
  imgSrc: string;
  alt: string;
  label: string;
}

export const FooterLink = ({ href, imgSrc, alt, label }: FooterLinkProps) => {
  return (
    <a
      className={clsx(
        'non_selectable flex flex-col items-center transition-all duration-200',
        'hover:scale-105 hover:drop-shadow-xl hover:text-white '
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imgSrc}
        alt={alt}
        className="w-12 h-12 mb-1 drop-shadow-md hover:drop-shadow-xl hover:text-white transition-all duration-200"
      />
      <Text text={label} />
    </a>
  );
};
