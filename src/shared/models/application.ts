import { Deserializable } from '@/shared/interfaces/deserialize';

export interface ApplicationInput {
  position: string;
  academic_level: string;
  years_experience: number | string;
  workplace: string;
  career: string;
  type_work: string;
  rank: string;
  salary: number | string;
}

export class Application implements Deserializable<Application>, ApplicationInput {
  position: string;
  academic_level: string = '';
  years_experience: number | string = '';
  workplace: string = '';
  career: string = '';
  type_work: string = '';
  rank: string = '';
  salary: number | string = '';

  constructor() {
    this.deserialize({

    });
  }

  deserialize(input: Partial<ApplicationInput>): Application {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formApplicationString() {
    const data = {
      position: this.position,
      academic_level: this.academic_level,
      years_experience: this.years_experience,
      workplace: this.workplace,
      career: this.career,
      type_work: this.type_work,
      rank: this.rank,
      salary: this.salary,
    };

    return data;
  }
}

