import Requester from './Requester';

export default class Form {
  constructor() {
    this.createForm();
  }

  createForm() {
    const body = document.querySelector('body');
    const mainForm = document.createElement('form');
    mainForm.className = 'main-form';
    body.append(mainForm);

    const mainFormLabel = document.createElement('label');
    mainFormLabel.textContent = 'Введите номер телефона';
    mainForm.append(mainFormLabel);

    const mainFormInput = document.createElement('input');
    mainFormInput.setAttribute('type', 'text');
    mainFormInput.setAttribute('name', 'phone');
    mainFormInput.className = 'form-input';
    mainForm.append(mainFormInput);

    const mainFormButton = document.createElement('input');
    mainFormButton.setAttribute('type', 'submit');
    mainFormButton.className = 'form-button';

    mainForm.append(mainFormButton);

    mainFormButton.addEventListener('click', () => {
      // evt.preventDefault();
      Requester.makeRequest();
    });
  }
}
