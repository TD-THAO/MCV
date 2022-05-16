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
        <h3 class="card-title">Quản lý bài đăng</h3>
      </div>

      <div class="card-body">
        <div class="c-table">
          <div v-for="item in jobs" :key="item.id"
            class="c-table__item d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <div class="flex-1">
              <p class="mb-0">
                <strong>{{ item.position }}</strong>
              </p>
              <div class="row mt-3">
                <div class="col-4">
                  <p class="small mb-0">
                    <i class="fa fa-usd mr-2"></i>
                    <strong>Lương:</strong> {{ item.min_expected_salary }} -  {{ item.max_expected_salary }}
                  </p>
                </div>
                <div class="col-4">
                  <p class="small mb-0">
                    <i class="fa fa-map-home mr-2"></i>
                    <strong>Địa điểm:</strong> {{ item.workplace }}
                  </p>
                </div>
                <div class="col-4">
                  <p class="small mb-0">
                    <i class="fa fa-calendar mr-2"></i>
                    <strong>Hạn nộp:</strong> {{ item.dateString }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="openModalCEJob(item)"
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
          <p v-if="!jobs.length"
            class="text-black-50 text-center p-3 mb-0"
          >
            Không có dữ liệu
          </p>
        </div>
      </div>
    </div>
    <ModalCEJob
      name="modalCEJob"
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
import PageLoader from '@/components/PageLoader.vue';
import ModalCEJob from '@/components/modal/ModalCEJob.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';

import JobApi from '@/shared/api/Job';
import Toast from '@/shared/utils/Toast';
import { User } from '@/shared/models/user';
import { Job } from '@/shared/models/job';

@Component({
  components: {
    PageLoader,
    ModalCEJob,
    ModalConfirm,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class Jobs extends Vue {
  jobs:Job[] = [];
  user: User;
  isLoading: boolean = false;

  // @Watch('user')
  // watchAuth(newVal: User, oldVal: User) {
  //   if (newVal) {
  //     this.getJobs(this.user.id);
  //   }
  // }

  mounted() {
    this.getJobs();
  }

  getJobs() {
    this.isLoading = true;
    this.jobs = [];
    JobApi
      .getJobs()
      .then((res: any) => {
        this.isLoading = false;
        if (res) {
          Object.keys(res).map((key) => {
            const item = new Job().deserialize({
              id: key,
              ...res[key]
            });
            this.jobs.push(item);
          });
        }
      })
      .catch((error: any) => {
        this.isLoading = false;
        Toast.handleError(error);
      });
  }

  openModalCEJob(item = null) {
    const params = {
      user_id: this.user.id,
      item
    }

    this.$modal.show('modalCEJob', params);
  }

  openModalConfirmDelete(item: Job) {
    this.$modal.show('modalConfirmDelete', { item });
  }

  submitModalCE() {
    this.getJobs();
  }

  confirmDelete(item: any) {
    this.isLoading = true;
    JobApi
      .remove(item.id)
      .then((res: any) => {
        Toast.success('Xóa thành công');
        this.$modal.hide('modalConfirmDelete');
        this.getJobs();
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.isLoading = false;
        Toast.handleError(error);
      });
  }
}
</script>
