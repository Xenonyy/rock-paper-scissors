import clsx from 'clsx';
import type { ExtendedChoices } from '../../../types/gameChoices';
import type { FC } from 'react';
import { Ring } from '../RPSConcentricRings';

interface RPSButtonProps {
  type: ExtendedChoices;
  onClick(type: ExtendedChoices): void;
  selected?: boolean;
  winner?: boolean;
}

const styleMap: Record<ExtendedChoices, string> = {
  rock: 'border-(--rock-border) shadow-[0_8px_0_0_var(--rock-shadow))]',
  paper: 'border-(--paper-border) shadow-[0_8px_0_0_var(--paper-shadow))]',
  scissors: 'border-(--scissors-border) shadow-[0_8px_0_0_var(--scissors-shadow))]',
  lizard: 'border-(--lizard-border) shadow-[0_8px_0_0_var(--lizard-shadow))]',
  spock: 'border-(--spock-border) shadow-[0_8px_0_0_var(--spock-shadow))]',
};

const iconMap: Record<ExtendedChoices, string> = {
  rock: 'icon-rock.svg',
  paper: 'icon-paper.svg',
  scissors: 'icon-scissors.svg',
  lizard: 'icon-lizard.svg',
  spock: 'icon-spock.svg',
};

export const RPSButton: FC<RPSButtonProps> = ({ type, onClick, selected, winner }) => {
  return (
    <div className="relative flex items-center justify-center ">
      {winner && (
        <>
          {process.env.NODE_ENV !== 'production' && console.log(winner, 'RPSbuttoncontainer')}
          <Ring className="w-[clamp(14rem,40vw,21rem)] h-[clamp(14rem,40vw,21rem)]" />
          <Ring className="w-[clamp(18rem,50vw,27rem)] h-[clamp(18rem,50vw,27rem)]" />
          <Ring className="w-[clamp(22rem,60vw,33rem)] h-[clamp(22rem,60vw,33rem)]" />
        </>
      )}

      <button
        aria-pressed={selected}
        onClick={() => onClick(type)}
        className={clsx(
          'relative z-10 rounded-full flex items-center justify-center aspect-square transition-transform duration-150 ease-in-out',
          styleMap[type],
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-darkBlue',
          selected
            ? 'w-[clamp(8rem,20vw,15rem)] border-[clamp(0.9rem,3vw,1.5rem)] scale-100'
            : 'w-[clamp(7rem,18vw,9.5rem)] border-[clamp(0.75rem,1.15vw,1rem)] scale-90 cursor-pointer hover:scale-105'
        )}
        type="button"
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-[inset_0_6px_4px_rgba(0,0,0,0.2)]">
          <img
            src={iconMap[type]}
            fetchPriority="high"
            decoding="async"
            alt={type}
            className={clsx(
              selected
                ? 'w-[clamp(2.5rem,6vw,5rem)] h-[clamp(2.5rem,6vw,5rem)]'
                : 'w-[clamp(2rem,5vw,3rem)] h-[clamp(2rem,5vw,3rem)]'
            )}
          />
        </div>
      </button>
    </div>
  );
};
