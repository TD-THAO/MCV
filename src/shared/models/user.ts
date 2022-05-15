import { Deserializable } from '@/shared/interfaces/deserialize';

export interface UserInput {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  gender: boolean;
  marital_status: boolean;
  day: string;
  month: string;
  year: string;
  password: string;
  new_password: string;
  confirm_new_password: string;
  role: string;
}

export class User implements Deserializable<User>, UserInput {
  id: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  city: string = '';
  district: string = '';
  address: string = '';
  gender: boolean;
  marital_status: boolean;
  day: string = '';
  month: string = '';
  year: string = '';
  password: string;
  new_password: string;
  confirm_new_password: string;
  role: string = 'USER';

  get birthdayString() {
    if (this.day && this.month && this.year) {
      return `${this.day}/${this.month}/${this.year}`;
    }
  }

  get genderString() {
    return this.gender ? 'Nữ' : 'Nam';
  }

  get addressString() {
    return `${this.address} · ${this.district} · ${this.city}`;
  }

  get isAdmin() {
    return this.role === 'ADMIN'
  }

  constructor() {
    this.deserialize({
      gender: true,
      marital_status: false,
    });
  }

  deserialize(input: Partial<UserInput>): User {
    if (!input) {
      return this;
    }

    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      city: this.city,
      district: this.district,
      address: this.address,
      gender: this.gender,
      marital_status: this.marital_status,
      day: this.day,
      month: this.month,
      year: this.year,
      role: this.role,
      id: this.id,
    };

    return data;
  }

  formpasswordString() {
    const data = {
      password: this.password,
      new_password: this.new_password,
      confirm_new_password: this.confirm_new_password,
    };

    return data;
  }
}

