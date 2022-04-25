<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Thông tin hồ sơ</h5>
    </div>
    <ValidationObserver ref="personalInfoForm" tag="form" v-slot="{ invalid }">
      <div class="c-form">
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for="position">Vị trí/việc làm cần ứng tuyển<span class="icon-required">*</span></label>

              <ValidationProvider
                name="position"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  id="position"
                  placeholder="Vui lòng nhập vị trí/ việc làm cần ứng tuyển"
                  v-model="resume.position"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="academic_level">Trình độ học vấn <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="academic_level"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.academic_level"
                  class="form-control" >
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
              <label for="year_experience">Số năm kinh nghiệm <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="year_experience"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.year_experience"
                  class="form-control" >
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
              <label for="rank">Cấp bậc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="rank"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.rank"
                  class="form-control" >
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

            <div class="form-group">
              <label for="career">Ngành nghề <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="career"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.career"
                  class="form-control" >
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

          <div class="col-6">
            <div class="form-group">
              <label for="min_expected_salary">Mức lương<span class="icon-required">*</span></label>

              <ValidationProvider
                name="min_expected_salary"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  id="min_expected_salary"
                  placeholder="Vui lòng nhập mức lương"
                  v-model="resume.min_expected_salary"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="workplace">Nơi làm việc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="workplace"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.workplace"
                  class="form-control" >
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
              <label for="work_time">Hình thức làm việc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="work_time"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="resume.work_time"
                  class="form-control" >
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
          </div>

          <div class="col-12 text-right">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="invalid"
              @click="submitForm"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>

    <!-- <PageLoader v-if="isLoading"/> -->
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
