/* eslint-disable no-undef */

import { InputsElements, constInputsElements, JElementList } from './const';

type InputTypes = typeof constInputsElements[number];

export type ElementsTagName = {
  [Props in InputTypes as Props]: HTMLInputElement;
} & HTMLElementTagNameMap;

export type PartialElementsTagName<T extends keyof ElementsTagName> = Partial<
  ElementsTagName[T]
>;

export type DataAttributeName = {
  [index: `data-${string}`]: string;
};

export type PrefixedTagName = {
  [Prop in keyof ElementsTagName as `${string}_${Prop}`]: (
    | PartialElementsTagName<Prop>
    | PrefixedTagName
  ) &
    DataAttributeName;
};

export type SuffixedTagName = {
  [Prop in keyof ElementsTagName as `${string}${Capitalize<Prop>}`]: (
    | PartialElementsTagName<Prop>
    | SuffixedTagName
  ) &
    DataAttributeName;
};

export type ElementProps = {
  tagName: keyof ElementsTagName;
  elementId: string;
  children?: SuffixedTagName;
};

export const getElementProps = (element: SuffixedTagName): ElementProps[] => {
  return Object.keys(element).map(key => {
    const elementNameArray = key.split(/(?=[A-Z])/);
    let tagName =
      elementNameArray[elementNameArray.length - 1].toLocaleLowerCase();
    if (!JElementList.includes(tagName)) {
      tagName = key;
    }
    const elementId = key.substring(0, key.length - tagName.length);
    const children = element[key as keyof SuffixedTagName];

    return { tagName, elementId, children } as ElementProps;
  });
};

export const getElementData = (children: SuffixedTagName) => {
  const subElements: ElementProps[] = [];
  const elementProps: ElementProps[] = [];
  const ElementChildrenAndProperties = getElementProps(children);

  ElementChildrenAndProperties.forEach((child: ElementProps) => {
    if (JElementList.includes(child.tagName)) {
      subElements.push(child);
      return;
    }
    elementProps.push(child);
  });

  return { subElements, elementProps };
};

export const renderElement = ({
  tagName,
  elementId,
  children
}: ElementProps) => {
  let newElementTagName = tagName.toString();
  const newElementType = tagName;

  if (InputsElements.includes(newElementTagName)) {
    newElementTagName = 'input';
  }

  const newElement: HTMLElement = document.createElement(newElementTagName);

  if (elementId) {
    newElement.id = elementId;
  }

  if (newElementTagName === 'input') {
    (newElement as HTMLInputElement).type = newElementType;
  }

  if (children) {
    const { subElements, elementProps } = getElementData(children);

    if (elementProps.length > 0) {
      elementProps.forEach(elements => {
        const key = elements.tagName;
        const value = elements.children as any;

        if (key.startsWith('on')) {
          const eventName = key.substring(2, key.length);
          newElement.addEventListener(eventName, value);
          return;
        }
        if (key in newElement) {
          (newElement as any)[key] = value;
        } else {
          newElement.setAttribute(key, value);
        }
      });
    }

    subElements.forEach(child => {
      newElement.appendChild(renderElement(child));
    });
  }

  return newElement;
};

export const updatedElement = ({ elementId, children }: ElementProps) => {
  const currentElement = document.querySelector('#' + elementId);

  if (currentElement && children) {
    const { subElements, elementProps } = getElementData(children);

    if (elementProps.length > 0) {
      elementProps.forEach(elements => {
        const key = elements.tagName;
        const value = elements.children as any;

        if (key.startsWith('on')) {
          const eventName = key.substring(2, key.length);
          currentElement.addEventListener(eventName, value);
          return;
        }
        if (key in currentElement) {
          (currentElement as any)[key] = value;
        } else {
          currentElement.setAttribute(key, value);
        }
      });
    }

    subElements.forEach(child => {
      updatedElement(child);
    });
  }
};

export const render = (
  element: SuffixedTagName,
  container: HTMLElement | null
) => {
  const containerElement = container ?? document.body;
  const elementChildren = getElementProps(element);
  elementChildren.forEach(child => {
    containerElement.appendChild(renderElement(child));
  });
};
