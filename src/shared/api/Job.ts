import BaseApi from './BaseApi';

class JobApi extends BaseApi {
  getJobs() {
    return this.getOne(`jobs`);
  }

  create(data: any) {
    return this.postWithAutoKey(`jobs`, data);
  }

  update(jobId: string, data: any) {
    return this.post(`jobs/${jobId}`, data);
  }

  remove(jobId: string) {
    return this.delete(`jobs/${jobId}`);
  }
}

export default new JobApi();
