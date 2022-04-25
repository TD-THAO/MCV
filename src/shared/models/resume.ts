import { Deserializable } from '@/shared/interfaces/deserialize';

export interface ResumeInput {
  position: string;
  academic_level: string;
  year_experience: number | string;
  workplace: string;
  career: string;
  rank: string;
  min_expected_salary: number | string;
  max_expected_salary: number | string;
  work_time: string;
}

export class Resume implements Deserializable<Resume>, ResumeInput {
  position: string;
  academic_level: string = '';
  year_experience: number | string = '';
  workplace: string = '';
  career: string = '';
  rank: string = '';
  min_expected_salary: number | string = '';
  max_expected_salary: number | string = '';
  work_time: string = '';

  constructor() {
    this.deserialize({});
  }

  deserialize(input: Partial<ResumeInput>): Resume {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      position: this.position,
      academic_level: this.academic_level,
      year_experience: this.year_experience,
      workplace: this.workplace,
      career: this.career,
      rank: this.rank,
      min_expected_salary: this.min_expected_salary,
      work_time: this.work_time,
    };

    return data;
  }
}

