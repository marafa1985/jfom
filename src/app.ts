import { Accordion } from './components/atoms/Accordion/Accordion';
import { SuffixedTagName, render } from '../lib/types';
import './styles/style.scss';

const handleClick = (ev: MouseEvent) => {
  console.log(ev);
  ev.preventDefault();
  alert('hello');
};

const page: SuffixedTagName = {
  employeeEditDiv: {
    ...Accordion(),
    formTitleH1: {
      innerHTML: 'Employee Information',
      onclick: handleClick
    },
    formTitleH2: {
      innerHTML: 'Employee Information',
      onclick: handleClick
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
          onclick: handleClick
        },
        submitSubmit: {
          onclick: function (ev: MouseEvent) {
            ev.preventDefault();
            confirm('hello');
          }
        }
      }
    }
  }
};

render(page, document.getElementById('root'));
