<template>
  <div class="mx-3 py-3">
    <div class="d-flex justify-content-end mb-3">
      <button
        type="button"
        class="btn btn-primary"
        :disabled="invalid"
        @click="submitForm"
      >
        Thêm
      </button>
    </div>

    <div class="bg-white px-4 py-3 c-card text-left">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Học vấn bằng cấp</h5>
      </div>
      <ValidationObserver ref="personalInfoForm" tag="form" v-slot="{ invalid }">
        <div class="c-form">
          <div class="row">
            <div class="col-6">
            <div class="form-group">
                <label for="training_center">Trường, cơ sở, trung tâm đào tạo <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="training_center"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control" v-model="education.training_center">
                    <option value="" disabled hidden>Chọn tên trường</option>
                    <option v-for="(item, index) in training_places" :key="index">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="name_certificate">Tên bằng cấp chứng chỉ <span class="icon-required">*</span></label>

                <ValidationProvider
                  name="name_certificate"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="name_certificate"
                    placeholder="VD: Kỹ sư CNTT..."
                    v-model="education.name_certificate"
                  />

                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="start_at">Thời gian bắt đầu nhập học <span class="icon-required">*</span></label>

                <div class="row">
                  <div class="col-6">
                    <select class="form-control" v-model="education.start_at_month">
                      <option value="" disabled hidden>Chọn tháng</option>
                      <option v-for="(item, index) in months" :key="index">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="col-6">
                    <select class="form-control" v-model="education.start_at_year">
                      <option value="" disabled hidden>Chọn năm</option>
                      <option v-for="(item, index) in years" :key="index">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6">
            <div class="form-group">
                <label for="faculty_training">Khoa đào tạo <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="faculty_training"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control" v-model="education.faculty_training">
                    <option value="" disabled hidden>Chọn tên khoa</option>
                    <option v-for="(item, index) in facultys" :key="index">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="rate">Xếp loại <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="rate"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control" v-model="education.rate">
                    <option value="" disabled hidden>Chọn xếp loại</option>
                    <option v-for="(item, index) in rates" :key="index">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

                <div class="form-group">
                <label for="end_at">Thời gian kết thúc <span class="icon-required">*</span></label>

                <div class="row">
                  <div class="col-6">
                    <select class="form-control" v-model="education.end_at_month">
                      <option value="" disabled hidden>Chọn tháng</option>
                      <option v-for="(item, index) in months" :key="index">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="col-6">
                    <select class="form-control" v-model="education.end_at_year">
                      <option value="" disabled hidden>Chọn năm</option>
                      <option v-for="(item, index) in years" :key="index">
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
                Lưu
              </button>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Education } from '@/shared/models/education';
import { MONTH, YEAR } from '@/shared/constants/date';
import { RATES, FACULTYS, TRAINING_PLACES } from '@/shared/constants/education';
import { mapState } from 'vuex';
import { Authenticate } from '@/shared/models/authenticate';
import EducationApi from '@/shared/api/Education';
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
export default class EducationInfomation extends Vue {
  education: Education = new Education();
  auth: Authenticate;
  userId: string = '';

  isLoading: boolean = false;
  isNew: boolean = false;

  training_places: string[] = TRAINING_PLACES;
  facultys: string[] = FACULTYS;
  rates: string[] = RATES;
  months: number[] = MONTH;
  years: number[] = YEAR;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getEducationInfo(newVal.uid);
  }

  mounted() {
    console.log(333333)
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getEducationInfo(this.auth.uid);
    }
  }

  submitForm() {
    if (this.isNew) {
      this.createEducation();
      return;
    }
    this.updateEducation();
  }

  createEducation() {
    this.isLoading = true;
    EducationApi.create(this.userId, this.education.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật bằng cấp thành công');
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
    EducationApi.update(this.userId, this.education.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật bằng cấp thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getEducationInfo(uid: string) {
    this.isLoading = true;

    EducationApi.getEducation(uid)
    .then((res: any) => {
      this.isLoading = false;
      if (!res) {
        this.isNew = true;
        return;
      }
      this.isNew = false;
      this.education = new Education().deserialize(res);
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
