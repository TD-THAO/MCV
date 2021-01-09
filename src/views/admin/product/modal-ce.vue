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
        <h5 class="modal-title text-center">{{ isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h5>
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
                placeholder="Vui lòng nhập tên sản phẩm"
                v-model="product.name"
              />

              <div class="invalid-error__mess">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="day">
              Danh mục <span class="icon-required">*</span>
            </label>
            <ValidationProvider
              name="category"
              rules="required"
              v-slot="{ errors }"
            >
              <select class="form-control" v-model="product.category.id">
                <option value="" disabled hidden>--Chọn danh mục--</option>
                <option v-for="item in categories" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
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
import ProductApi from '@/shared/api/Product';
import CategoryApi from '@/shared/api/Category';

import Toast from '@/shared/utils/Toast';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Product } from '@/shared/models/product';
import { Category } from '@/shared/models/category';

import { cloneDeep } from 'lodash';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ModalCEProduct extends Vue {
  @Prop(String) readonly name!: string;
  product: Product = new Product();
  categories: Category[] = [];
  catId: any = '';
  isLoading: boolean = false;
  isEdit: boolean = false;

  beforeOpen(event: any) {
    if (event.params && event.params.product) {
      this.isEdit = true;
      this.product = cloneDeep(event.params.product);
    }

    this.getCategories();
  }

  getCategories() {
    this.isLoading = true;
    CategoryApi.getCategories()
      .then((res: any) => {
        this.isLoading = false;
        this.categories = res.map((item: Category) => new Category().deserialize(item));
      })
      .catch((error: any) => {
        this.isLoading = false;
        Toast.handleError(error);
      });
  }

  closeModal() {
    this.product = new Product();
    this.$modal.hide(this.name);
  }

  submitForm() {
    const selectedCat = this.categories.filter((item: Category) => item.id === this.product.category.id)[0];
    const data = {
      ...this.product.formJSONData(),
      category: selectedCat,
    };

    if (!this.isEdit) {
      this.createProduct(data);
      return;
    }
    this.updateProduct(data);
  }

  createProduct(data: any) {
    this.isLoading = true;
    ProductApi.create(data)
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã tạo sản phẩm thành công');
      this.$emit('submit');
      this.closeModal();
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  updateProduct(data: any) {
    this.isLoading = true;

    ProductApi.update(this.product.id, data)
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã cập nhật sản phẩm thành công');
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

