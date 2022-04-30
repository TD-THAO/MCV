import BaseApi from './BaseApi';

class ExperienceApi extends BaseApi {
  getExperiences(userId: string) {
    return this.getOne(`experiences/${userId}`);
  }

  create(userId: string, data: any) {
    return this.postWithAutoKey(`experiences/${userId}`, data);
  }

  update(userId: string, expId: string, data: any) {
    return this.post(`experiences/${userId}/${expId}`, data);
  }

  remove(userId: any, expId: string) {
    return this.delete(`experiences/${userId}/${expId}`);
  }
}

export default new ExperienceApi();
