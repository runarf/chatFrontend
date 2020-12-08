import $ from 'jquery';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { setConnected, showGreeting } from './StompApp';

let stompClient: CompatClient | null = null;
export function connect() {
  var socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);

  stompClient?.connect({}, function (frame: any) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/greetings', function (greeting) {
      showGreeting(JSON.parse(greeting.body).content);
    });
  });
}

export function disconnect() {
  if (stompClient !== null) {
    stompClient?.disconnect();
  }
  setConnected(false);
  console.log('Disconnected');
}

export function sendName() {
  stompClient?.send('/app/hello', {}, JSON.stringify({ name: $('#name').val() }));
}
