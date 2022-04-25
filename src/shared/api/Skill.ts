import BaseApi from './BaseApi';

class SkillApi extends BaseApi {
  getSkill(userId: string) {
    return this.getOne(`skills/${userId}`);
  }

  create(userId: string, data: any) {
    return this.post(`skills/${userId}`, data);
  }
}

export default new SkillApi();
