<template>
  <div class="jobs text-left container mt-3 ">
    <div class="row bg-white p-3" v-if="!isLoading">
      <div class="col-6 post p-3" v-for="item in jobs" :key="item.id">
        <div class="d-flex align-items-center mx-3 border-bottom pb-3">
          <div class="flex-1">
            <h3 class="mb-1">{{ item.position }}</h3>
            <p class="mb-2">
              Hạn nộp: {{ item.dateString }}
            </p>
            <div class="row">
              <div class="col-6">
                <i class="fa fa-usd mr-2"></i>
                {{ item.min_expected_salary }} ~ {{ item.max_expected_salary }}
              </div>
              <div class="col-6">
                <i class="fa fa-home mr-2"></i>
                {{ item.workplace }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="handleRedirect(item)"
          >
            Nộp CV
          </button>
        </div>
      </div>
    </div>

    <PageLoader v-else/>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/layouts/Sidebar.vue';
import Header from '@/layouts/Header.vue';
import PageLoader from '@/components/PageLoader.vue';

import JobApi from '@/shared/api/Job';
import Toast from '@/shared/utils/Toast';
import { Job } from '@/shared/models/job';
import { User } from '@/shared/models/user';
import UserApi from '@/shared/api/User';

@Component({
  components: {
    Header,
    Sidebar,
    PageLoader,
  },
})
export default class Jobs extends Vue {
  jobs:Job[] = [];
  isLoading: boolean = false;
  user: User = new User();

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

  handleRedirect(item: Job) {
    this.checkLogin(item);
  }

  checkLogin(item: Job) {
    const user: any = firebase.auth().currentUser;
    if (user) {
      this.getUserInfo(user.uid, item)
    } else {
      this.$router.push('/login');
    }
  }

  getUserInfo(uid: string, item: Job) {
    this.isLoading = true;

    UserApi.getUserInfo(uid)
    .then((res: any) => {
      this.isLoading = false;
      this.user = new User().deserialize(res);
      this.$store.dispatch('auth/setUser', this.user);
      if (!this.user.isAdmin) {
        this.$router.push({
          path: '/user'
        });
      }
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
<style scoped lang="scss">
.post {
  h3 {
    font-size: 18px;
    font-weight: bold;
  }

  .btn-primary {
    width: 70px;
  }
}
</style>
