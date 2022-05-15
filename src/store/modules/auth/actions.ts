import { ActionTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/shared/models/user';

const actions: ActionTree<AuthState, any> = {
  setUser({commit}, payload: User) {
    commit('setUser', payload);
  },
};

export default actions;
