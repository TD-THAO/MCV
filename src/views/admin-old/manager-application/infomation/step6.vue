<template>
  <div>
    <div class="col-12 text-right mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalCELanguage()"
      >
        Tạo
      </button>
    </div>

    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Ngoại ngữ</h3>
      </div>

      <div class="card-body">
        <div class="c-table">
          <div v-for="item in languages" :key="item.id"
            class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <div>
              <p class="mb-0">
                <strong>{{ languagesName[item.name] }}</strong>
              </p>
              <p class="small mb-0">
                Trình độ: {{ languagesLevel[item.level] }}
              </p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="openModalCELanguage(item)"
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
          <p v-if="!languages.length"
            class="text-black-50 text-center p-3 mb-0"
          >
            Không có dữ liệu
          </p>
        </div>
      </div>
    </div>

    <ModalCELanguage
      name="modalCELanguage"
      @submit="submitModalCE"
    />

    <ModalConfirm
      name="modalConfirmDelete"
      content="Bạn có chắc chắn muốn xóa không?"
      textBtnConfirm="Xóa"
      @submit="confirmDelete"
    />

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import ModalCELanguage from '@/components/modal/ModalCELanguage.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';
import PageLoader from '@/components/PageLoader.vue';

import Toast from '@/shared/utils/Toast';
import { Authenticate } from '@/shared/models/authenticate';
import LanguageApi from '@/shared/api/Language';
import { Language } from '@/shared/models/language';
import { LANGUAGE_NAME, LANGUAGE_LEVEL } from '@/shared/enums/language';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalCELanguage,
    ModalConfirm,
    PageLoader,
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
  languagesLevel = LANGUAGE_LEVEL;

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
    this.isLoading = true;
    this.languages = [];
    LanguageApi.getLanguages(uid)
    .then((res: any) => {
      this.isLoading = false;
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
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  submitModalCE() {
    this.getLanguages(this.userId);
  }

  confirmDelete(item: any) {
    this.isLoading = true;
    LanguageApi.remove(this.userId, item.id)
    .then((res: any) => {
      Toast.success('Xóa thành công');
      this.$modal.hide('modalConfirmDelete');
      this.getLanguages(this.userId);
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
