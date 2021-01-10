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
                  placeholder="Vị trí/việc làm cần ứng tuyển"
                  v-model="application.position"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="years_experience">Số năm kinh nghiệm <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="years_experience"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.years_experience">
                  <option value="" disabled hidden>Chọn số năm kinh nghiệm</option>
                  <option v-for="(item, index) in yearsExperience" :key="index">
                    {{ item }}
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
                <select class="form-control" v-model="application.career">
                  <option value="" disabled hidden>Ngành nghề</option>
                  <option v-for="(item, index) in careers" :key="index">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="rank">Cấp bậc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="rank"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.rank">
                  <option value="" disabled hidden>Cấp bậc</option>
                  <option v-for="(item, index) in ranks" :key="index">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>

          <div class="col-6">
             <div class="form-group">
              <label for="academic_level">Trình độ học vấn <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="academic_level"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.academic_level">
                  <option value="" disabled hidden>Trình độ học vấn</option>
                  <option v-for="(item, index) in levels" :key="index">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

             <div class="form-group">
              <label for="workplace">Nơi làm việc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="workplace"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.workplace">
                  <option value="" disabled hidden>Chọn nơi làm việc mà bạn muốn</option>
                  <option v-for="(item, index) in workplaces" :key="index">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="type_work">Loại hình công việc <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="type_work"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.type_work">
                  <option value="" disabled hidden>Chọn loại hình công việc</option>
                  <option v-for="(item, index) in type_works" :key="index">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="salary">Mức lương <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="salary"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="application.salary">
                  <option value="" disabled hidden>Chọn mức lương bạn muốn</option>
                  <option v-for="(item, index) in salaries" :key="index" :value="item.type">
                    {{ item.value }}
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
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Application } from '@/shared/models/application';
import ApplicationApi from '@/shared/api/Application';
import Toast from '@/shared/utils/Toast';

import {
  RANKS,
  LEVELS,
  SALARIES,
  TYPES_WORK,
  YEARS_EXPERENCY,
  CAREERS,
} from '@/shared/constants/application';
import { CITIES} from '@/shared/constants/cities';
import { mapState } from 'vuex';
import { Authenticate } from '@/shared/models/authenticate';
import PageLoader from '@/components/PageLoader.vue';

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
export default class ApplicationInfomation extends Vue {
  application: Application = new Application();
  auth: Authenticate;
  userId: string = '';

  isLoading: boolean = false;
  isNew: boolean = false;

  yearsExperience = YEARS_EXPERENCY;
  careers = CAREERS;
  ranks = RANKS;
  levels = LEVELS;
  workplaces = CITIES;
  type_works = TYPES_WORK;
  salaries = SALARIES;

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
    if (this.isNew) {
      this.createApplication();
      return;
    }
    this.updateApplication();
  }

  createApplication() {
    this.isLoading = true;
    ApplicationApi.createWithKey(this.userId, this.application.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật hồ sơ thành công');
      this.isLoading = false;
      this.isNew = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  updateApplication() {
    this.isLoading = true;
    ApplicationApi.update(this.userId, this.application.formJSONString())
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

    ApplicationApi.getApplicationInfo(uid)
    .then((res: any) => {
      this.isLoading = false;
      if (!res) {
        this.isNew = true;
        return;
      }
      this.isNew = false;
      this.application = new Application().deserialize(res);
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
