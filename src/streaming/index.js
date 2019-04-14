import FeeStore from './feeStore';
import RateStore from './rateStore';

const handleTopics = {
  'crypto-prices': (data) => {
    RateStore.dispatch('saveData', data);
  },
  'crypto-fees': (data) => {
    let feeData = {};
    if (typeof data.xval !== 'undefined') {
      const { xval } = data;
      feeData = JSON.parse(xval);
    } else {
      feeData = data;
    }
    FeeStore.dispatch('saveData', feeData);
  },
};

const handleMsg = (rawMsg) => {
  const { data: rawData } = rawMsg;
  const { topic, data } = JSON.parse(rawData);
  if (typeof topic !== 'undefined' && typeof data !== 'undefined') {
    if (typeof handleTopics[topic] !== 'undefined') {
      handleTopics[topic](data);
    }
  }
};

const streamer = (wsHost) => {
  const ws = new WebSocket(wsHost);
  ws.addEventListener('open', () => {
    console.log('WS Opened!');
  });
  ws.addEventListener('message', handleMsg);
  // TODO Add disconnect logic and rery logic
};

export default streamer;
