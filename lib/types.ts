/* eslint-disable no-undef */
import { InputsElements, constInputsElements, JElementList } from './const';

type InputTypes = typeof constInputsElements[number];

type ElementsTagName = {
  [Props in InputTypes as Props]: HTMLInputElement;
} & HTMLElementTagNameMap &
  SVGElementTagNameMap;

type PartialElementsTagName<T extends keyof ElementsTagName> = Partial<
  ElementsTagName[T]
>;

export type PrefixedTagName = {
  [Prop in keyof ElementsTagName as `${string}_${Prop}`]: PartialElementsTagName<Prop> & {
    ElementList?: PrefixedTagName;
  };
};

export type DataAttributeName = {
  [index: `data-${string}`]: string;
};

export type SuffixedTagName = {
  [Prop in keyof ElementsTagName as `${string}${Capitalize<Prop>}`]: PartialElementsTagName<Prop>;
};

export type SuffixedTagNameObject = SuffixedTagName & {
  [index: keyof SuffixedTagName]: SuffixedTagName;
};

export type JElement = {
  [index: keyof SuffixedTagName]: // | SuffixedTagName
  SuffixedTagNameObject | DataAttributeName;
};

type ElementProps = {
  tagName: keyof ElementsTagName;
  elementId: string;
  children?: SuffixedTagNameObject;
};

const getElementProps = (element: SuffixedTagNameObject): ElementProps[] => {
  return Object.keys(element).map(key => {
    const elementNameArray = key.split(/(?=[A-Z])/);
    let tagName =
      elementNameArray[elementNameArray.length - 1].toLocaleLowerCase();
    if (!JElementList.includes(tagName)) {
      tagName = key;
    }
    const elementId = key.substring(0, key.length - tagName.length);
    const children = element[key as keyof SuffixedTagNameObject];

    return { tagName, elementId, children } as ElementProps;
  });
};

const getElementData = (children: SuffixedTagNameObject) => {
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

const renderElement = ({ tagName, elementId, children }: ElementProps) => {
  let newElementTagName = tagName.toString();
  const newElementType = tagName;

  if (InputsElements.includes(newElementTagName)) {
    newElementTagName = 'input';
  }

  const newElement: HTMLElement = document.createElement(newElementTagName);
  newElement.id = elementId;

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

export const render = (
  element: SuffixedTagNameObject,
  container: HTMLElement | null
) => {
  const containerElement = container ?? document.body;
  const elementChildren = getElementProps(element);
  elementChildren.forEach(child => {
    containerElement.appendChild(renderElement(child));
  });
};
