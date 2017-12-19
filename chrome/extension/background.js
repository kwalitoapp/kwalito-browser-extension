import bluebird from 'bluebird';
import KwalitoSDK from '../../kwalito-sdk';
import {remoteCouchBaseUrl} from '../../app/constants';
import inject from './background/inject';

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

const kwalitoSDK = new KwalitoSDK(remoteCouchBaseUrl);
kwalitoSDK.init()
  .then(() => {
    require('./background/contextMenus');
    inject(kwalitoSDK);
    require('./background/badge');
  })
;