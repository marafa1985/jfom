import { renderForm } from './components/atoms/Input';
import { JFormDOM } from './JFormDOM';
import { jFormMock } from './mock/form';

const elem = document.createElement<'p'>(`p`);
elem.id = `myBrandnewDiv1`;
elem.appendChild(document.createTextNode(`My brand new div #1`));
elem.innerHTML += ` =&gt; created using 
  <code>document.createElement</code>`;

// const onClick = (ev: MouseEvent) => {
//   console.log('Hi New');
//   console.log(ev);
// };

// const inputText: Input = {
//   type: 'radio',
//   validation: ['isEmail'],
//   checked: true,
//   value: 'huey',
//   // placeholder: '1 + 2 = ?',
//   onclick: function (ev: MouseEvent) {
//     onClick(ev);
//   }
// };

JFormDOM.render(renderForm(jFormMock), document.getElementById('root'));
