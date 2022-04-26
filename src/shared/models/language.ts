import { Deserializable } from '@/shared/interfaces/deserialize';
import { LANGUAGE_NAME } from '../enums/language';

export interface LanguageInput {
  id: string;
  name: string;
  level: string;
}

export class Language implements Deserializable<Language>, LanguageInput {
  id: string;
  name: string = '';
  level: string = '';
  // get nameString() {
  //   // const typeName = typeof this.name;
  //   // const typeLang = typeof LANGUAGE_NAME['ENGLISH'];
  //   // const data = {
  //   //   name: typeName,
  //   //   language: typeLang
  //   // }
  //   return this.name ? LANGUAGE_NAME[this.name] : '';
  // }
  // nameStringF(name) {
  //   return LANGUAGE_NAME['name'];
  // }
  constructor() {
    this.deserialize({});
  }

  deserialize(input: Partial<LanguageInput>): Language {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      name: this.name,
      level: this.level,
    };

    return data;
  }
}

