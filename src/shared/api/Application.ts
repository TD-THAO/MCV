import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  getApplication(userId: string) {
    return this.getOne(`applications/${userId}`);
  }

  create(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }

  update(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }
}

export default new ApplicationApi();
