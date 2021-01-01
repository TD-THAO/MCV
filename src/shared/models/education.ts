import { Deserializable } from '@/shared/interfaces/deserialize';

export interface EducationInput {
  training_center: string;
  faculty_training: string;
  name_certificate: number | string;
  rate: string;
  start_at_month: number | string;
  end_at_month: number | string;
  start_at_year: number | string;
  end_at_year: number | string;
}

export class Education implements Deserializable<Education>, EducationInput {
  training_center: string = '';
  faculty_training: string = '';
  name_certificate: string = '';
  rate: string = '';
  start_at_month: number | string = '';
  end_at_month: number | string = '';
  start_at_year: number | string = '';
  end_at_year: number | string = '';

  constructor() {
    this.deserialize({

    });
  }

  deserialize(input: Partial<EducationInput>): Education {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formEducationString() {
    const data = {
      training_center: this. training_center,
      faculty_training: this.faculty_training,
      name_certificate: this.name_certificate,
      rate: this.rate,
      start_at_month: this.start_at_month,
      end_at_month: this.end_at_month,
      start_at_year: this.start_at_year,
      end_at_year: this.end_at_year,
    };

    return data;
  }
}

