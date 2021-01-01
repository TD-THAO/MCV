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
import { Experience } from '@/shared/models/experience';
import { MONTH, YEAR } from '@/shared/constants/date';
@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ExperienceInfomation extends Vue {
  experience: Experience = new Experience();
  months: number[] = MONTH;
  years: number[] = YEAR;

  mounted() {
    console.log(this.experience);

    this.getExperienceInfo();
  }

  addInfo() {
    // Call api to update user info
    console.log(this.experience.formExperienceString());
  }

  getExperienceInfo() {
    const data = {

    };

    this.experience = new Experience().deserialize(data);
  }
}
</script>

<style scoped lang='scss'>

</style>
