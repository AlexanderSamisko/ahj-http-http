import TicketCreater from './TicketCreater';

export default class Desk {
  constructor() {
    this.createDesk();
  }

  createDesk() {
    const body = document.querySelector('body');

    const desk = document.createElement('div');
    desk.className = 'desk';
    body.append(desk);

    const deskHeader = document.createElement('header');
    deskHeader.className = 'desk-header';
    desk.append(deskHeader);

    const deskHeaderDotFirst = document.createElement('div');
    deskHeaderDotFirst.className = 'desk-header-dot';
    deskHeader.append(deskHeaderDotFirst);

    const deskHeaderDotSecond = document.createElement('div');
    deskHeaderDotSecond.className = 'desk-header-dot';
    deskHeader.append(deskHeaderDotSecond);

    const deskHeaderDotThird = document.createElement('div');
    deskHeaderDotThird.className = 'desk-header-dot';
    deskHeader.append(deskHeaderDotThird);

    const deskBody = document.createElement('div');
    deskBody.className = 'desk-body';
    desk.append(deskBody);

    const deskCreateTicket = document.createElement('div');
    deskCreateTicket.className = 'desk-create-ticket';
    deskCreateTicket.textContent = 'Добавить тикет';
    deskBody.append(deskCreateTicket);
    deskCreateTicket.addEventListener('click', () => {
      TicketCreater.CreaterWidget();
    });

    const deskTickets = document.createElement('div');
    deskTickets.className = 'desk-tickets';
    deskBody.append(deskTickets);
  }
}
