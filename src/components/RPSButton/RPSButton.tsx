import clsx from 'clsx';
import type { RPSChoice } from '../../types/RPSChoice';
import type { FC } from 'react';
import { Ring } from './ConcentricRings';

interface RPSButtonProps {
  type: RPSChoice;
  onClick(type: RPSChoice): void;
  selected?: boolean;
  winner?: boolean;
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

export const RPSButton: FC<RPSButtonProps> = ({ type, onClick, selected, winner }) => {
  return (
    <div className="relative flex items-center justify-center">
      {winner && (
        <>
          <Ring size="clamp(14rem,40vw,21rem)" />
          <Ring size="clamp(18rem,50vw,27rem)" delay={200} />
          <Ring size="clamp(22rem,60vw,33rem)" delay={500} />
        </>
      )}

      <button
        aria-pressed={selected}
        onClick={() => onClick(type)}
        className={clsx(
          'relative z-10 w-38 h-38 rounded-full border-16 flex items-center justify-center transition-transform duration-150 ease-in-out',
          styleMap[type],
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-darkBlue',
          {
            'w-60 h-60 border-28 hover:scale-100': selected,
            'cursor-pointer hover:scale-105': !selected,
          }
        )}
        type="button"
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-[inset_0_6px_4px_rgba(0,0,0,0.2)]">
          <img
            src={iconMap[type]}
            alt={type}
            className={clsx({
              'w-12 h-12': !selected,
              'w-24 h-24': selected,
            })}
          />
        </div>
      </button>
    </div>
  );
};
