import { Deserializable } from '@/shared/interfaces/deserialize';
import { Category } from './category';

export interface ProductInput {
  id?: string | null;
  name: string;
  category: Category;
}

export class Product implements Deserializable<Product>, ProductInput {
  name: string = '';
  id?: string|null = null;
  category: Category;

  constructor() {
    this.deserialize({
      category: new Category(),
    });
  }

  deserialize(input: Partial<ProductInput>): Product {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    if (input.category) {
      this.category = new Category().deserialize(input.category);
    }
    return this;
  }

  formJSONData() {
    return {
      name: this.name,
      category: {
        id: this.category.id,
        name: this.category.name,
      },
    };
  }
}

