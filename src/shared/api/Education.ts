import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  create(userId: string, data: any) {
    return this.post(`educations/${userId}`, data);
  }

  update(userId: string, data: any) {
    return this.post(`educations/${userId}`, data);
  }

  getEducation(userId: string) {
    return this.getOne(`educations/${userId}`);
  }
}

export default new ApplicationApi();
