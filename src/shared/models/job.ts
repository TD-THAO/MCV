import { Deserializable } from '../interfaces/deserialize';

export interface JobInput {
  id: string;
  position: string;
  work_time: string;
  workplace: string;
  min_expected_salary: string;
  max_expected_salary: string;
  describe: string;
  day: string;
  month: string;
  year: string;
}

export class Job implements Deserializable<Job>, JobInput {
  id: string;
  position: string = '';
  work_time: string = '';
  workplace: string = '';
  min_expected_salary: string = '';
  max_expected_salary: string = '';
  describe: string = '';
  day: string = '';
  month: string = '';
  year: string = '';

  get dateString() {
    if (this.day && this.month && this.year) {
      return `${this.day}/${this.month}/${this.year}`;
    }
  }

  constructor() {
    // this.deserialize({});
  }

  deserialize(input: Partial<JobInput>): Job {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      position: this.position,
      day: this.day,
      month: this.month,
      year: this.year,
      work_time: this.work_time,
      workplace: this.workplace,
      min_expected_salary: this.min_expected_salary,
      max_expected_salary: this.max_expected_salary,
      describe: this.describe,
    };

    return data;
  }
}

