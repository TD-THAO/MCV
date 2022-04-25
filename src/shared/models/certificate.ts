import { Deserializable } from '@/shared/interfaces/deserialize';

export interface CertificateInput {
  title: string;
  career_name: string;
  school_name: string;
  specialized: string;
  start_date: string;
  end_date: string;
  gra_certificate: string;
  info: string;
}

export class Certificate implements Deserializable<Certificate>, CertificateInput {
  title: string = '';
  career_name: string = ''
  school_name: string = ''
  specialized: string = ''
  start_date: string = ''
  end_date: string = ''
  gra_certificate: string = ''
  info: string = ''

  constructor() {
    this.deserialize({

    });
  }

  deserialize(input: Partial<CertificateInput>): Certificate {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    return this;
  }

  formJSONString() {
    const data = {
      title: this.title,
      career_name: this.career_name,
      school_name: this.school_name,
      specialized: this.specialized,
      start_date: this.start_date,
      end_date: this.end_date,
      gra_certificate: this.gra_certificate,
      info: this.info,
    };

    return data;
  }
}

