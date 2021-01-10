import BaseApi from './BaseApi';

class ExperienceApi extends BaseApi {
  createWithKey(id: string, data: any) {
    return this.post('experiences', id, data);
  }

  update(id: string, data: any) {
    return this.post('experiences', id, data);
  }

  getApplicationInfo(id: string) {
    return this.getOne('experiences', id);
  }
}

export default new ExperienceApi();
