import minimist from 'minimist';
import inquirer from 'inquirer';
import co from 'co';
import dotenv from 'dotenv';
import chalk from 'chalk';
import {
  checkArg,
  promptResource,
  execRequest,
} from './utils';
import errorMsg from './errors';
import base from './base';
import api from './index';
import cache from './cache';

const args = minimist(process.argv.slice(2));

const cli = function* cli() {
  if (Object.hasOwnProperty.call(args, 'config') === true) {
    dotenv.config({ path: args.config });
  }
  // Check Arg
  checkArg(args, 'apikey', 'API_KEY', chalk.red(errorMsg.ENV_MISSING('API_KEY', 'apikey')));
  checkArg(args, 'endpoint', 'ENDPOINT', chalk.red(errorMsg.ENV_MISSING('ENDPOINT', 'endpoint')));
  checkArg(args, 'priv_btc_testnet', 'PRIV_BTC_TESTNET', chalk.red(errorMsg.ENV_MISSING('PRIV_BTC_TESTNET', 'priv_btc_testnet')));
  // Load Cache
  yield cache.refreshSlaves();
  //
  const { resource } = yield inquirer.prompt(base.cmdp);
  const { endpoint } = yield inquirer.prompt(promptResource(api[resource].schema));
  console.log('resource');
  console.log(resource);
  console.log('endpoint');
  console.log(endpoint);
  const res = yield execRequest(api[resource], endpoint, cache);
  console.log('res');
  console.log(res);
};

co(cli).catch((err) => {
  if (err) {
    console.log(err);
  }
});
