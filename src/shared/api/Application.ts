import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  getApplications(userId: string) {
    return this.getOne(`applications/${userId}`);
  }

  createAndUpdate(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }
}

export default new ApplicationApi();
