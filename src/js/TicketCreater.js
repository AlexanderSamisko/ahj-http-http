import Requester from './Requester';

export default class TicketCreater {
  static CreaterWidget() {
    const desk = document.querySelector('.desk');

    const CreaterWidget = document.createElement('div');
    CreaterWidget.classList = 'creater-widget';
    CreaterWidget.style.position = 'absolute';
    desk.append(CreaterWidget);

    const CreateTicketHeader = document.createElement('header');
    CreateTicketHeader.classList = 'create-ticket-header';
    CreateTicketHeader.textContent = 'Добавить тикет';
    CreaterWidget.append(CreateTicketHeader);

    const CreateTicketForm = document.createElement('form');
    CreateTicketForm.classList = 'create-ticket-form';
    CreaterWidget.append(CreateTicketForm);

    const CreateTicketNameLabel = document.createElement('label');
    CreateTicketNameLabel.classList = 'create-ticket-label';
    CreateTicketNameLabel.textContent = 'Краткое описание';
    CreateTicketForm.append(CreateTicketNameLabel);

    const CreateTicketNameInput = document.createElement('input');
    CreateTicketNameInput.classList = 'create-ticket-input-name';
    CreateTicketNameInput.setAttribute('name', 'name');
    CreateTicketNameInput.setAttribute('type', 'text');
    CreateTicketNameLabel.append(CreateTicketNameInput);

    const CreateTicketDescriptionLabel = document.createElement('label');
    CreateTicketDescriptionLabel.classList = 'create-ticket-label';
    CreateTicketDescriptionLabel.textContent = 'Подробное описание';
    CreateTicketForm.append(CreateTicketDescriptionLabel);

    const CreateTicketDescriptionInput = document.createElement('input');
    CreateTicketDescriptionInput.classList = 'create-ticket-input-description';
    CreateTicketNameInput.setAttribute('name', 'description');
    CreateTicketNameInput.setAttribute('type', 'text');
    CreateTicketDescriptionLabel.append(CreateTicketDescriptionInput);

    const CreateTicketButtonBlock = document.createElement('div');
    CreateTicketButtonBlock.classList = 'create-ticket-button-block';
    CreateTicketForm.append(CreateTicketButtonBlock);

    const CreateTicketCancelButton = document.createElement('div');
    CreateTicketCancelButton.classList = 'create-ticket-button';
    CreateTicketCancelButton.textContent = 'Отмена';
    CreateTicketButtonBlock.append(CreateTicketCancelButton);
    CreateTicketCancelButton.addEventListener('click', () => {
      CreaterWidget.remove();
    });

    const CreateTicketSendButton = document.createElement('div');
    CreateTicketSendButton.classList = 'create-ticket-button';
    CreateTicketSendButton.textContent = 'Ок';
    CreateTicketButtonBlock.append(CreateTicketSendButton);
    CreateTicketSendButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const data = new Date();
      const dataString = data.toString();
      const dataArr = dataString.split('GMT');
      Requester.makeRequest('POST', {
        id: null,
        status: false,
        name: CreateTicketNameInput.value,
        description: CreateTicketDescriptionInput.value,
        created: dataArr[0],
      }, 'createTicket');
      CreaterWidget.remove();
    });
  }

  static createTicket(value) {
    const deskTickets = document.querySelector('.desk-tickets');

    const ticket = document.createElement('div');
    ticket.className = 'ticket';
    ticket.setAttribute('data-id', `${value.id}`);
    deskTickets.append(ticket);

    const ticketMainPart = document.createElement('div');
    ticketMainPart.className = 'ticket-main-part';
    ticket.append(ticketMainPart);

    const ticketLeftPart = document.createElement('div');
    ticketLeftPart.className = 'ticket-left-part';
    ticketMainPart.append(ticketLeftPart);

    const tickeStatus = document.createElement('div');
    tickeStatus.className = 'ticket-status';
    tickeStatus.setAttribute('data-status', `${value.status}`);
    ticketLeftPart.append(tickeStatus);

    const ticketName = document.createElement('p');
    ticketName.className = 'ticket-name';
    ticketName.textContent = `${value.name}`;
    ticketLeftPart.append(ticketName);

    const ticketRightPart = document.createElement('div');
    ticketRightPart.className = 'ticket-right-part';
    ticketMainPart.append(ticketRightPart);

    const ticketDate = document.createElement('p');
    ticketDate.className = 'ticket-date';
    ticketDate.textContent = `${value.created}`;
    ticketRightPart.append(ticketDate);

    const ticketEdit = document.createElement('div');
    ticketEdit.className = 'ticket-edit';
    ticketRightPart.append(ticketEdit);

    const ticketRemove = document.createElement('div');
    ticketRemove.className = 'ticket-remove';
    ticketRightPart.append(ticketRemove);

    ticket.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('ticket-status')) {
        const ticket = evt.target.closest('.ticket');
        const id = ticket.getAttribute('data-id');
        if (evt.target.getAttribute('data-status') === 'false') {
          Requester.makeRequest('POST', {
            id,
            status: true,
          }, 'changeStatus');
        } else {
          Requester.makeRequest('POST', {
            id,
            status: false,
          }, 'changeStatus');
        }
      } else if (evt.target.classList.contains('ticket-edit')) {
        const ticket = evt.target.closest('.ticket');
        const id = ticket.getAttribute('data-id');
        TicketCreater.EditWidget(id);
      } else if (evt.target.classList.contains('ticket-remove')) {
        const ticket = evt.target.closest('.ticket');
        const id = ticket.getAttribute('data-id');
        Requester.makeRequest('POST', {
          id,
        }, 'removeTicket');
      } else {
        const ticket = evt.target.closest('.ticket');
        const id = ticket.getAttribute('data-id');
        if (!ticket.classList.contains('descript')) {
          Requester.makeRequest('GET', {
            id,
          }, 'getDescription');
        } else if (ticket.classList.contains('descript')) {
          const descript = ticket.querySelector('.ticket-descript-part');
          ticket.classList.remove('descript');
          descript.remove();
        }
      }
    });
  }

  static changeStatus(value) {
    const { id } = value;
    const { status } = value;
    const ticketToChange = document.querySelector(`[data-id="${id}"]`);
    const tickeStatus = ticketToChange.querySelector('.ticket-status');
    tickeStatus.setAttribute('data-status', `${status}`);
  }

  static removeTicket(value) {
    const { id } = value;
    const ticketToRemove = document.querySelector(`[data-id="${id}"]`);
    ticketToRemove.remove();
  }

  static showDescription(value) {
    const { id } = value;
    const { description } = value;
    const ticketToDescript = document.querySelector(`[data-id="${id}"]`);
    ticketToDescript.classList.add('descript');

    const ticketDescriptPart = document.createElement('p');
    ticketDescriptPart.className = 'ticket-descript-part';
    ticketDescriptPart.textContent = description;
    ticketToDescript.append(ticketDescriptPart);
  }

  static EditWidget(id) {
    const desk = document.querySelector('.desk');

    const CreaterWidget = document.createElement('div');
    CreaterWidget.classList = 'creater-widget';
    CreaterWidget.style.position = 'absolute';
    desk.append(CreaterWidget);

    const CreateTicketHeader = document.createElement('header');
    CreateTicketHeader.classList = 'create-ticket-header';
    CreateTicketHeader.textContent = 'Изменить тикет';
    CreaterWidget.append(CreateTicketHeader);

    const CreateTicketForm = document.createElement('form');
    CreateTicketForm.classList = 'create-ticket-form';
    CreaterWidget.append(CreateTicketForm);

    const CreateTicketNameLabel = document.createElement('label');
    CreateTicketNameLabel.classList = 'create-ticket-label';
    CreateTicketNameLabel.textContent = 'Изменить описание';
    CreateTicketForm.append(CreateTicketNameLabel);

    const CreateTicketNameInput = document.createElement('input');
    CreateTicketNameInput.classList = 'create-ticket-input-name';
    CreateTicketNameInput.setAttribute('name', 'name');
    CreateTicketNameInput.setAttribute('type', 'text');
    CreateTicketNameLabel.append(CreateTicketNameInput);

    const CreateTicketDescriptionLabel = document.createElement('label');
    CreateTicketDescriptionLabel.classList = 'create-ticket-label';
    CreateTicketDescriptionLabel.textContent = 'Изменить подробности';
    CreateTicketForm.append(CreateTicketDescriptionLabel);

    const CreateTicketDescriptionInput = document.createElement('input');
    CreateTicketDescriptionInput.classList = 'create-ticket-input-description';
    CreateTicketNameInput.setAttribute('name', 'description');
    CreateTicketNameInput.setAttribute('type', 'text');
    CreateTicketDescriptionLabel.append(CreateTicketDescriptionInput);

    const CreateTicketButtonBlock = document.createElement('div');
    CreateTicketButtonBlock.classList = 'create-ticket-button-block';
    CreateTicketForm.append(CreateTicketButtonBlock);

    const CreateTicketCancelButton = document.createElement('div');
    CreateTicketCancelButton.classList = 'create-ticket-button';
    CreateTicketCancelButton.textContent = 'Отмена';
    CreateTicketButtonBlock.append(CreateTicketCancelButton);
    CreateTicketCancelButton.addEventListener('click', () => {
      CreaterWidget.remove();
    });

    const CreateTicketSendButton = document.createElement('div');
    CreateTicketSendButton.classList = 'create-ticket-button';
    CreateTicketSendButton.textContent = 'Ок';
    CreateTicketButtonBlock.append(CreateTicketSendButton);
    CreateTicketSendButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      Requester.makeRequest('POST', {
        id,
        name: CreateTicketNameInput.value,
        description: CreateTicketDescriptionInput.value,
      }, 'editTicket');
      CreaterWidget.remove();
    });
  }

  static editTicket(value) {
    const { id } = value;
    const { name } = value;
    const { description } = value;

    const ticketToEdit = document.querySelector(`[data-id="${id}"]`);
    ticketToEdit.querySelector('.ticket-name').textContent = name;
    if (ticketToEdit.classList.contains('descript')) {
      ticketToEdit.querySelector('.ticket-descript-part').textContent = description;
    }
  }
}
