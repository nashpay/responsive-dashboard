import * as types from './mutation-types';

export const updatePopup = ({ commit }, popupState) => {
  commit(types.popupScreen, popupState);
};


export const updateLayover = ({ commit }, layoverState) => {
  commit(types.layoverScreen, layoverState);
};
