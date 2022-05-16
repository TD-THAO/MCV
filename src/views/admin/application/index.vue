<template>
  <div>
    <div class="col-12 text-right mt-3 mb-3">
        <button
        type="button"
        class="btn btn-primary"
        @click="openModalCEJob()"
      >
        Tạo
      </button>
    </div>

    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Quản lý hồ sơ ứng viên</h3>
      </div>

      <div class="card-body">
        <div class="c-table">
          <div v-for="item in applications" :key="item.id"
            class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <div class="flex-1">
              <p class="mb-0">
                <strong>{{ item.user.name }}</strong>
              </p>
              <div class="row mt-3">
                <div class="col-4">
                  <p class="small mb-0">
                    <strong>Vị trí:</strong> {{ item.resume.position }}
                  </p>
                </div>
                <div class="col-4">
                  <p class="small mb-0">
                    <strong>Năm kinh nghiệm:</strong> {{ yearExp[item.resume.year_experience] }}
                  </p>
                </div>
                <div class="col-4">
                  <p class="small mb-0">
                    <strong>Cấp bậc:</strong> {{ rank[item.resume.rank] }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="handleRedirect(item)"
              >
                <i class="fa fa-eye"></i>
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
          <p v-if="!applications.length"
            class="text-black-50 text-center p-3 mb-0"
          >
            Không có dữ liệu
          </p>
        </div>
      </div>
    </div>

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
import PageLoader from '@/components/PageLoader.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';

import ApplicationApi from '@/shared/api/Application';
import Toast from '@/shared/utils/Toast';
import { User } from '@/shared/models/user';
import { Application } from '@/shared/models/application';
import { YEARS_EXPERIENCE_STRING, RANK_STRING } from '@/shared/enums/resume'
@Component({
  components: {
    PageLoader,
    ModalConfirm,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class Jobs extends Vue {
  applications: Application[] = [];
  user: User;
  isLoading: boolean = false;
  yearExp = YEARS_EXPERIENCE_STRING;
  rank = RANK_STRING;

  // @Watch('user')
  // watchAuth(newVal: User, oldVal: User) {
  //   if (newVal) {
  //     this.getJobs(this.user.id);
  //   }
  // }

  mounted() {
    this.getApplications();
  }

  getApplications() {
    this.isLoading = true;
    this.applications = [];
    ApplicationApi
      .getApplications()
      .then((res: any) => {
        this.isLoading = false;
        if (res) {
          Object.keys(res).map((key) => {
            const item = new Application().deserialize({
              id: key,
              ...res[key]
            });
            this.applications.push(item);
          });
        }
      })
      .catch((error: any) => {
        this.isLoading = false;
        Toast.handleError(error);
      });
  }

  openModalConfirmDelete(item: Application) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  confirmDelete(item: any) {
    this.isLoading = true;
    ApplicationApi
      .remove(item.id)
      .then((res: any) => {
        Toast.success('Xóa thành công');
        this.$modal.hide('modalConfirmDelete');
        this.getApplications();
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.isLoading = false;
        Toast.handleError(error);
      });
  }

  handleRedirect(item: Application) {
    this.$router.push(`/admin/applications/${item.id}`);
    // this.$router.push({
    //   path: `/admin/applications/${item.id}`,
    //   query: {
    //     user_id: item.user.id
    //   }
    // });
  }
}
</script>
