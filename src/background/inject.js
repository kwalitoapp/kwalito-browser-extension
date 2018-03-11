import _ from 'lodash';
import stores from '../stores';
import { recvBackgroundMessage } from '../messaging';

export const isInjected = (tabId) => {
  return chrome.tabs.executeScriptAsync(tabId, {
    code: `var injected = window.KwalitoBrowserExtensionInjected;
      window.KwalitoBrowserExtensionInjected = true;
      injected;`,
    runAt: 'document_start'
  });
};

export const loadScript = (name, tabId, cb) => {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, { file: `/${name}.bundle.js`, runAt: 'document_end' }, cb);
  } else {
    // dev: async fetch bundle
    fetch(`http://localhost:3000/${name}.bundle.js`)
      .then(res => res.text())
      .then((fetchRes) => {
        // Load redux-devtools-extension inject bundle,
        // because inject script and page is in a different context
        const request = new XMLHttpRequest();
        request.open('GET', 'chrome-extension://lmhkpmbekcpmknklioeibfkpmmfibljd/js/redux-devtools-extension.js');  // sync
        request.send();
        request.onload = () => {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            chrome.tabs.executeScript(tabId, { code: request.responseText, runAt: 'document_start' });
          }
        };
        chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
      });
  }
};

export default (kwalitoSDK) => {
  const storeUrls = _.map(stores, (store) => (store.urlMatch));

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const tabUrlMatch = tab.url.match(storeUrls.join('|'));
    if (changeInfo.status !== 'loading' || !tabUrlMatch) return;
    console.log('TAB URL MATCH:', tabUrlMatch);

    const result = await isInjected(tabId);
    if (chrome.runtime.lastError || result[0]) return;

    loadScript('inject', tabId, () => console.log('load inject bundle success!'));
  });

  recvBackgroundMessage({
    kwalitoSDK: data => kwalitoSDK[data.method](data.arg)
  });
  // chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  //   console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  //   let msgPromise;
  //   if(msg.type === 'kwalitoSDK'){
  //     msgPromise = kwalitoSDK[msg.method](msg.arg);
  //   } else {
  //     msgPromise = Promise.resolve(new Error(`Unknown message: ${JSON.stringify(msg)}`));
  //   }
  //   msgPromise
  //     .then((data) => sendResponse({id: msg.id, data}))
  //   ;
  //   return true;
  // });
};
