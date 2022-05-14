<template>
  <div>
    <div class="col-12 text-right mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalCEExperience()"
      >
        Tạo
      </button>
    </div>
    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Kinh nghiệm làm việc</h3>
      </div>

      <div class="card-body">
        <div class="c-table">
          <div v-for="item in experiences" :key="item.id"
            class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <div>
              <p class="mb-0">
                <strong>{{ item.name_job }}</strong> -
                <span class="text-black-50">{{ item.company }}</span>
              </p>
              <p class="small mb-0">
                Từ tháng {{ item.start_at }} đến  {{ item.end_at }}
              </p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="openModalCEExperience(item)"
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
          <p v-if="!experiences.length"
            class="text-black-50 text-center p-3 mb-0"
          >
            Không có dữ liệu
          </p>
        </div>
      </div>
    </div>

    <ModalCEExperience
      name="modalCEExperience"
      textBtnConfirm="Xóa"
      @submit="submitModalCE"
    />

    <ModalConfirm
      name="modalConfirmDelete"
      content="Bạn có chắc chắn muốn xóa không?"
      @submit="confirmDelete"
    />

    <!-- <div class="bg-white px-4 py-3 c-card text-left mx-3 mt-3">
      <div class="admin-ctn__title border-bottom">
        <h5 class="font-weight-bold mb-3">Kinh nghiệm làm việc</h5>
      </div>

      <div class="c-table">
        <div v-for="item in experiences" :key="item.id"
          class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
        >
          <div>
            <p class="mb-0">
              <strong>{{ item.name_job }}</strong> -
              <span class="text-black-50">{{ item.company }}</span>
            </p>
            <p class="small mb-0">
              Từ tháng {{ item.start_at }} đến  {{ item.end_at }}
            </p>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-outline-secondary border-0"
              @click="openModalCEExperience(item)"
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
        <p v-if="!experiences.length"
          class="text-black-50 text-center p-3 mb-0"
        >
          Không có dữ liệu
        </p>
      </div>

      <ModalCEExperience
        name="modalCEExperience"
        textBtnConfirm="Xóa"
        @submit="submitModalCE"
      />

      <ModalConfirm
        name="modalConfirmDelete"
        content="Bạn có chắc chắn muốn xóa không?"
        @submit="confirmDelete"
      />
    </div> -->

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState } from 'vuex';

import ModalCEExperience from '@/components/modal/ModalCEExperience.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';
import PageLoader from '@/components/PageLoader.vue';

import Toast from '@/shared/utils/Toast';
import ExperienceApi from '@/shared/api/Experience';

import { Experience } from '@/shared/models/experience';
import { Authenticate } from '@/shared/models/authenticate';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalCEExperience,
    ModalConfirm,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class ExperienceInfomation extends Vue {
  experiences: Experience[] = [];
  auth: Authenticate;
  userId: string = '';
  isLoading: boolean = false;

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getExpInfo(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getExpInfo(this.userId);
    }
  }

  openModalCEExperience(item = null) {
    const params = {
      user_id: this.userId,
      item
    }

    this.$modal.show('modalCEExperience', params);
  }

  openModalConfirmDelete(item: Experience) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  getExpInfo(uid: string) {
    this.isLoading = true;
    this.experiences = [];
    ExperienceApi.getExperiences(uid)
    .then((res: any) => {
      this.isLoading = false;
      if (res) {
        Object.keys(res).map((key) => {
          const item = new Experience().deserialize({
            id: key,
            ...res[key]
          });
          this.experiences.push(item);
        });
      }
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  submitModalCE() {
    this.getExpInfo(this.userId);
  }

  confirmDelete(item: any) {
    this.isLoading = true;
    ExperienceApi.remove(this.userId, item.id)
    .then((res: any) => {
      Toast.success('Xóa thành công');
      this.$modal.hide('modalConfirmDelete');
      this.getExpInfo(this.userId);
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
