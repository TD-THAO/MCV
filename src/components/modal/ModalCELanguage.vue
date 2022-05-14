<template>
  <modal
    class="basic-modal"
    height="auto"
    :name="name"
    :clickToClose="true"
    :scrollable="true"
    :width="300"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose', $event)"
  >
    <div class="modal-header">
      <h5 class="modal-title">{{ modalTitle }}</h5>
    </div>
    <ValidationObserver ref="experienceForm" tag="form" v-slot="{ invalid }">
      <div class="modal-body modal-body--custom">
        <div class="c-form text-left">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="c-form__label">Ngoại ngữ <span class="icon-required">*</span></label>

                <select v-model="language.name"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn ngôn ngữ</option>
                  <option v-for="item in languages"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="c-form__label">Trình độ<span class="icon-required">*</span></label>

                <select v-model="language.level"
                  class="form-control form-control-lg">
                  <option value="" disabled hidden>Chọn trình độ</option>
                  <option v-for="item in levels"
                    :key="item.value"
                    :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
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
import { cloneDeep } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Toast from '@/shared/utils/Toast';
import LanguageApi from '@/shared/api/Language';
import { Language } from '@/shared/models/language';
import { LANGUAGES, LEVELS } from '@/shared/constants/language';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCELanguage extends Vue {
  @Prop(String) readonly name!: string;
  @Prop({default: false}) readonly isLoading!: boolean;
  language: Language = new Language();
  isEdit: boolean = false;
  userId: string = '';
  modalTitle: string = 'Thêm ngôn ngữ';
  isSubmitting: boolean = false;
  languages = LANGUAGES;
  levels = LEVELS;

  beforeOpen(event: any) {
    this.language = new Language();
    this.isEdit = false;
    this.modalTitle = 'Thêm ngôn ngữ';
    if (event.params.user_id) {
      this.userId = event.params.user_id;
    }

    if (event.params.item) {
      this.modalTitle = 'Sửa ngôn ngữ';
      this.isEdit = true
      this.language = cloneDeep(event.params.item)
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
    LanguageApi.create(this.userId, this.language.formJSONString())
    .then((res: any) => {
      Toast.success('Thêm ngoại ngữ thành công');
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
    LanguageApi.update(
      this.userId,
      this.language.id,
      this.language.formJSONString()
    )
    .then((res: any) => {
      Toast.success('Cập nhật ngoại ngữ thành công');
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
