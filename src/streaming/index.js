import WebSocket from 'ws';
import FeeStore from './feeStore';
import RateStore from './rateStore';

const handleTopics = {
  'crypto-prices': (data) => {
    RateStore.dispatch('saveData', data);
  },
  'crypto-fees': (data) => {
    FeeStore.dispatch('saveData', data);
  },
};

const handleMsg = (rawMsg) => {
  const { topic, data } = rawMsg;
  if (typeof topic !== 'undefined' && typeof data !== 'undefined') {
    if (typeof handleTopics[topic] !== 'undefined') {
      handleTopics[topic](data);
    }
  }
};

const streamer = (wsHost) => {
  const ws = new WebSocket(wsHost);
  ws.on('open', () => {
    console.log('WS Opened!');
  });
  ws.on('message', handleMsg);
  // TODO Add disconnect logic and rery logic
};

export default streamer;
