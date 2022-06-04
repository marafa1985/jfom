import { Accordion } from './components/atoms/Accordion/Accordion';
import { JElement, render } from '../lib/types';
import './styles/style.scss';

const func = (ev: MouseEvent) => {
  console.log(ev);
  ev.preventDefault();
  alert('hello');
};

const page: JElement = {
  employeeEditDiv: {
    filterDiv: { ...Accordion },
    formTitleH1: {
      innerHTML: 'Employee Information',
      onclick: func
    },
    formTitleH2: {
      innerHTML: 'Employee Information',
      onclick: func
    },
    employeeForm: {
      personalInfoDiv: {
        className: 'personalInfo',
        firstNameText: {
          ariaRequired: 'true'
        },
        lastNameText: {
          placeholder: 'Last Name',
          disabled: true
        }
      },
      contactInfoDiv: {
        className: 'contactInfo',
        emailEmail: {
          placeholder: 'Employee Email',
          'data-testid': 'employeeEmail'
        },
        contactTel: {}
      },
      buttonDiv: {
        className: 'buttonControls',
        cancelReset: {
          onclick: function (ev: MouseEvent) {
            console.log(ev);
            ev.preventDefault();
            alert('hello');
          }
        },
        submitSubmit: {}
      }
    }
  }
};

render(page, document.getElementById('root'));
