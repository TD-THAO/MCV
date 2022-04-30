<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="mb-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Kỹ năng</h5>
      </div>

      <div class="c-form">
        <div class="row">
          <div class="col-4" v-for="(skill, index) in skills" :key="index">
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="skill.value"
                  v-model="selectedSkills"
                  :id="skill.value"
                />
                <label
                  class="form-check-label"
                  :for="skill.value">
                  {{ skill.label }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="handleSubmit"
      >
        Lưu
      </button>
    </div>

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Toast from '@/shared/utils/Toast';
import SkillApi from '@/shared/api/Skill';
import { Authenticate } from '@/shared/models/authenticate';
import { SKILLS } from '@/shared/constants/skill';
import PageLoader from '@/components/PageLoader.vue';

@Component({
  components: {
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class SkillInfomation extends Vue {
  auth: Authenticate;
  userId: string = '';
  isLoading: boolean = false;
  skills = SKILLS;
  selectedSkills: string[] = [];

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getSkills(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getSkills(this.userId);
    }
  }

  handleSubmit() {
    this.isLoading = true;
    SkillApi.create(this.userId, this.selectedSkills)
    .then((res: any) => {
      Toast.success('Thêm kỹ năng thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getSkills(userId: string) {
    this.isLoading = true;
    SkillApi.getSkills(this.userId)
    .then((res: any) => {
      this.selectedSkills = res || [];
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
