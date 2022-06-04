import { SuffixedTagNameObject } from 'lib/types';
import { UpIcon } from '../../../shared/icons';
import { Badge } from '../Badge/Badge';
import { StoreList, stores } from '../StoreList/StoreList';
import './Accordion.scss';

const onToggle = (event: MouseEvent) => {
  const self: any = event.currentTarget;
  if (self) {
    if (self.classList.contains('down')) {
      self.classList.add('up');
      self.classList.remove('down');
      return;
    }
    self.classList.add('down');
    self.classList.remove('up');
  }
};

const AccordionSummary = (
  innerHTML: string,
  open?: boolean
): SuffixedTagNameObject => ({
  accordionSummary: {
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
      className: 'Accordion__Arrow' + (open ? ' down' : ' up'),
      upIconImg: {
        src: UpIcon,
        alt: 'upIcon'
      }
    }
  }
});

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
    open: true,
    ...AccordionSummary('Abholung im Store', true),
    ...AccordionContent()
  }
};
