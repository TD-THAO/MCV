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
                  <option v-for="item in yearsExperience" :key="item">
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
                  <option v-for="item in careers" :key="item">
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
                  <option v-for="item in ranks" :key="item">
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
                  <option v-for="item in academic_levels" :key="item">
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
                  <option v-for="item in workplaces" :key="item">
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
                  <option v-for="item in type_works" :key="item">
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
                  <option v-for="item in salaries" :key="item">
                    {{ item }}
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
              @click="updateInfo"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Application } from '@/shared/models/application';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ApplicationInfomation extends Vue {
  application: Application = new Application();
  yearsExperience = [1, 2, 3];
  careers = ['IT'];
  ranks = [
    'Mới tốt nghiệp/Thực tập sinh',
    'Junior Developer',
    'Senior Developer',
    'Lead Developer',
    'Architect',
    'Project Manager',
    'Product Manager',
    'Developer Manager',
    'Senior Leadership',
  ];
  academic_levels = [
    'Trung Học',
    'Trung Cấp',
    'Cao Đẳng',
    'Đại Học',
    'Kỹ Sư',
    'Cử nhân',
    'Thạc Sĩ',
    'Tiến Sĩ',
  ];
  workplaces = [
    'Đà Nẵng',
  ];
  type_works = [
    'Thực tập',
    'Part time',
    'Full time',
    'Theo hợp đồng/ tư vấn',
  ];
  salaries = [
    '1-5 triệu trở lên',
    '5-10 triệu trở lên',
    '10-15 triệu trở lên',
    '15-20 triệu trở lên',
    '30 triệu trở lên',
  ];

  mounted() {
    console.log(this.application);

    this.getApplicationInfo();
  }

  updateInfo() {
    // Call api to update user info
    console.log(this.application.formApplicationString());
  }

  getApplicationInfo() {
    const data = {
      // name: 'Da Thao',
      // email: 'tdthao29@gmail.com',
      // phone: '0777919749',
      // city: '',
      // district: '',
      // address: '',
      // gender: true,
      // marital_status: false,
      // day: '',
      // month: '',
      // year: '',
    };

    this.application = new Application().deserialize(data);
  }
}
</script>

<style scoped lang='scss'>
// @import 'PersonalInfomation.scss';
</style>
