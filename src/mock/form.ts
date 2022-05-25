// export type Component = {
//   id: string;
//   type: string;
//   label: string;
//   validation: string[];
// };

import { Input } from 'components/atoms/Input';

export type JForm = {
  id: string;
  header: string;
  children: Input[][];
};

export const personInfo: Input[] = [
  {
    id: 'employeeCode',
    type: 'text',
    label: 'Employee Code',
    placeholder: 'Enter employee code',
    validation: ['isNumber'],
    visible: false,
    data_testid: 'eded',
    onclick: ev => {
      console.log((ev.target as any).data_testid);
      console.log(this);
    }
  },
  {
    id: 'firstName',
    type: 'text',
    label: 'First Name'
    // validation: ['isTextMAx(200)']
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Last Name'
    // validation: ['isTextMAx(200)']
  }
];

// export const contactInfo: Input[] = [
//   {
//     id: 'phoneNumber',
//     type: 'tel',
//     label: 'Phone',
//     validation: ['isTelephone']
//   },
//   {
//     id: 'email',
//     type: 'email',
//     label: 'Email',
//     validation: ['iisEmail)']
//   }
// ];

export const jFormMock: JForm = {
  id: 'employeeForm',
  header: 'Employee Information',
  children: [[...personInfo]]
};
