import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  create(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }

  update(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }

  getApplication(userId: string) {
    return this.getOne(`applications/${userId}`);
  }
}

export default new ApplicationApi();
