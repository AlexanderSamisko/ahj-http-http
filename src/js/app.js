import Desk from './Desk';
import Requester from './Requester';

new Desk();

Requester.makeRequest('GET', {}, 'getAllTickets');
