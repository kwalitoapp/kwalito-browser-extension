
export const sendMessage = (recipient, type, data = undefined) => {
  console.log('Posting a message for ', recipient, type, data);
  recipient.postMessage({ type, data }, '*');
};

/**
 * Set up handlers to receive messages
 * @param receivers Object in the for of { messageType: function messageHandler, ... }
 */
export const recvMessage = (receivers, allowedSenders) => {
  window.onmessage = (e) => {
    console.log('received a message:', e);
    // if(e.origin === `chrome-extension://${chrome.runtime.id}` && e.data){
    const isSenderAllowed = !allowedSenders || allowedSenders.indexOf(e.origin) !== -1;
    if(isSenderAllowed && e.data){
      console.log('data:', e.data);
      console.log('receivers:', receivers);
      console.log('typeof receiver:', typeof receivers[e.data.type]);
      if(typeof receivers[e.data.type] === 'function'){
        receivers[e.data.type](e.data.data);
      }
    }
  };
};


export const sendBackgroundMessage = msg => new Promise((resolve, reject) => {
  console.log('Send background mesage:', msg);
  try {
    chrome.runtime.sendMessage(msg, resolve);
  } catch (error) {
    reject(error);
  }
});
