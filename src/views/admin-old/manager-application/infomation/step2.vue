<template>
  <div class="card text-left c-card mx-3">
    <ValidationObserver ref="personalInfoForm" tag="form">
      <div class="card-header">
        <h3 class="card-title">Thông tin tổng quan</h3>
      </div>
      <div class="card-body">
        <div class="c-form">
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label
                for="position"
                class="c-form__label"
              >
                Vị trí/việc làm cần ứng tuyển<span class="icon-required">*</span>
              </label>

              <ValidationProvider
                name="position"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="position"
                  placeholder="Vui lòng nhập vị trí/ việc làm cần ứng tuyển"
                  v-model="resume.position"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="academic_level"
                class="c-form__label"
              >
                Trình độ học vấn <span class="icon-required">*</span>
              </label>
              <ValidationProvider
                name="academic_level"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.academic_level"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn trình độ học vấn</option>
                  <option v-for="item in academicLevels"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="year_experience"
                class="c-form__label"
              >
                Số năm kinh nghiệm <span class="icon-required">*</span>
              </label
              >
              <ValidationProvider
                name="year_experience"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.year_experience"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn số năm kinh nghiệm</option>
                  <option v-for="item in yearsExperience"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="rank"
                class="c-form__label"
              >
                Cấp bậc <span class="icon-required">*</span>
              </label>
              <ValidationProvider
                name="rank"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.rank"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn cấp bậc</option>
                  <option v-for="item in ranks"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label
                for="min_expected_salary"
                class="c-form__label"
              >
                Mức lương<span class="icon-required">*</span>
              </label>

              <ValidationProvider
                name="min_expected_salary"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="min_expected_salary"
                  placeholder="Vui lòng nhập mức lương"
                  v-model="resume.min_expected_salary"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="workplace"
                class="c-form__label"
              >
                Nơi làm việc <span class="icon-required">*</span>
              </label>
              <ValidationProvider
                name="workplace"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.workplace"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn nơi làm việc</option>
                  <option v-for="item in cities"
                    :key="item"
                    :value="item">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="work_time"
                class="c-form__label"
              >
                Hình thức làm việc <span class="icon-required">*</span>
              </label>
              <ValidationProvider
                name="work_time"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.work_time"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn hình thức làm việc</option>
                  <option v-for="item in workTimes"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label
                for="career"
                class="c-form__label"
              >
                Ngành nghề <span class="icon-required">*</span>
              </label>
              <ValidationProvider
                name="career"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.career"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn ngành nghề</option>
                  <option v-for="item in careers"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <label
                for="company"
                class="c-form__label"
              >
                Mục tiêu nghề nghiệp <span class="icon-required">*</span>
              </label>

              <ValidationProvider
                name="company"
                rules="required"
                v-slot="{ errors }"
              >
                <textarea class="form-control form-control-lg"
                  placeholder="Vui lòng nhập mô tả"
                  v-model="resume.describe"
                >
                </textarea>

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="card-footer text-right">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="invalid"
          @click="submitForm"
        >
          Lưu
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Toast from '@/shared/utils/Toast';
import PageLoader from '@/components/PageLoader.vue';
import {
  RANKS,
  ACADEMIC_LEVELS,
  YEARS_EXPERIENCE,
  WORK_TIMES,
  CAREERS
} from '@/shared/constants/resume';
import { CITIES} from '@/shared/constants/address';
import { Authenticate } from '@/shared/models/authenticate';
import { Resume } from '@/shared/models/resume';
import ResumeApi from '@/shared/api/Resume';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class ResumeInfomation extends Vue {
  auth: Authenticate;
  userId: string = '';
  isLoading: boolean = false;
  yearsExperience = YEARS_EXPERIENCE;
  ranks = RANKS;
  academicLevels = ACADEMIC_LEVELS;
  cities = CITIES;
  workTimes = WORK_TIMES;
  careers = CAREERS;
  resume: Resume = new Resume();

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getApplicationInfo(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getApplicationInfo(this.auth.uid);
    }
  }

  submitForm() {
    this.createAndUpdateResume();
  }

  createAndUpdateResume() {
    this.isLoading = true;
    ResumeApi.createAndUpdate(this.userId, this.resume.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật hồ sơ thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getApplicationInfo(uid: string) {
    this.isLoading = true;

    ResumeApi.getResume(uid)
    .then((res: any) => {
      this.isLoading = false;
      this.resume = new Resume().deserialize(res);
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
