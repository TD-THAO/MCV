<template>
  <modal
    class="basic-modal"
    height="auto"
    :name="name"
    :clickToClose="true"
    :scrollable="true"
    :width="750"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose', $event)"
  >
    <div class="modal-header">
      <h5 class="modal-title">{{ modalTitle }}</h5>
    </div>
    <ValidationObserver ref="experienceForm" tag="form" v-slot="{ invalid }">
      <div class="modal-body modal-body--custom">
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
          </div>
        </div>
      </div>

      <div class="modal-footer pt-2 pb-2 justify-content-center">
        <button class="btn btn-secondary btn-mw-100"
          type="button"
          :disabled="isLoading"
          @click="closeModal">
          Hủy
        </button>
        <button class="btn btn-primary btn-mw-100"
          type="button"
          :disabled="isSubmitting || invalid"
          @click="submitForm">
          {{ isEdit ? 'Sửa' : 'Thêm' }}
        </button>
      </div>
    </ValidationObserver>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Experience } from '@/shared/models/experience';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { MONTH, YEAR } from '@/shared/constants/date';
import Toast from '@/shared/utils/Toast';
import ExperienceApi from '@/shared/api/Experience';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCEEXperience extends Vue {
  @Prop(String) readonly name!: string;
  @Prop({default: false}) readonly isLoading!: boolean;
  experience: Experience = new Experience();
  isEdit: boolean = false;
  months: number[] = MONTH;
  years: number[] = YEAR;
  userId: string = '';
  modalTitle: string = 'Thêm kinh nghiệm làm việc';
  isSubmitting: boolean = false;

  beforeOpen(event: any) {
    this.experience = new Experience();
    this.isEdit = false;
    this.modalTitle = 'Thêm kinh nghiệm làm việc';
    if (event.params.user_id) {
      this.userId = event.params.user_id;
    }

    if (event.params.item) {
      this.modalTitle = 'Sửa kinh nghiệm làm việc';
      this.isEdit = true
      this.experience = event.params.item
    }
  }

  closeModal() {
    this.$modal.hide(this.name);
  }

  submitForm() {
    if (this.isEdit) {
      this.updateExperience()
      return
    }

    this.createExperience()
  }

  createExperience() {
    this.isSubmitting = true;
    ExperienceApi.create(this.userId, this.experience.formJSONString())
    .then((res: any) => {
      Toast.success('Thêm kinh nghiệm thành công');
      this.$emit('submit')
      this.closeModal()
      this.isSubmitting = false;
    })
    .catch((error: any) => {
      this.isSubmitting = false;
      Toast.handleError(error);
    });
  }

  updateExperience() {
    this.isSubmitting = true;
    ExperienceApi.update(this.userId, this.experience.id, this.experience.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật kinh nghiệm thành công');
      this.$emit('submit')
      this.closeModal()
      this.isSubmitting = false;
    })
    .catch((error: any) => {
      this.isSubmitting = false;
      Toast.handleError(error);
    });
  }
}
</script>
