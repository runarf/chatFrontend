import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { setConnected, showGreeting } from './StompApp';

export interface SavedMessage {
  message: string;
  author: string;
  id: number;
  timestamp: number;
}

let stompClient: CompatClient | null = null;

export function connect(displayMessages: (savedMessages: SavedMessage[]) => void) {
  var socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);

  stompClient?.connect({}, function (frame: any) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/greetings', function (greetingResponse) {
      const savedMessages: SavedMessage[] = JSON.parse(greetingResponse.body);
      displayMessages(savedMessages);
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

interface NewMessage {
  author: string;
  message: string;
}

export function sendNewMessage(author: string, message: string) {
  const newGreeting: NewMessage = { author, message };
  const newMessageJson = JSON.stringify(newGreeting);
  stompClient?.send('/app/hello', {}, newMessageJson);
}
