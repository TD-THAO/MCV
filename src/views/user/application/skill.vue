<template>
  <div class="card text-left c-card mx-3">
    <ValidationObserver ref="personalInfoForm" tag="form">
      <div class="card-header">
        <h3 class="card-title">Kỹ năng</h3>
      </div>
      <div class="card-body">
        <div class="c-form">
          <div class="row">
            <div class="col-4" v-for="(skill, index) in skills" :key="index">
              <div class="form-group">
                <label class="c-control c-control-checkbox">{{ skill.label }}
                  <input class="c-control-input"
                    type="checkbox"
                    name="gender"
                    :value="skill.value"
                    :id="skill.value"
                    v-model="selectedSkills"
                  >
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-right">
        <button
          type="button"
          class="btn btn-primary"
          @click="handleSubmit"
        >
          Lưu
        </button>
      </div>
    </ValidationObserver>

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import PageLoader from '@/components/PageLoader.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import Toast from '@/shared/utils/Toast';
import SkillApi from '@/shared/api/Skill';
import { User } from '@/shared/models/user';
import { SKILLS } from '@/shared/constants/skill';

@Component({
  components: {
    PageLoader,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class SkillInfomation extends Vue {
  user: User;
  isLoading: boolean = false;
  skills = SKILLS;
  selectedSkills: string[] = [];

  @Watch('user')
  watchAuth(newVal: User, oldVal: User) {
    if (newVal) {
      this.getSkills(this.user.id);
    }
  }

  mounted() {
    if (this.user.id) {
      this.getSkills(this.user.id);
    }
  }

  handleSubmit() {
    this.isLoading = true;
    SkillApi.create(this.user.id, this.selectedSkills)
    .then((res: any) => {
      Toast.success('Thêm kỹ năng thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getSkills(id: string) {
    this.isLoading = true;
    SkillApi.getSkills(this.user.id)
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
