<template>
  <modal
    :name="name"
    class="basic-modal"
    :clickToClose="true"
    width="400"
    height="auto"
    :scrollable="true"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose', $event)"
  >
    <ValidationObserver ref="personalInfoForm" tag="form" v-slot="{ invalid }">
      <div class="modal-header py-2">
        <h5 class="modal-title text-center">{{ isEdit ? 'Sửa danh mục' : 'Thêm danh mục' }}</h5>
        <span @click="closeModal" class="close">&times;</span>
      </div>
      <div class="modal-body modal-body--custom">
        <div class="c-form">
          <div class="form-group">
            <label for="name">
              Tên <span class="icon-required">*</span>
            </label>
            <ValidationProvider
              name="name"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Vui lòng nhập tên danh mục"
                v-model="category.name"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
      </div>

      <div class="modal-footer pt-2 pb-2 justify-content-center">
        <button type="button"
          class="btn btn-secondary btn-mw-100"
          :disabled="isLoading"
          @click="closeModal">
          Hủy
        </button>
        <button type="button"
          class="btn btn-primary btn-mw-100"
          :disabled="isLoading || invalid"
          @click="submitForm">
          {{ isEdit ? 'Sửa' : 'Tạo' }}
        </button>
      </div>
    </ValidationObserver>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import CategoryApi from '@/shared/api/Category';
import Toast from '@/shared/utils/Toast';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Category } from '@/shared/models/category';
import { cloneDeep } from 'lodash';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCECategory extends Vue {
  @Prop(String) readonly name!: string;
  category: Category = new Category();
  isLoading: boolean = false;
  isEdit: boolean = false;

  beforeOpen(event: any) {
    if (event.params && event.params.category) {
      this.isEdit = true;
      this.category = cloneDeep(event.params.category);
    }
  }

  closeModal() {
    this.category = new Category();
    this.$modal.hide(this.name);
  }

  submitForm() {
    if (!this.isEdit) {
      this.createCategory();
      return;
    }
    this.updateCategory();
  }

  createCategory() {
    this.isLoading = true;
    CategoryApi.create(this.category.formJSONData())
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã tạo danh mục thành công');
      this.$emit('submit');
      this.closeModal();
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  updateCategory() {
    this.isLoading = true;

    CategoryApi.update(this.category.id, this.category.formJSONData())
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã cập nhật danh mục thành công');
      this.$emit('submit');
      this.closeModal();
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>

<style lang="scss" scoped>
</style>

