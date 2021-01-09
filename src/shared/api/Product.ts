import BaseApi from './BaseApi';

class ProductApi extends BaseApi {
  getProduct(id: string) {
    return this.getOne('products', id);
  }

  getProducts(params?: any) {
    return this.get('products');
  }

  create(data: any) {
    return this.postWithAutoKey('products', data);
  }

  update(id: any, data: any) {
    return this.post('products', id, data);
  }

  remove(id: any, data: any) {
    return this.delete('products', id, data);
  }
}

export default new ProductApi();
