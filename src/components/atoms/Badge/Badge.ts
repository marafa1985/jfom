import { SuffixedTagName } from '../../../lib/types';
import './Badge.scss';

type BadgeProps = {
  value: any;
  isDisabled?: boolean;
};

type FC<P = {}> = (props: P) => SuffixedTagName;

export const Badge: FC<BadgeProps> = ({
  value,
  isDisabled
}: BadgeProps): SuffixedTagName => {
  return {
    badgeDiv: {
      className: 'Badge' + (isDisabled ? ' Badge--disabled' : ''),
      'data-testid': 'badge',
      innerHTML: value
    }
  };
};
