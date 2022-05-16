import { Deserializable } from '../interfaces/deserialize';

export interface CertificateInput {
  id: string;
  title: string;
  career_name: string;
  school_name: string;
  specialized: string;
  start_at: string;
  end_at: string;
  gra_certificate: string;
  info: string;
}

export class Certificate implements Deserializable<Certificate>, CertificateInput {
  id: string;
  title: string = '';
  career_name: string = '';
  school_name: string = '';
  specialized: string = '';
  start_at: string = '';
  end_at: string = '';
  gra_certificate: string = '';
  info: string = '';

  constructor() {
    // this.deserialize({});
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
      start_at: this.start_at,
      end_at: this.end_at,
      gra_certificate: this.gra_certificate,
      info: this.info,
    };

    return data;
  }
}

