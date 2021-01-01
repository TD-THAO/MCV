import { Deserializable } from '@/shared/interfaces/deserialize';

export interface ForeignLanguageInput {
  id: number;
  name: string;
  level: string;
}

export class ForeignLanguage implements Deserializable<ForeignLanguage>, ForeignLanguageInput {
  id: number;
  name: string = '';
  level: string = '';

  constructor() {
    this.deserialize({

    });
  }

  deserialize(input: Partial<ForeignLanguageInput>): ForeignLanguage {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }
}

