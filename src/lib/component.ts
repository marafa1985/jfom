import { SuffixedTagName } from './types';

type BadgeProps = {
  value: any;
  isDisabled?: boolean;
};

export const Text = (text: string): SuffixedTagName => {
  return {
    badgeButton: {
      'data-testid': 'text',
      innerHTML: text,
      placeholder: text
    }
  };
};

export const Component = ({
  value,
  isDisabled
}: BadgeProps): SuffixedTagName => {
  // console.log(value);

  return {
    badgeDiv: {
      'data-testid': 'badge',
      className: 'Badge' + (isDisabled ? ' Badge--disabled' : ''),
      innerHTML: value,
      ...Text('Hello'),
      arrowSpan: {
        className: '',
        accountNumber: {
          placeholder: ''
        }
      }
    }
  };
};
