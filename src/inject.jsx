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

  const contributionHandeler = (positive) => (data) => {
    console.log('SETTING PRODUCT AS Liked or disliked:', positive, data);
    return sendBackgroundMessage({ type: 'kwalitoSDK', data: { method: 'productSetContribution', arg: { ...data, positive } }})
      .then((contributionsData) => {
        console.log('Received a contribution result:', contributionsData);
        sendMessage(iframe.contentWindow, 'setContributions', contributionsData.data);
      });
  }
  recvMessage({
    getInfo: () => {
      const info = { storeName: store.name };
      return sendBackgroundMessage({ type: 'kwalitoSDK', data: { method: 'productCheck', arg: productInfos }})
        .then((checkResult) => {
          console.log('Received a result:', checkResult);
          _.assign(info, checkResult.data);
          console.log('GETTING THE USER!');
          return sendBackgroundMessage({ type: 'kwalitoSDK', data: { method: 'userGet' }});
        })
        .then((user) => {
          console.log('Received a user:', user);
          info.user = user.data;
          info.favorite = (info.user.favoriteProducts.indexOf(productInfos.ean) !== -1);
          return sendBackgroundMessage({ type: 'kwalitoSDK', data: { method: 'contributionGet', arg: productInfos.ean }});
        })
        .then((contributions) => {
          info.contributions = contributions.data;
          sendMessage(iframe.contentWindow, 'info', info);
        })
      ;
    },
    iframeStyle: (data) => {
      _.forEach(data.styles, (value, key) => {
        iframe.style[key] = value;
      });
    },
    setFavorite: (data) => {
      console.log('SETTING PRODUCT AS FAVORITE:', data);
      return sendBackgroundMessage({ type: 'kwalitoSDK', data: { method: 'productSetFavorite', arg: data }})
        .then((isFavoriteData) => {
          console.log('Received a result:', isFavoriteData);
          sendMessage(iframe.contentWindow, 'setFavorite', isFavoriteData.data);
        });
    },
    setLike: contributionHandeler(true),
    setDislike: contributionHandeler(false)
  }, [`chrome-extension://${chrome.runtime.id}`]);
});
