<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
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
                  <option v-for="item in training_centers" :key="item">
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
                    <option v-for="item in months" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <select class="form-control" v-model="education.start_at_year">
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
              <label for="faculty_training">Khoa đào tạo <span class="icon-required">*</span></label
              >
              <ValidationProvider
                name="faculty_training"
                rules="required"
                v-slot="{ errors }"
              >
                <select class="form-control" v-model="education.faculty_training">
                  <option value="" disabled hidden>Chọn tên khoa</option>
                  <option v-for="item in faculty_trainings" :key="item">
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
                  <option v-for="item in rates" :key="item">
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
                    <option v-for="item in months" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <select class="form-control" v-model="education.end_at_year">
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
              @click="addInfo"
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
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Education } from '@/shared/models/education';
import { MONTH, YEAR } from '@/shared/constants/date';
@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class EducationInfomation extends Vue {
  education: Education = new Education();
  training_centers = ['hi'];
  faculty_trainings = [
    'Tin học',
    'Sư phạm tin',
  ];
  rates = [
    'Yếu',
    'Trung Bình',
    'Khá',
    'Giỏi',
    'Xuất sắc',
  ];

  months: number[] = MONTH;
  years: number[] = YEAR;

  mounted() {
    console.log(this.education);

    this.getEducationInfo();
  }

  addInfo() {
    // Call api to update user info
    console.log(this.education.formEducationString());
  }

  getEducationInfo() {
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

    this.education = new Education().deserialize(data);
  }
}
</script>

<style scoped lang='scss'>

</style>
