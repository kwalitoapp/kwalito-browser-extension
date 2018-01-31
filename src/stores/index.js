import * as monoprix from './monoprix';

const stores = [
  monoprix
];

export default stores;
export const identifyStore = () => _.find(stores, s => (window.location.href.match(s.urlMatch)));
export const getStoreByName = (storeName) => _.find(stores, s => s.name === storeName);
