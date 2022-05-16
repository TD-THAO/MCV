import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  getApplications() {
    return this.getOne(`applications`);
  }

  createAndUpdate(userId: string, data: any) {
    return this.post(`applications/${userId}`, data);
  }

  remove(userId: string) {
    return this.delete(`applications/${userId}`);
  }
}

export default new ApplicationApi();
