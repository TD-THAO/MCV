<template>
  <div>
    <div class="col-12 text-right mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalCECertificate()"
      >
        Tạo
      </button>
    </div>

    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Học vấn bằng cấp</h3>
      </div>

      <div class="card-body">
        <div class="c-table">
          <div v-for="item in certificates" :key="item.id"
            class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <div>
              <p class="mb-0">
                <strong>{{ item.title }}</strong> -
                <span class="text-black-50">{{ item.school_name }}</span>
              </p>
              <p class="small mb-0">
                Từ năm {{ item.start_at }} đến  {{ item.end_at }}
              </p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="openModalCECertificate(item)"
              >
                <i class="fa fa-pencil-square-o"></i>
              </button>

              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="openModalConfirmDelete(item)"
              >
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </div>
          <p v-if="!certificates.length"
            class="text-black-50 text-center p-3 mb-0"
          >
            Không có dữ liệu
          </p>
        </div>
      </div>
    </div>

    <ModalCECertificate
      name="modalCECertificate"
      textBtnConfirm="Xóa"
      @submit="submitModalCE"
    />

    <ModalConfirm
      name="modalConfirmDelete"
      content="Bạn có chắc chắn muốn xóa không?"
      @submit="confirmDelete"
    />

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import ModalCECertificate from '@/components/modal/ModalCECertificate.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';
import PageLoader from '@/components/PageLoader.vue';

import Toast from '@/shared/utils/Toast';
import CertificateApi from '@/shared/api/Certificate';

import { Certificate } from '@/shared/models/certificate';
import { User } from '@/shared/models/user';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalCECertificate,
    ModalConfirm,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class CertificateInfomation extends Vue {
  certificates: Certificate[] = [];
  user: User;
  isLoading: boolean = false;

  @Watch('user')
  watchAuth(newVal: User, oldVal: User) {
    if (newVal) {
      this.getCertificate(this.user.id);
    }
  }

  mounted() {
    if (this.user.id) {
      this.getCertificate(this.user.id);
    }
  }

  openModalCECertificate(item = null) {
    const params = {
      user_id: this.user.id,
      item
    }

    this.$modal.show('modalCECertificate', params);
  }

  openModalConfirmDelete(item: Certificate) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  getCertificate(id: string) {
    this.isLoading = true;
    this.certificates = [];
    CertificateApi.getCertificate(id)
    .then((res: any) => {
      this.isLoading = false;
      if (res) {
        Object.keys(res).map((key) => {
          const item = new Certificate().deserialize({
            id: key,
            ...res[key]
          });
          this.certificates.push(item);
        });
      }
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  submitModalCE() {
    this.getCertificate(this.user.id);
  }

  confirmDelete(item: any) {
    this.isLoading = true;
    CertificateApi.remove(this.user.id, item.id)
    .then((res: any) => {
      Toast.success('Xóa thành công');
      this.$modal.hide('modalConfirmDelete');
      this.getCertificate(this.user.id);
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
