import { connect, disconnect, Greeting, sendName } from './stompClient';
import $ from 'jquery';

export const StompApp = () => {
  return (
    <div id="main-content" className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>
              <button id="connect" className="btn btn-default" type="submit">
                Connect
              </button>
              <button id="disconnect" className="btn btn-default" type="submit" disabled={true}>
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="name">What is your name?</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name here..."
              ></input>
            </div>
            <button id="send" className="btn btn-default" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
              <tr>
                <th>Greetings</th>
              </tr>
            </thead>
            <tbody id="greetings"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export function setConnected(connected: boolean) {
  $('#connect').prop('disabled', connected);
  $('#disconnect').prop('disabled', !connected);
  if (connected) {
    $('#conversation').show();
  } else {
    $('#conversation').hide();
  }
  $('#greetings').html('');
}

export function showGreeting(message: Greeting) {
  $('#greetings').append('<tr><td>' + message.content + '</td></tr>');
}

$(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
  });
  $('#connect').click(function () {
    connect();
  });
  $('#disconn ect').click(function () {
    disconnect();
  });
  $('#send').click(function () {
    sendName();
  });
});
