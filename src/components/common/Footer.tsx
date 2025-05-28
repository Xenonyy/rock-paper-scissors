import { ProjectDetails } from '../../enums/projectDetails';

export const Footer = () => {
  return (
    <footer className="h-16 bg-violet-400 text-black/80 justify-around items-center flex flex-row">
      <span className=" font-medium drop-shadow-md">&copy;{ProjectDetails.year} Gonda Armand</span>
      <span className=" font-medium drop-shadow-md">{`Version: ${ProjectDetails.version}`}</span>
    </footer>
  );
};
