import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  createWithKey(id: string, data: any) {
    return this.post('users', id, data);
  }

  update(id: string, data: any) {
    return this.post('users', id, data);
  }

  getUserInfo(id: string) {
    return this.getOne('users', id);
  }
}

export default new UserApi();
