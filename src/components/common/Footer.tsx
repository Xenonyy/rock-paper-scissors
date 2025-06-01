import { ProjectDetails } from '../../enums/projectDetails';
import { FooterLink } from './FooterLink';

export const Footer = () => {
  return (
    <footer className="h-25 bg-violet-400 text-black/80 justify-around items-center flex flex-wrap px-4 py-3 flex-col md:flex-row text-sm sm:text-base">
      <FooterLink href="https://github.com/Xenonyy" imgSrc="./github.png" alt="GitHub" label="Xenonyy" />
      <FooterLink
        href="https://www.linkedin.com/in/armand-gonda/"
        imgSrc="./linkedin.png"
        alt="LinkedIn"
        label="LinkedIn"
      />
      <span className="font-medium hover:text-white drop-shadow-md">&copy;{ProjectDetails.year} Gonda Armand</span>
      <span className="font-medium hover:text-white drop-shadow-md">{`Version: ${ProjectDetails.version}`}</span>
    </footer>
  );
};
