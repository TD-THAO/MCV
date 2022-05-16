import { Deserializable } from '../interfaces/deserialize';

export interface TemplateInput {
  id: number | string;
  name: string;
  image_name: string;
}

export class Template implements Deserializable<Template>, TemplateInput {
  id: number | string;
  name: string = '';
  image_name: string = '';

  get image_url() {
    return `/img/${this.image_name}`
  }
  constructor() {
    this.deserialize({});
  }

  deserialize(input: Partial<TemplateInput>): Template {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      template_id: this.id,
      name: this.name,
      image_name: this.image_name,
    };

    return data;
  }
}

