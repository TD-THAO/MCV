import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  getUserInfo(userId: string) {
    return this.getOne(`users/${userId}`);
  }

  create(userId: string, data: any) {
    return this.post(`users/${userId}`, data);
  }

  update(userId: string, data: any) {
    return this.post(`users/${userId}`, data);
  }
}

export default new UserApi();
