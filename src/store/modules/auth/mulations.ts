import { MutationTree } from 'vuex';
import { AuthState } from './state';
import { Authenticate } from '@/shared/models/authenticate';

const mutations: MutationTree<AuthState> = {
  setUser(state, payload: Authenticate) {
    state.auth = payload;
  },
};
export default mutations;
