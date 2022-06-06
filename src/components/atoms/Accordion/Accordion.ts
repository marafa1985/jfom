import { SuffixedTagName } from '../../../../lib/types';
import { UpIcon } from '../../../shared/icons';
import { Badge } from '../Badge/Badge';
import { StoreList, stores } from '../StoreList/StoreList';
import './Accordion.scss';

let openState = true;

const AccordionSummary = (innerHTML?: string): SuffixedTagName => {
  const handleSummary = () => {
    const arrowSpanElement = document.querySelector('.Accordion__Arrow');
    if (arrowSpanElement) {
      arrowSpanElement.classList.toggle('up');
    }
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
        className: 'Accordion__Arrow',
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
  const handleOnToggle = () => {
    openState = !openState;
  };

  return {
    accordionDetails: {
      ontoggle: handleOnToggle,
      open: openState,
      ...AccordionSummary('Abholung im Store'),
      ...AccordionContent()
    }
  };
};
