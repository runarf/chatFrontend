import $ from 'jquery';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { setConnected, showGreeting } from './StompApp';

export interface Greeting {
  content: string;
}

let stompClient: CompatClient | null = null;
export function connect() {
  var socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);

  stompClient?.connect({}, function (frame: any) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/greetings', function (greetingResponse) {
      const greeting: Greeting = JSON.parse(greetingResponse.body);
      showGreeting(greeting);
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

interface NewGreeting {
  name: string;
}

export function sendName() {
  const newGreeting: NewGreeting = { name: $('#name').val() as string };
  const message = JSON.stringify(newGreeting);
  stompClient?.send('/app/hello', {}, message);
}
