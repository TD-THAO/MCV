import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getCategory(userId: string) {
    return this.getOne(`categories/${userId}`);
  }

  getCategories(params?: any) {
    return this.get('categories');
  }

  create(data: any) {
    return this.postWithAutoKey('categories', data);
  }

  update(userId: any, data: any) {
    return this.post(`categories/${userId}`, data);
  }

  remove(userId: any, data: any) {
    return this.delete(`categories/${userId}`, data);
  }
}

export default new CategoryApi();
