import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import _ from 'lodash';
import stores from './stores';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {

    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open TodoApp
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%'
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

const sendMessage = (msg) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(msg, resolve);
    } catch(error){
      reject(error);
    }
  });
};
window.addEventListener('load', () => {

  console.log('TAB URL:', window.location.href);
  const store = _.find(stores, (s) => (window.location.href.match(s.urlMatch)));
  console.log('DETECTED STORE:', store);
  const productInfos = store.extractProductInfos();
  sendMessage({type: 'kwalitoSDK', method: 'checkProduct', arg: productInfos})
    .then((checkResult) => {
      console.log('RESULT FOR THIS PRODUCT:', checkResult);
    })
  ;
});
