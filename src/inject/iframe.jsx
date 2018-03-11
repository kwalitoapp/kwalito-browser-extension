import React, { Component } from 'react';
import { render } from 'react-dom';
import InjectApp from '../inject/App';
import { recvMessage, sendMessage } from '../messaging';

recvMessage({
  info: checkResult => render(
    <InjectApp
      {...checkResult}
    />,
    document.querySelector('#root')
  )
});

window.addEventListener('load', () => {
  // const url = new URL(window.location.href);
  // const storeName = url.searchParams.get('store');
  sendMessage(window.parent, 'getInfo');
});
