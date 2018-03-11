
export const sendMessage = (recipient, type, data = undefined) => {
  // console.log('Posting a message for ', recipient, type, data);
  recipient.postMessage({ type, data }, '*');
};

/**
 * Set up handlers to receive messages
 * @param receivers Object in the for of { messageType: function messageHandler, ... }
 */
export const recvMessage = (receivers, allowedSenders) => {
  window.onmessage = (e) => {
    // if(e.origin === `chrome-extension://${chrome.runtime.id}` && e.data){
    const isSenderAllowed = !allowedSenders || allowedSenders.indexOf(e.origin) !== -1;
    if(isSenderAllowed && e.data){
      console.log('received a message:', e);
      if(typeof receivers[e.data.type] === 'function'){
        receivers[e.data.type](e.data.data);
      }
    }
  };
};


export const sendBackgroundMessage = msg => new Promise((resolve, reject) => {
  console.log('Send background message:', msg);
  try {
    chrome.runtime.sendMessage(msg, resolve);
  } catch (error) {
    reject(error);
  }
});


/**
 * Set up handlers to receive messages
 * @param receivers Object in the for of { messageType: function messageHandler, ... }
 */
export const recvBackgroundMessage = (receivers) => {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('Received background message', msg, sender, receivers);
    if(msg.data && typeof receivers[msg.type] === 'function'){
      Promise.resolve(receivers[msg.type](msg.data))
        .then(data => sendResponse({ id: msg.id, data }))
        .catch(error => {
          console.error('ERROR:', error, error.stack);
          sendResponse({ id: msg.id, error });
        })
      ;
    } else {
      throw new Error(`Unknown message: ${JSON.stringify(msg)}`);
    }
    return true;
  });
};

