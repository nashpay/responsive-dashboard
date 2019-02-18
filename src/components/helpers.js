import moment from 'moment';

const unixToDateTime = (unixTS) => {
  const m = moment.unix(unixTS);
  return m.format('DD MMM YYYY HH:mm');
};

export {
  unixToDateTime,
};
