import _ from 'lodash';
import { identifyStore } from './stores';
import { sendMessage, recvMessage, sendBackgroundMessage } from './messaging';

window.addEventListener('load', () => {
  const store = identifyStore();
  const iframeUrl = chrome.runtime.getURL(`/inject/iframe.html?store=${store.name}`);
  const iframe = store.injectIframe(iframeUrl);
  const productInfos = store.extractProductInfos();

  iframe.style['box-sizing'] = 'border-box';
  iframe.style['transition-duration'] = '1s';
  iframe.style.width = '400px';
  iframe.style.height = '600px';
  iframe.style.overflow = 'hidden';
  iframe.style['box-shadow'] = '2px 2px 8px 0px rgba(0, 0, 0, 0.7)';

  recvMessage({
    getInfo: () => {
      sendBackgroundMessage({ type: 'kwalitoSDK', method: 'checkProduct', arg: productInfos })
        .then((checkResult) => {
          console.log('Received a result:', checkResult);
          sendMessage(iframe.contentWindow, 'info', { storeName: store.name, checkResult });
        });
    },
    iframeStyle: (data) => {
      _.forEach(data.styles, (value, key) => {
        iframe.style[key] = value;
      });
    },
    setFavorite: (data) => {
      console.log('SETTING PRODUCT AS FAVORITE:', data);
      sendMessage(iframe.contentWindow, 'setFavorite', { favorite: true });
    },
    setLike: (data) => {
      console.log('SETTING PRODUCT AS Liked:', data);
      sendMessage(iframe.contentWindow, 'setLike', data);
    },
    setDislike: (data) => {
      console.log('SETTING PRODUCT AS dislike:', data);
      sendMessage(iframe.contentWindow, 'setDislike', data);
    }
  }, [`chrome-extension://${chrome.runtime.id}`]);
});
