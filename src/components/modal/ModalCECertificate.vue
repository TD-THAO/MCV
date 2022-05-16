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
              Trình độ <span class="icon-required">*</span>
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
                placeholder="Vui lòng nhập trình độ"
                v-model="certificate.title"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >
              Trường, cơ sở, trung tâm, đào tạo <span class="icon-required">*</span>
            </label>

            <ValidationProvider
              name="school_name"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                class="form-control form-control-lg"
                id="school_name"
                placeholder="Vui lòng nhập trường, cơ sở, trung tâm, đào tạo"
                v-model="certificate.school_name"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >Khoa đào tạo <span class="icon-required">*</span>
            </label>

            <ValidationProvider
              name="career_name"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                class="form-control form-control-lg"
                id="career_name"
                placeholder="Vui lòng nhập khoa đào tạo"
                v-model="certificate.career_name"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >
              Thời gian <span class="icon-required">*</span>
            </label>

            <div class="row">
              <div class="col-6">
                <span>Từ</span>
                <select class="form-control form-control-lg" v-model="certificate.start_at">
                  <option value="" disabled hidden>Năm</option>
                  <option v-for="(item, index) in years" :key="index">
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="col-6">
                <span>đến</span>
                <select class="form-control form-control-lg" v-model="certificate.end_at">
                  <option value="" disabled hidden>Năm</option>
                  <option v-for="(item, index) in years" :key="index">
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >
              Chuyên ngành đào tạo <span class="icon-required">*</span>
            </label>

            <ValidationProvider
              name="specialized"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                class="form-control form-control-lg"
                id="specialized"
                placeholder="Vui lòng nhập chuyên ngành đào tạo"
                v-model="certificate.specialized"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label
              for="title"
              class="c-form__label"
            >
              Loại tốt nghiệp <span class="icon-required">*</span>
            </label>

            <select class="form-control form-control-lg" v-model="certificate.gra_certificate">
              <option value="" disabled hidden>Chọn loại tốt nghiệp</option>
              <option v-for="(item, index) in rates" :key="index">
                {{ item }}
              </option>
            </select>
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
import { MONTH, YEAR } from '@/shared/constants/date';
import { RATES, FACULTYS, TRAINING_PLACES } from '@/shared/constants/certificate';
import { Certificate } from '@/shared/models/certificate';
import CertificateApi from '@/shared/api/Certificate';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCECertificate extends Vue {
  @Prop(String) readonly name!: string;
  @Prop({default: false}) readonly isLoading!: boolean;
  isEdit: boolean = false;
  years: number[] = YEAR;
  userId: string = '';
  modalTitle: string = 'Thêm học vấn & bằng cấp';
  isSubmitting: boolean = false;

  certificate: Certificate = new Certificate();
  rates: string[] = RATES;

  beforeOpen(event: any) {
    this.certificate = new Certificate();
    this.isEdit = false;
    this.modalTitle = 'Thêm học vấn & bằng cấp';
    if (event.params.user_id) {
      this.userId = event.params.user_id;
    }

    if (event.params.item) {
      this.modalTitle = 'Sửa học vấn & bằng cấp';
      this.isEdit = true;
      this.certificate = cloneDeep(event.params.item);
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
    CertificateApi
      .create(this.userId, this.certificate.formJSONString())
      .then((res: any) => {
        Toast.success('Thêm học vấn & bằng cấp thành công');
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
    CertificateApi
      .update(
        this.userId,
        this.certificate.id,
        this.certificate.formJSONString()
      )
      .then((res: any) => {
        Toast.success('Cập nhật học vấn & bằng cấp thành công');
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
