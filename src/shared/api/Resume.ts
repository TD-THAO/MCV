import BaseApi from './BaseApi';

class ResumeApi extends BaseApi {
  getResume(userId: string) {
    return this.getOne(`resumes/${userId}`);
  }

  createAndUpdate(userId: string, data: any) {
    return this.post(`resumes/${userId}`, data);
  }
}

export default new ResumeApi();
