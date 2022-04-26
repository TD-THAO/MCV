import BaseApi from './BaseApi';

class CertificateApi extends BaseApi {
  getCertificate(userId: string) {
    return this.getOne(`certificate/${userId}`);
  }

  create(userId: string, data: any) {
    return this.postWithAutoKey(`certificate/${userId}`, data);
  }

  update(userId: string, expId: string, data: any) {
    return this.post(`certificate/${userId}/${expId}`, data);
  }

  remove(userId: any, expId: string) {
    return this.delete(`certificate/${userId}/${expId}`);
  }
}

export default new CertificateApi();
