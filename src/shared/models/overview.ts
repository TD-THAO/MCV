import { Deserializable } from '@/shared/interfaces/deserialize';

export interface OverviewInput {
  position: string;
  academic_level: string;
  years_experience: number | string;
  workplace: string;
  career: string;
  type_work: string;
  rank: string;
  min_expected_salary: number | string;
  max_expected_salary: number | string;
}

export class Overview implements Deserializable<Overview>, OverviewInput {
  position: string;
  academic_level: string = '';
  years_experience: number | string = '';
  workplace: string = '';
  career: string = '';
  type_work: string = '';
  rank: string = '';
  min_expected_salary: number | string = '';
  max_expected_salary: number | string = '';

  constructor() {
    this.deserialize({});
  }

  deserialize(input: Partial<OverviewInput>): Overview {
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
      years_experience: this.years_experience,
      workplace: this.workplace,
      career: this.career,
      type_work: this.type_work,
      rank: this.rank,
      min_expected_salary: this.min_expected_salary,
    };

    return data;
  }
}

