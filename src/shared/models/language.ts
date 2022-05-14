import { Deserializable } from '../interfaces/deserialize';
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

