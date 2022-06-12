import { diff } from '../../../lib/util/object';
import {
  getElementProps,
  updatedElement,
  SuffixedTagName
} from '../../../lib/types';
import { UpIcon } from '../../../shared/icons';
import { Badge } from '../Badge/Badge';
import { StoreList, stores } from '../StoreList/StoreList';
import './Accordion.scss';

const AccordionSummary = (
  handleOnToggle: () => void,
  openState: boolean,
  innerHTML?: string
): SuffixedTagName => {
  let newOpenState = openState;

  const handleSummary = () => {
    const oldState = AccordionSummary(handleOnToggle, newOpenState, innerHTML);
    newOpenState = !newOpenState;
    const newState = AccordionSummary(handleOnToggle, newOpenState, innerHTML);
    const diffInState = diff(oldState, newState);
    console.log(diffInState);
    const elementChildren = getElementProps(diffInState);
    elementChildren.forEach(child => updatedElement(child));
  };

  return {
    accordionSummarySummary: {
      onclick: handleSummary,
      className: 'Accordion__summary',
      headerDiv: {
        className: 'Summary__Header',
        titleH2: {
          className: 'Summary__Title',
          innerHTML
        },
        ...Badge({ value: 30, isDisabled: true })
      },
      arrowSpan: {
        className: 'Accordion__Arrow' + (newOpenState ? ' up' : ''),
        upIconImg: {
          src: UpIcon,
          alt: 'upIcon'
        }
      }
    }
  };
};

const AccordionContent = (): SuffixedTagName => ({
  storeInputSearch: {
    placeholder: 'Store suchen'
  },
  StoreMenuUl: {
    ...StoreList(stores)
  }
});

export const Accordion = (): SuffixedTagName => {
  let openState: boolean = true;

  const handleOnToggle = () => {
    openState = !openState;
  };

  return {
    accordionDetails: {
      open: openState,
      ...AccordionSummary(handleOnToggle, openState, 'Abholung im Store'),
      ...AccordionContent()
    }
  };
};
