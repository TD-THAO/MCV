import { MutationTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/shared/models/user';

const mutations: MutationTree<AuthState> = {
  setUser(state, payload: User) {
    state.user = payload;
  },
};
export default mutations;
