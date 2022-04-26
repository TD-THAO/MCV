<template>
  <div>
    <div class="col-12 text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalCECertificate()"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>

    <div class="bg-white px-4 py-3 c-card text-left mx-3 mt-3">
      <div class="admin-ctn__title border-bottom">
        <h5 class="font-weight-bold mb-3">Học vấn bằng cấp</h5>
      </div>

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
              class="btn btn-outline-secondary border-0"
              @click="openModalCECertificate(item)"
            >
              <i class="fa fa-pencil-square-o"></i>
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary border-0"
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

      <ModalCECertificate
        name="modalCECertificate"
        @submit="submitModalCE"
      />

      <ModalConfirmDelete
        name="modalConfirmDelete"
        content="Bạn có chắc chắn muốn xóa không?"
        @submit="confirmDelete"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState } from 'vuex';

import ModalCECertificate from '@/components/modal/ModalCECertificate.vue';
import ModalConfirmDelete from '@/components/modal/ModalConfirmDelete.vue';
import Toast from '@/shared/utils/Toast';
import CertificateApi from '@/shared/api/Certificate';

import { Certificate } from '@/shared/models/certificate';
import { Authenticate } from '@/shared/models/authenticate';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalCECertificate,
    ModalConfirmDelete,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class CertificateInfomation extends Vue {
  certificates: Certificate[] = [];
  auth: Authenticate;
  userId: string = '';
  isLoading: boolean = false;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getCertificate(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getCertificate(this.userId);
    }
  }

  openModalCECertificate(item = null) {
    const params = {
      user_id: this.userId,
      item
    }

    this.$modal.show('modalCECertificate', params);
  }

  openModalConfirmDelete(item: Certificate) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  getCertificate(uid: string) {
    // this.isLoading = true;
    this.certificates = [];
    CertificateApi.getCertificate(uid)
    .then((res: any) => {
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
      // this.isLoading = false;
      Toast.handleError(error);
    });
  }

  submitModalCE() {
    this.getCertificate(this.userId);
  }

  confirmDelete(item: any) {
    // this.isSubmitting = true;
    CertificateApi.remove(this.userId, item.id)
    .then((res: any) => {
      Toast.success('Xóa thành công');
      this.$modal.hide('modalConfirmDelete');
      this.getCertificate(this.userId);
      // this.isSubmitting = false;
    })
    .catch((error: any) => {
      // this.isSubmitting = false;
      Toast.handleError(error);
    });
  }
}
</script>
