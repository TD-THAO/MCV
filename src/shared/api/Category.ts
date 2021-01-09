import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getCategory(id: string) {
    return this.getOne('categories', id);
  }

  getCategories(params?: any) {
    return this.get('categories');
  }

  create(data: any) {
    return this.postWithAutoKey('categories', data);
  }

  update(id: any, data: any) {
    return this.post('categories', id, data);
  }

  remove(id: any, data: any) {
    return this.delete('categories', id, data);
  }
}

export default new CategoryApi();
