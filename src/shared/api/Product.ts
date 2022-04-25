import BaseApi from './BaseApi';

class ProductApi extends BaseApi {
  getProduct(userId: string) {
    return this.getOne(`products/${userId}`);
  }

  getProducts(params?: any) {
    return this.get('products');
  }

  create(data: any) {
    return this.postWithAutoKey('products', data);
  }

  update(userId: any, data: any) {
    return this.post(`products/${userId}`, data);
  }

  remove(userId: any, data: any) {
    return this.delete(`products/${userId}`, data);
  }
}

export default new ProductApi();
