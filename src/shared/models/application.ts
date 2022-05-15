import { Deserializable } from '@/shared/interfaces/deserialize';
import { User } from './user';
import { Resume } from './resume';
import { Certificate } from './certificate';
import { Language } from './language';
import { Experience } from './experience';
import { Template } from './template';

export interface ApplicationInput {
  id: string;
  user: User;
  resume: Resume;
  template: Template;
  certificates: Certificate[];
  languages: Language[];
  skills: string[];
  experiences: Experience[];
}

export class Application implements Deserializable<Application>, ApplicationInput {
  id: string = '';
  user: User = new User();
  resume: Resume = new Resume();
  template: Template = new Template();
  certificates: Certificate[] = [];
  languages: Language[] = [];
  skills: string[] = [];
  experiences: Experience[] = [];

  // constructor() {
  //   this.deserialize({
  //     resume: new Resume(),
  //     certificates: [],
  //   });
  // }

  deserialize(input: Partial<ApplicationInput>): Application {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    if (input.user) {
      this.user = new User().deserialize(input.user);
    }
    if (input.resume) {
      this.resume = new Resume().deserialize(input.resume);
    }
    if (input.template) {
      this.template = new Template().deserialize(input.template);
    }
    if (input.certificates) {
      this.certificates = input.certificates.map((item: Certificate) =>
        new Certificate().deserialize(item)
      );
    }
    if (input.experiences) {
      this.experiences = input.experiences.map((item: Experience) =>
        new Experience().deserialize(item)
      );
    }
    if (input.languages) {
      this.languages = input.languages.map((item: Language) =>
        new Language().deserialize(item)
      );
    }
    if (input.skills) {
      this.skills = input.skills;
    }
    return this;
  }

  formJSONString() {
    const data = {
      user: this.user,
      resume: this.resume,
      template: this.template,
      certificates: this.certificates,
      experiences: this.experiences,
      languages: this.languages,
      skills: this.skills,
    };

    return data;
  }
}

