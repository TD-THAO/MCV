import BaseApi from './BaseApi';

class TemplateApi extends BaseApi {
  getTemplates() {
    return this.get(`templates`);
  }

  create(data: any) {
    return this.postWithAutoKey(`templates`, data);
  }

  update(userId: string, data: any) {
    return this.post(`templates-user/${userId}`, data);
  }

  getTemplateUser(userId: string) {
    return this.getOne(`templates-user/${userId}`);
  }
}

export default new TemplateApi();
