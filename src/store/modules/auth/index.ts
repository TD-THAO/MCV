import state from './state';
import actions from './actions';
import mulations from './mulations';
import getters from './getters';

const authModules = {
  state: {
    ...state,
  },
  mutations: {
    ...mulations,
  },
  actions: {
    ...actions,
  },
  getters: {
    ...getters,
  },
  namespaced: true,
};

export default authModules;
