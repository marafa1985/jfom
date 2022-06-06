import { SuffixedTagNameObject } from './types';

export type FC<P = {}> = {
  (props: P): SuffixedTagNameObject | null;
};

type BadgeProps = {
  value: any;
  isDisabled?: boolean;
};

export const Component: FC<BadgeProps> = ({ value, isDisabled }) => {
  return {
    badgeDiv: {
      className: 'Badge' + (isDisabled ? ' Badge--disabled' : ''),
      'data-testid': 'badge',
      innerHTML: value
    }
  };
};
