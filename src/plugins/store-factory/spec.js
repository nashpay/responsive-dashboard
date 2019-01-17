import { assert } from 'chai';
import sinon from 'sinon';

import { storeFactory } from './index';

describe('StoreFactory Plugin', () => {
  describe('Constructor', () => {
    it('creates types from schema', () => {
      const schema = ['pageTab', 'pageHeader'];
      const { types } = storeFactory(schema);
      assert.equal(types.pageTab, 'PAGE_TAB');
      assert.equal(types.pageHeader, 'PAGE_HEADER');
    });
    it('creates mutations from schema', () => {
      const schema = ['pageTab', 'pageHeader'];
      const { mutations, types } = storeFactory(schema);
      const x = { pageTab: 1 };
      mutations[types.pageTab](x, 2);
      assert.equal(x.pageTab, 2);
    });
    it('creates actions from schema', () => {
      const commitFn = sinon.spy();
      const schema = ['pageTab', 'pageHeader'];
      const { actions } = storeFactory(schema);
      actions.savePageTab({ commit: commitFn }, 1);
      assert.equal(commitFn.called, true);
      assert.equal(commitFn.args[0].length, 2);
      assert.equal(commitFn.args[0][0], 'PAGE_TAB');
      assert.equal(commitFn.args[0][1], 1);
    });
  });
});
