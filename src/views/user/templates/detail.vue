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
import { User } from '@/shared/models/user';
import { Application } from '@/shared/models/application';

@Component({
  components: {
    Template1,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})

export default class DetailTemplate extends Vue {
  isLoading: boolean = false;
  user: User;
  application: Application = new Application();
  isSubmitting: boolean = false;

  @Watch('user')
  watchAuth(newVal: User, oldVal: User) {
    if (newVal) {
      this.initData(this.user.id);
    }
  }

  mounted() {
    if (this.user.id) {
      this.initData(this.user.id);
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
      const user = await UserApi.getUserInfo(uid);
      const resume = await ResumeApi.getResume(uid);
      const certificates = this.convertData(await CertificateApi.getCertificate(uid));
      const experiences =  this.convertData(await ExperienceApi.getExperiences(uid));
      const skills = await SkillApi.getSkills(uid);
      const languages =  this.convertData(await LanguageApi.getLanguages(uid));
      const data = {
        user,
        resume,
        certificates,
        experiences,
        skills,
        languages,
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
    this.$router.push(`/user/templates`);
  }

  sendCV() {
    console.log(this.application)
    ApplicationApi
      .createAndUpdate(this.user.id, this.application.formJSONString())
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
