import { Deserializable } from '@/shared/interfaces/deserialize';

export interface ExperienceInput {
  name_job: string;
  company: string;
  start_at_month: number | string;
  end_at_month: number | string;
  start_at_year: number | string;
  end_at_year: number | string;
}

export class Experience implements Deserializable<Experience>, ExperienceInput {
  name_job: string;
  company: string;
  start_at_month: number | string = '';
  end_at_month: number | string = '';
  start_at_year: number | string = '';
  end_at_year: number | string = '';

  constructor() {
    this.deserialize({

    });
  }

  deserialize(input: Partial<ExperienceInput>): Experience {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formExperienceString() {
    const data = {
      name_job: this. name_job,
      company: this.company,
      start_at_month: this.start_at_month,
      end_at_month: this.end_at_month,
      start_at_year: this.start_at_year,
      end_at_year: this.end_at_year,
    };

    return data;
  }
}

