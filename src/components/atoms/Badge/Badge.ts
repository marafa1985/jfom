import { SuffixedTagNameObject } from 'lib/types';
import './Badge.scss';

export const Badge = (
  value: any,
  isDisabled?: boolean
): SuffixedTagNameObject => {
  return {
    badgeDiv: {
      className: 'Badge' + (isDisabled ? ' Badge--disabled' : ''),
      'data-testid': 'badge',
      innerHTML: value
    }
  };
};
