<template>
  <div>
    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Chi tiết hồ sơ ứng viên</h3>
      </div>

      <div class="CV-template">
        <Template1 v-if="!isLoading"
          :application="application"
          :classes="templateClass"
        />
      </div>
    </div>
    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Toast from '@/shared/utils/Toast';
import PageLoader from '@/components/PageLoader.vue';
import Template1 from '@/components/templates/Template1.vue';
import UserApi from '@/shared/api/User';
import ResumeApi from '@/shared/api/Resume';
import CertificateApi from '@/shared/api/Certificate';
import ExperienceApi from '@/shared/api/Experience';
import SkillApi from '@/shared/api/Skill';
import LanguageApi from '@/shared/api/Language';
import ApplicationApi from '@/shared/api/Application';
import TemplateApi from '@/shared/api/Template';
import { User } from '@/shared/models/user';
import { Application } from '@/shared/models/application';

@Component({
  components: {
    Template1,
    PageLoader,
  },
})

export default class DetailTemplate extends Vue {
  isLoading: boolean = false;
  user: User;
  application: Application = new Application();
  isSubmitting: boolean = false;
  templateClass: string = '';

  get userId() {
    return this.$route.params.id;
  }

  mounted() {
    this.initData(this.userId);
  }

  showTemplate(id: string) {
    return id === this.$route.params.id
  }

  initTemplateClass(templateId: string) {
    switch (`${templateId}`) {
      case '2':
        return 'template--purple';
      case '3':
        return 'template--green';
      case '4':
        return 'template--blue';
      default:
        return 'template--orange';
    }
  }
  async initData(uid: string) {
    try {
      this.isLoading = true;
      const user = await UserApi.getUserInfo(uid);
      const resume = await ResumeApi.getResume(uid);
      const certificates = this.convertData(await CertificateApi.getCertificate(uid));
      const experiences =  this.convertData(await ExperienceApi.getExperiences(uid));
      const skills = await SkillApi.getSkills(uid);
      const languages =  this.convertData(await LanguageApi.getLanguages(uid));
      const template =  await TemplateApi.getTemplateUser(uid);
      const data = {
        user,
        resume,
        certificates,
        experiences,
        skills,
        languages,
        template
      }
      this.application = new Application().deserialize(data)
      this.templateClass = this.initTemplateClass(template.template_id);
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      Toast.handleError(error);
    }
  }

  convertData(data: any) {
    let array: any = []
    Object.keys(data).map((key) => {
      const item = {
        id: key,
        ...data[key]
      };
      array.push(item);
    });
    return array;
  }
}
</script>
