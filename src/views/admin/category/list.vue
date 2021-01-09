<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-0">Danh mục</h5>
      </div>

      <div>
        <button type="button" class="btn btn-primary btn-sm" @click="openModalCECategory()">
          <i class="fa fa-plus"></i>
          <span class="ml-2">Tạo</span>
        </button>
      </div>
    </div>

    <div >
      <div class="table-responsive" v-if="categories.length">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in categories" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm"
                  @click="openModalDelCategory(item)">
                  <i class="fa fa-trash-o"></i>
                  <span class="ml-2">Xóa</span>
                </button>

                <button type="button" class="btn btn-primary btn-sm ml-2"
                  @click="openModalCECategory(item)">
                  <i class="fa fa-pencil"></i>
                  <span class="ml-2">Sửa</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-center mb-0" v-if="!categories.length">Không có dữ liệu</p>
    </div>

    <ModalCECategory
      name="modalCECategory"
      @submit="submitModalCE"
    />

    <ModalDelete
      name="modalDelCategory"
      :value="selectedCat.name"
      @submit="submitModalDel"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CategoryApi from '@/shared/api/Category';
import Toast from '@/shared/utils/Toast';
import { Category } from '@/shared/models/category';
import ModalCECategory from './modal-ce.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import { cloneDeep } from 'lodash';

@Component({
  components: {
    ModalCECategory,
    ModalDelete,
  },
   computed: {
   },
})
export default class Categories extends Vue {
  categories: Category[] = [];
  isLoading: boolean = false;
  selectedCat: Category = new Category();

  mounted() {
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

  openModalCECategory(cat: Category) {
    if (cat) {
      this.$modal.show('modalCECategory', { category: cat } );
    } else {
      this.$modal.show('modalCECategory');
    }
  }

  openModalDelCategory(cat: Category) {
    this.$modal.show('modalDelCategory');
    this.selectedCat = cloneDeep(cat);
  }

  submitModalCE() {
    this.getCategories();
  }

  submitModalDel() {
    this.isLoading = true;
    CategoryApi.remove(this.selectedCat.id, this.selectedCat.formJSONData())
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã xóa danh mục thành công');
      this.$modal.hide('modalDelCategory');
      this.getCategories();
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
