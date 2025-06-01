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
        'non_selectable flex flex-col items-center transition-all duration-200 scale-75',
        'hover:scale-[80%] hover:drop-shadow-xl hover:text-white '
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imgSrc}
        alt={alt}
        className="w-11 h-11 md:w-12 md:h-12 mb-1 drop-shadow-md hover:drop-shadow-xl hover:text-white transition-all duration-200"
      />
      <Text text={label} className="text-sm md:text-base" />
    </a>
  );
};
