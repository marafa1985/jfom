/* eslint-disable no-undef */
import { Validation } from 'components/particles/validations';
import { JForm } from '../../mock/form';

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type JInput = {
  button: 'button';
  checkbox: 'checkbox';
  color: 'color';
  date: 'date';
  datetime: 'datetime-local';
  email: 'email';
  file: 'file';
  hidden: 'hidden';
  image: 'image';
  month: 'month';
  number: 'number';
  password: 'password';
  radio: 'radio';
  range: 'range';
  reset: 'reset';
  search: 'search';
  submit: 'submit';
  tel: 'tel';
  text: 'text';
  time: 'time';
  url: 'url';
  week: 'week';
};

type ExcludeHTMLInputElementProps<K extends string> = Partial<
  Omit<HTMLInputElement, K>
>;

export type JElement = {
  [P in keyof HTMLElementTagNameMap]: P;
} & JInput;

type JFormHTML<T extends keyof JElement> = {
  [index: string]: any;
} & {
  // id: string;
  type: T;
  label?: string;
  visible?: boolean;
  validation?: Validation[];
};

type Text = JFormHTML<'text'> & ExcludeHTMLInputElementProps<'type'>;

type Radio = JFormHTML<'radio'> &
  ExcludeHTMLInputElementProps<'type' | 'maxLength' | 'minLength'>;

type JNumber = JFormHTML<'number'> &
  ExcludeHTMLInputElementProps<
    'type' | 'placeholder' | 'maxLength' | 'minLength'
  >;

export type Input<T = keyof JElement> = T extends 'text'
  ? Text
  : T extends 'number'
  ? JNumber
  : Radio;

export const renderInput = (input: Input): HTMLInputElement => {
  const inputElement: HTMLInputElement =
    document.createElement<'input'>('input');

  Object.keys(input).forEach(key => {
    (inputElement as any)[key] = input[key as keyof Input];
  });

  return inputElement;
};

const renderHeader = (
  headElement: HTMLHeadElement | string
): HTMLHeadElement => {
  const element: HTMLHeadElement = document.createElement<'header'>('header');
  if (typeof headElement === 'string') {
    element.innerText = headElement;
  } else {
    element.appendChild(headElement);
  }

  return element;
};

export const renderForm = (jForm: JForm): HTMLFormElement => {
  const formElement: HTMLFormElement = document.createElement<'form'>('form');

  formElement.setAttribute('id', jForm.id);
  if (jForm.header) {
    formElement.appendChild(renderHeader(jForm.header));
  }

  jForm.children.forEach(row => {
    row.forEach(child => {
      formElement.appendChild(renderInput(child));
    });
  });
  return formElement;
};
