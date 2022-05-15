<template>
  <div>
    <div v-if="!isLoading"
      class="bg-white px-4 py-3 c-card text-left mx-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Trang trí mẫu hồ sơ</h5>
      </div>

      <div class="mb-3 d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-primary mr-3"
          @click="changeTemplate"
        >
          Đổi mẫu
        </button>

        <button
          type="button"
          class="btn btn-primary"
          @click="sendCV"
        >
          Gửi CV
        </button>
      </div>

      <div class="CV-template">
        <Template1 v-if="!isLoading"
          :user="user"
          :resume="resume"
          :certificates="certificates"
          :experiences="experiences"
          :languages="languages"
          :skills="skills"
          :application="application"
          :classes="initTemplateClass()"
        />
      </div>
    </div>
    <PageLoader v-else/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
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
import { Authenticate } from '@/shared/models/authenticate';
import { User } from '@/shared/models/user';
import { Resume } from '@/shared/models/resume';
import { Certificate } from '@/shared/models/certificate';
import { Experience } from '@/shared/models/experience';
import { Language } from '@/shared/models/language';
import { Application } from '@/shared/models/application';

@Component({
  components: {
    Template1,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})

export default class DetailTemplate extends Vue {
  isLoading: boolean = false;
  userId: string = '';
  auth: Authenticate;
  user: User = new User();
  resume: Resume = new Resume();
  certificates: Certificate[] = [];
  experiences: Experience[] = [];
  languages: Language[] = [];
  skills: String[] = [];
  application: Application = new Application();
  isSubmitting: boolean = false;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.initData(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.initData(this.auth.uid);
    }
    console.log(this.application, 111)
  }

  showTemplate(id: string) {
    return id === this.$route.params.id
  }

  initTemplateClass() {
    switch (this.$route.params.id) {
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
      const resUser = await UserApi.getUserInfo(uid);
      const resResume = await ResumeApi.getResume(uid);
      const resCertificate = this.convertData(await CertificateApi.getCertificate(uid));
      const resExperience =  this.convertData(await ExperienceApi.getExperiences(uid));
      const resSkill = await SkillApi.getSkills(uid);
      const resLanguage =  this.convertData(await LanguageApi.getLanguages(uid));
      const data = {
        user: resUser,
        resume: resResume,
        certificates: resCertificate,
        experiences: resExperience,
        skills: resSkill,
        languages: resLanguage,
      }
      this.application = new Application().deserialize(data)
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

  changeTemplate() {
    this.$router.push(`/admin/templates`);
  }

  sendCV() {
    console.log(this.application)
    ApplicationApi
      .createAndUpdate(this.userId, this.application.formJSONString())
      .then((res: any) => {
        Toast.success('Đã gửi CV thành công');
        this.isSubmitting = false;
      })
      .catch((error: any) => {
        this.isSubmitting = false;
        Toast.handleError(error);
      });
  }
}
</script>

<style scoped lang="scss">

</style>
