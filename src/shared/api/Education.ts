import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  createWithKey(id: string, data: any) {
    return this.post('educations', id, data);
  }

  update(id: string, data: any) {
    return this.post('educations', id, data);
  }

  getApplicationInfo(id: string) {
    return this.getOne('educations', id);
  }
}

export default new ApplicationApi();
