<template>
  <modal
    class="basic-modal"
    height="auto"
    :name="name"
    :clickToClose="true"
    :scrollable="true"
    :width="480"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose', $event)"
  >
    <div class="modal-header">
      <h5 class="modal-title">{{ modalTitle }}</h5>
    </div>
    <ValidationObserver ref="personalInfoForm" tag="form" v-slot="{ invalid }">
      <div class="modal-body modal-body--custom">
        <div class="c-form text-left">
          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >
              Vị trí <span class="icon-required">*</span>
            </label>

            <ValidationProvider
              name="title"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                class="form-control form-control-lg"
                id="title"
                placeholder="Vui lòng nhập vị trí"
                v-model="job.position"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label
              for="min_expected_salary"
              class="c-form__label"
            >
              Mức lương<span class="icon-required">*</span>
            </label>

            <div class="row">
              <div class="col-6">
                <ValidationProvider
                  name="min_expected_salary"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="min_expected_salary"
                    placeholder="Mức lương thấp nhất"
                    v-model="job.min_expected_salary"
                  />

                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="col-6">
                <ValidationProvider
                  name="min_expected_salary"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="min_expected_salary"
                    placeholder="Mức lương cao nhất"
                    v-model="job.max_expected_salary"
                  />

                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
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
              <select v-model="job.work_time"
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
              <select v-model="job.workplace"
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
              for="workplace"
              class="c-form__label"
            >
              Hạn nộp <span class="icon-required">*</span>
            </label>
            <div class="row">
              <div class="col-4">
                <ValidationProvider
                  name="day"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control form-control-lg" v-model="job.day">
                    <option value="" disabled hidden>Ngày</option>
                    <option v-for="item in days" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="col-4">
                <ValidationProvider
                  name="month"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control form-control-lg" v-model="job.month">
                    <option value="" disabled hidden>Tháng</option>
                    <option v-for="item in months" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="col-4">
                <ValidationProvider
                  name="year"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control form-control-lg" v-model="job.year">
                    <option value="" disabled hidden>Năm</option>
                    <option v-for="item in years" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer pt-2 pb-2 justify-content-center border-top-0">
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
import { cloneDeep } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Toast from '@/shared/utils/Toast';
import { DAY, MONTH, YEAR } from '@/shared/constants/date';

import { RATES, FACULTYS, TRAINING_PLACES } from '@/shared/constants/certificate';
import {
  RANKS,
  ACADEMIC_LEVELS,
  YEARS_EXPERIENCE,
  WORK_TIMES,
  CAREERS
} from '@/shared/constants/resume';
import { CITIES} from '@/shared/constants/address';

import { Job } from '@/shared/models/job';
import JobApi from '@/shared/api/Job';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCEJob extends Vue {
  @Prop(String) readonly name!: string;
  @Prop({default: false}) readonly isLoading!: boolean;
  isEdit: boolean = false;
  years: number[] = YEAR;
  userId: string = '';
  modalTitle: string = 'Thêm công việc';
  isSubmitting: boolean = false;

  job: Job = new Job();
  rates: string[] = RATES;
  workTimes = WORK_TIMES;
  cities = CITIES;
  days: number[] = DAY;
  months: number[] = MONTH;

  beforeOpen(event: any) {
    this.job = new Job();
    this.isEdit = false;
    this.modalTitle = 'Thêm công việc';
    if (event.params.item) {
      this.modalTitle = 'Sửa công việc';
      this.isEdit = true;
      this.job = cloneDeep(event.params.item);
    }
  }

  closeModal() {
    this.$modal.hide(this.name);
  }

  submitForm() {
    if (this.isEdit) {
      this.update();
      return;
    }

    this.create();
  }

  create() {
    this.isSubmitting = true;
    JobApi
      .create(this.job.formJSONString())
      .then((res: any) => {
        Toast.success('Thêm công việc');
        this.$emit('submit')
        this.closeModal()
        this.isSubmitting = false;
      })
      .catch((error: any) => {
        this.isSubmitting = false;
        Toast.handleError(error);
      });
  }

  update() {
    this.isSubmitting = true;
    JobApi
      .update(
        this.job.id,
        this.job.formJSONString()
      )
      .then((res: any) => {
        Toast.success('Cập nhật công việc');
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
