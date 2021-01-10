import BaseApi from './BaseApi';

class ApplicationApi extends BaseApi {
  createWithKey(id: string, data: any) {
    return this.post('applications', id, data);
  }

  update(id: string, data: any) {
    return this.post('applications', id, data);
  }

  getApplicationInfo(id: string) {
    return this.getOne('applications', id);
  }
}

export default new ApplicationApi();
