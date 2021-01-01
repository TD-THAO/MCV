import { Deserializable } from '@/shared/interfaces/deserialize';

export interface AuthenticateInput {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  password:string;
}

export class Authenticate implements Deserializable<Authenticate>, AuthenticateInput {
  uid: string = '';
  email: string = '';
  displayName: string = ''
  phoneNumber: string = ''
  photoURL: string = ''
  password:string;

  deserialize(input: Partial<AuthenticateInput>): Authenticate {
    if (!input) {
      return this;
    }

    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      email: this.email,
      password: this.password,
    };

    return data;
  }
}

