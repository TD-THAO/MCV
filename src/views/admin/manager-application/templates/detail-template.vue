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
import { Authenticate } from '@/shared/models/authenticate';
import { User } from '@/shared/models/user';
import { Resume } from '@/shared/models/resume';
import { Certificate } from '@/shared/models/certificate';
import { Experience } from '@/shared/models/experience';
import { Language } from '@/shared/models/language';

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
      const resCertificate = await CertificateApi.getCertificate(uid);
      const resExperience = await ExperienceApi.getExperiences(uid);
      const resSkill = await SkillApi.getSkills(uid);
      const resLanguage = await LanguageApi.getLanguages(uid);

      if (resUser) {
        this.user = new User().deserialize(resUser);
      }

      if (resResume) {
        this.resume = new Resume().deserialize(resResume);
      }

      if (resCertificate) {
        const result = this.convertData(resCertificate);
        this.certificates = result.map((item: Certificate) => new Certificate().deserialize(item));
      }

      if (resExperience) {
        const result = this.convertData(resExperience);
        this.experiences = result.map((item: Experience) => new Experience().deserialize(item));
      }

      if (resSkill) {
        this.skills = resSkill
      }

      if (resLanguage) {
        const result = this.convertData(resLanguage);
        this.languages = result.map((item: Language) => new Language().deserialize(item));
      }
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

  sendCV() {}
}
</script>

<style scoped lang="scss">

</style>
