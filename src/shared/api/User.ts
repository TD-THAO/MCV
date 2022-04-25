import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  create(userId: string, data: any) {
    return this.post(`users/${userId}`, data);
  }

  update(userId: string, data: any) {
    return this.post(`users/${userId}`, data);
  }

  getUserInfo(userId: string) {
    return this.getOne(`users/${userId}`);
  }
}

export default new UserApi();
