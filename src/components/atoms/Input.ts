// /* eslint-disable no-undef */
// import { Validation } from 'components/particles/validations';
// import { JForm } from '../../mock/form';

// export type InputType =
//   | 'button'
//   | 'checkbox'
//   | 'color'
//   | 'date'
//   | 'datetime-local'
//   | 'email'
//   | 'file'
//   | 'hidden'
//   | 'image'
//   | 'month'
//   | 'number'
//   | 'password'
//   | 'radio'
//   | 'range'
//   | 'reset'
//   | 'search'
//   | 'submit'
//   | 'tel'
//   | 'text'
//   | 'time'
//   | 'url'
//   | 'week';

// type JInput = {
//   button: 'button';
//   checkbox: 'checkbox';
//   color: 'color';
//   date: 'date';
//   datetime: 'datetime-local';
//   email: 'email';
//   file: 'file';
//   hidden: 'hidden';
//   image: 'image';
//   month: 'month';
//   number: 'number';
//   password: 'password';
//   radio: 'radio';
//   range: 'range';
//   reset: 'reset';
//   search: 'search';
//   submit: 'submit';
//   tel: 'tel';
//   text: 'text';
//   time: 'time';
//   url: 'url';
//   week: 'week';
// };

// type ExcludeHTMLInputElementProps<K extends string> = Partial<
//   Omit<HTMLElement, 'type' | K>
// >;

// export type JElement = {
//   [P in keyof HTMLElementTagNameMap]: P;
// } & JInput;

// type JInputHTML<T extends keyof JElement> = {
//   [index: string]: any;
// } & {
//   type: T;
//   label?: string;
//   visible?: boolean;
//   validation?: Validation[];
// };

// type Text = JInputHTML<'text'> & ExcludeHTMLInputElementProps<''>;

// type Radio = JInputHTML<'radio'> &
//   ExcludeHTMLInputElementProps<'maxLength' | 'minLength'>;

// type JNumber = JInputHTML<'number'> &
//   ExcludeHTMLInputElementProps<'placeholder' | 'maxLength' | 'minLength'>;

// type JLabel = Omit<JInputHTML<'label'>, 'type'> & Partial<HTMLLabelElement>;

// export type Input<T = keyof JElement> = T extends 'text'
//   ? Text
//   : T extends 'number'
//   ? JNumber
//   : T extends 'label'
//   ? JLabel
//   : Radio;

// export interface Div extends Partial<HTMLDivElement> {
//   [index: string]: any;
//   childElements: Input[];
// }

// export const renderLabel = (input: Input): HTMLLabelElement => {
//   const labelElement: HTMLLabelElement =
//     document.createElement<'label'>('label');

//   Object.keys(input).forEach(key => {
//     if (key.startsWith('on')) {
//       const eventName = key.substring(2, key.length);
//       labelElement.addEventListener(eventName, input[key]);
//       return;
//     }
//     labelElement.setAttribute(key, input[key]);
//   });
//   return labelElement;
// };

// export const renderInput = (input: Input): HTMLInputElement => {
//   const inputElement: HTMLInputElement =
//     document.createElement<'input'>('input');

//   Object.keys(input).forEach(key => {
//     if (key.startsWith('on')) {
//       const eventName = key.substring(2, key.length);
//       inputElement.addEventListener(eventName, input[key]);
//       return;
//     }
//     inputElement.setAttribute(key, input[key]);
//   });

//   return inputElement;
// };

// export const renderInputWithLabel = (input: Input): HTMLLabelElement => {
//   const inputLabel: Input = {
//     htmlFor: input.id || input.label || 'input',
//     innerHTML: input.label
//   };
//   const label = renderLabel(inputLabel);
//   label.innerHTML = input.label;
//   label.appendChild(renderInput(input));
//   return label;
// };

// export const renderHeader = (
//   headElement: HTMLElement | string
// ): HTMLHeadElement => {
//   const element: HTMLHeadElement = document.createElement<'header'>('header');
//   if (typeof headElement === 'string') {
//     element.innerText = headElement;
//   } else {
//     element.appendChild(headElement);
//   }

//   return element;
// };

// export const renderDiv = (divElement: Div): HTMLDivElement => {
//   const element = document.createElement<'div'>('div');

//   Object.keys(divElement).forEach(key => {
//     if (key === 'childElements') {
//       return;
//     }
//     if (key.startsWith('on')) {
//       const eventName = key.substring(2, key.length);
//       element.addEventListener(eventName, divElement[key]);
//       return;
//     }
//     element.setAttribute(key, divElement[key]);
//   });

//   return element;
// };

// export const renderForm = (jForm: JForm): HTMLFormElement => {
//   const formElement: HTMLFormElement = document.createElement<'form'>('form');

//   Object.keys(jForm).forEach(key => {
//     (formElement as any)[key] = jForm[key as keyof JForm];
//   });

//   if (jForm.header) {
//     formElement.appendChild(renderHeader(jForm.header));
//   }

//   jForm.div.forEach(row => {
//     const newRow = renderDiv(row);
//     formElement.appendChild(newRow);
//     row.childElements.forEach(child => {
//       if (child.label) {
//         newRow.appendChild(renderInputWithLabel(child));
//         return;
//       }
//       newRow.appendChild(renderInput(child));
//     });
//   });
//   return formElement;
// };
