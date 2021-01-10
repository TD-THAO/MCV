<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Kinh nghiệm làm việc</h5>
    </div>
    <ValidationObserver ref="experienceForm" tag="form" v-slot="{ invalid }">
      <div class="c-form">
        <div class="row">
          <div class="col-6">
           <div class="form-group">
              <label for="name_job">Chức năng/ vị trí <span class="icon-required">*</span></label>

              <ValidationProvider
                name="name_job"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  id="name_job"
                  placeholder="Vui lòng nhập chức danh/ vị trí"
                  v-model="experience.name_job"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

             <div class="form-group">
              <label for="start_at">Thời gian bắt đầu</label>

              <div class="row">
                <div class="col-6">
                  <select class="form-control" v-model="experience.start_at_month">
                    <option value="" disabled hidden>Chọn tháng</option>
                    <option v-for="item in months" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <select class="form-control" v-model="experience.start_at_year">
                    <option value="" disabled hidden>Chọn năm</option>
                    <option v-for="item in years" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6">
           <div class="form-group">
              <label for="company">Công ty <span class="icon-required">*</span></label>

              <ValidationProvider
                name="company"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  id="company"
                  placeholder="Vui lòng nhập công ty"
                  v-model="experience.company"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

              <div class="form-group">
              <label for="end_at">Thời gian kết thúc</label>

              <div class="row">
                <div class="col-6">
                  <select class="form-control" v-model="experience.end_at_month">
                    <option value="" disabled hidden>Chọn tháng</option>
                    <option v-for="item in months" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <select class="form-control" v-model="experience.end_at_year">
                    <option value="" disabled hidden>Chọn năm</option>
                    <option v-for="item in years" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 text-right">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="invalid"
              @click="submitForm"
            >
              Thêm mới
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Experience } from '@/shared/models/experience';
import { MONTH, YEAR } from '@/shared/constants/date';
import { mapState } from 'vuex';
import { Authenticate } from '@/shared/models/authenticate';
import ExperienceApi from '@/shared/api/Experience';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class ExperienceInfomation extends Vue {
  experience: Experience = new Experience();
  auth: Authenticate;
  userId: string = '';

  isLoading: boolean = false;
  isNew: boolean = false;
  months: number[] = MONTH;
  years: number[] = YEAR;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getExpInfo(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getExpInfo(this.auth.uid);
    }
  }

  submitForm() {
    console.log(this.userId);

    if (this.isNew) {
      this.createEducation();
      return;
    }

    this.updateEducation();
  }

  createEducation() {
    this.isLoading = true;
    ExperienceApi.createWithKey(this.userId, this.experience.formJSONString())
    .then((res: any) => {
      Toast.success('Create kinh nghiệm thành công');
      this.isLoading = false;
      this.isNew = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  updateEducation() {
    this.isLoading = true;
    ExperienceApi.update(this.userId, this.experience.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật kinh nghiệm thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getExpInfo(uid: string) {
    this.isLoading = true;

    ExperienceApi.getApplicationInfo(uid)
    .then((res: any) => {
      this.isLoading = false;
      if (!res) {
        this.isNew = true;
        return;
      }
      this.isNew = false;
      this.experience = new Experience().deserialize(res);
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>

<style scoped lang='scss'>

</style>
