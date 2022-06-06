import { FC } from 'lib/component';
import './Badge.scss';

type BadgeProps = {
  value: any;
  isDisabled?: boolean;
};

export const Badge: FC<BadgeProps> = ({ value, isDisabled }) => {
  return {
    badgeDiv: {
      className: 'Badge' + (isDisabled ? ' Badge--disabled' : ''),
      'data-testid': 'badge',
      innerHTML: value
    }
  };
};
