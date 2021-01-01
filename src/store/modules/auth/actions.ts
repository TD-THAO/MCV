import { ActionTree } from 'vuex';
import { AuthState } from './state';
import { Authenticate } from '@/shared/models/authenticate';

const actions: ActionTree<AuthState, any> = {
  setUser({commit}, payload: Authenticate) {
    console.log(payload, 'payload');

    commit('setUser', payload);
  },
};

export default actions;
