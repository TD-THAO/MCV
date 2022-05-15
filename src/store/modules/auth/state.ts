import { User } from '@/shared/models/user';

export interface AuthState {
  token: string | null;
  user: User;
}

const state: AuthState = {
  token: null,
  user: new User(),
};

export default state;
