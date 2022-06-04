import { render, SuffixedTagNameObject } from '../../../../lib/types';
import { UpIcon } from '../../../shared/icons';
import { Badge } from '../Badge/Badge';
import { StoreList, stores } from '../StoreList/StoreList';
import './Accordion.scss';

const accordionState = {
  open: false
};

const rerender = (currentTarget: HTMLElement) => {
  const elementParent = currentTarget.parentElement;

  if (currentTarget.id) {
    const currentNode = document.getElementById(currentTarget.id);
    currentNode && elementParent && elementParent.removeChild(currentNode);
  }

  render(
    AccordionSummary('Abholung im Store'),
    elementParent?.id ? document.getElementById(elementParent.id) : null
  );
};

const AccordionSummary = (innerHTML: string): SuffixedTagNameObject => {
  function onToggle(ev: MouseEvent) {
    accordionState.open = !accordionState.open;
    ev.currentTarget && rerender(ev.currentTarget as HTMLElement);
  }

  return {
    accordionSummarySummary: {
      onclick: onToggle,
      className: 'Accordion__summary',
      headerDiv: {
        className: 'Summary__Header',
        titleH2: {
          className: 'Summary__Title',
          innerHTML
        },
        ...Badge(30, true)
      },
      arrowSpan: {
        className: 'Accordion__Arrow' + (accordionState.open ? ' down' : ' up'),
        upIconImg: {
          src: UpIcon,
          alt: 'upIcon'
        }
      }
    }
  };
};

const AccordionContent = (): SuffixedTagNameObject => ({
  inputSearch: {
    placeholder: 'Store suchen'
  },
  StoreMenuUl: {
    ...StoreList(stores)
  }
});

export const Accordion: SuffixedTagNameObject = {
  accordionDetails: {
    open: accordionState.open,
    ...AccordionSummary('Abholung im Store'),
    ...AccordionContent()
  }
};
