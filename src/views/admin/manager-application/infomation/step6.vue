<template>
  <div>
    <div class="col-12 text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalCELanguage()"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>

    <div class="bg-white px-4 py-3 c-card text-left mx-3 mt-3">
      <div class="admin-ctn__title border-bottom">
        <h5 class="font-weight-bold mb-3">Ngoại ngữ</h5>
      </div>

      <div class="c-table">
        <div v-for="item in languages" :key="item.id"
          class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
        >
          <div>
            <p class="mb-0">
              <strong>{{ languagesName[item.name] }}</strong>
            </p>
            <p class="small mb-0">
              Trình độ: {{ item.level }}
            </p>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-outline-secondary border-0"
              @click="openModalCELanguage(item)"
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
        <p v-if="!languages.length"
          class="text-black-50 text-center p-3 mb-0"
        >
          Không có dữ liệu
        </p>
      </div>

      <ModalCELanguage
        name="modalCELanguage"
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
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import ModalCELanguage from '@/components/modal/ModalCELanguage.vue';
import ModalConfirmDelete from '@/components/modal/ModalConfirmDelete.vue';
import Toast from '@/shared/utils/Toast';
import { Authenticate } from '@/shared/models/authenticate';
import LanguageApi from '@/shared/api/Language';
import { Language } from '@/shared/models/language';
import { LANGUAGE_NAME } from '@/shared/enums/language';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalCELanguage,
    ModalConfirmDelete,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class LanguageInfomation extends Vue {
  languages: Language[] = [];
  auth: Authenticate;
  userId: string = '';
  isLoading: boolean = false;
  languagesName = LANGUAGE_NAME;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getLanguages(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getLanguages(this.userId);
    }
  }

  openModalCELanguage(item = null) {
    const params = {
      user_id: this.userId,
      item
    }

    this.$modal.show('modalCELanguage', params);
  }

  openModalConfirmDelete(item: Language) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  getLanguages(uid: string) {
    // this.isLoading = true;
    this.languages = [];
    LanguageApi.getLanguages(uid)
    .then((res: any) => {
      if (res) {
        Object.keys(res).map((key) => {
          const item = new Language().deserialize({
            id: key,
            ...res[key]
          });
          this.languages.push(item);
        });
      }
    })
    .catch((error: any) => {
      // this.isLoading = false;
      Toast.handleError(error);
    });
  }

  submitModalCE() {
    this.getLanguages(this.userId);
  }

  confirmDelete(item: any) {
    // this.isSubmitting = true;
    LanguageApi.remove(this.userId, item.id)
    .then((res: any) => {
      Toast.success('Xóa thành công');
      this.$modal.hide('modalConfirmDelete');
      this.getLanguages(this.userId);
      // this.isSubmitting = false;
    })
    .catch((error: any) => {
      // this.isSubmitting = false;
      Toast.handleError(error);
    });
  }
}
</script>
