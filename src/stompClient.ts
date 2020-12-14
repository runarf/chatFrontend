import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { baseUrl } from './App';

export interface SavedMessage {
  message: string;
  author: string;
  id: number;
  timestamp: number;
}

let stompClient: CompatClient | null = null;

export function subscribeToNewMessages(saveMessage: (savedMessages: SavedMessage) => void) {
  var socket = new SockJS(`${baseUrl}/gs-guide-websocket`);
  stompClient = Stomp.over(socket);

  stompClient?.connect({}, function (frame: any) {
    stompClient?.subscribe('/topic/greetings', function (greetingResponse) {
      const newSavedMessage: SavedMessage = JSON.parse(greetingResponse.body);
      saveMessage(newSavedMessage);
    });
  });
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
