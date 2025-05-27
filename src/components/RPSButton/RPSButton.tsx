import clsx from 'clsx';

type RPSChoice = 'rock' | 'paper' | 'scissors';

interface RPSButtonProps {
  type: RPSChoice;
  onClick: () => void;
}

const styleMap: Record<RPSChoice, string> = {
  rock: 'border-red-400 shadow-[0_8px_0_0_rgba(199,36,48,1)]',
  paper: 'border-blue-400 shadow-[0_8px_0_0_rgba(46,86,255,1)]',
  scissors: 'border-yellow-400 shadow-[0_8px_0_0_rgba(255,159,10,1)]',
};

const iconMap: Record<RPSChoice, string> = {
  rock: 'icon-rock.svg',
  paper: 'icon-paper.svg',
  scissors: 'icon-scissors.svg',
};

export const RPSButton: React.FC<RPSButtonProps> = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-38 h-38 rounded-full border-16 flex items-center justify-center z-10',
        styleMap[type],
        'hover:scale-105 transition-transform duration-150 ease-in-out',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-darkBlue'
      )}
      type="button"
    >
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-[inset_0_6px_4px_rgba(0,0,0,0.2)]">
        <img src={iconMap[type]} alt={type} className="w-12 h-12" />
      </div>
    </button>
  );
};
