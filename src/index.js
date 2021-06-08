import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import userReducer from './redux/reducers/userReducer';
import messageReducer from './redux/reducers/messageReducer';
import listingReducer from './redux/reducers/listingReducer';
import inquiryReducer from './redux/reducers/inquiryReducer';
import auctionReducer from './redux/reducers/auctionReducer';
import cartReducer from './redux/reducers/cartReducer';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const rootReducer = combineReducers({
  messageReducer,
  listingReducer,
  inquiryReducer,
  cartReducer,
  userReducer,
  auctionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

//DECLARE WEBSOCKET
const ws = new WebSocket('ws://localhost:4005');

ws.onopen = () => {
  console.log('Connected to server');

};

ws.onclose = () => {
  console.log('Disconnected');

};

ws.onerror = (e) => {
  console.log(e);

};

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  console.log(data);
  switch (data.type) {
    case 'UPDATE_CLIENT_COUNT':
      store.dispatch({ type: 'SET_CLIENT_COUNT', clientCount: data.count });
      break;
    case 'UPDATE_CHAT':
      store.dispatch({ type: 'UPDATE_CHAT', messages: data.chatMessages });
      break;
    default:
  }

};


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App ws={ws} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
