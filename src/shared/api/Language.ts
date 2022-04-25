import BaseApi from './BaseApi';

class LanguageApi extends BaseApi {
  create(userId: string, data: any) {
    return this.postWithAutoKey(`languages/${userId}`, data);
  }

  update(userId: string, expId: string, data: any) {
    return this.post(`languages/${userId}/${expId}`, data);
  }

  getLanguages(userId: string) {
    return this.getOne(`languages/${userId}`);
  }

  remove(userId: any, expId: string) {
    return this.delete(`languages/${userId}/${expId}`);
  }
}

export default new LanguageApi();
