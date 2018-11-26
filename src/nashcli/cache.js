import Datastore from 'nedb';
import Bluebird from 'bluebird';
import api from './index';
import {
  runRequest,
} from './utils';


Bluebird.promisifyAll(Datastore.prototype);
const db = new Datastore();

class Cache {
  constructor(conn) {
    this.conn = conn;
  }

  * refreshSlaves() {
    const res = yield runRequest(api.slaves.endpoints.list, {}, {});
    let i = 0;
    while (i < res.length) {
      const slaveAcc = res[i];
      yield this.conn.updateAsync(
        { entity: 'slave', subAccId: slaveAcc.id },
        { entity: 'slave', subAccId: slaveAcc.id, name: slaveAcc.name },
        { upsert: true },
      );
      i += 1;
    }
  }

  * getSubAccountIdByName(name) {
    const res = yield this.conn.findAsync({ entity: 'slave', name });
    if (res.length > 0) {
      return res[0].subAccId;
    }
    return false;
  }

  * promptSlave(prior) {
    const res = yield this.conn.findAsync({ entity: 'slave' });
    const choices = ['default'];
    res.forEach((slaveRow) => {
      choices.push(slaveRow.name);
    });
    const cmdp = {
      type: 'list',
      name: 'slave',
      message: 'Choose a (sub)account',
      choices,
    };
    prior.unshift(cmdp);
    return prior;
  }
}

const cache = new Cache(db);


export default cache;
