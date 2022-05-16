<template>
  <div class="mannager d-flex">
    <div class="mannager-left">
      <Sidebar :user="user"/>
    </div>

    <div class="mannager-right flex-1">
      <Header />

      <div clas="mannager-ctn">
        <div class="mt-3">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/layouts/Header.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import PageLoader from '@/components/PageLoader.vue';

import { Authenticate } from '@/shared/models/authenticate';
import { User } from '@/shared/models/user';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
    Header,
    Sidebar,
    PageLoader,
  },
})
export default class ManagerApplication extends Vue {
  auth: Authenticate = new Authenticate();
  user: User = new User();
  isLoading: boolean = false;

  mounted() {
    this.checkLogin();
  }

  checkLogin() {
    const _ref = this;
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        user.providerData.forEach((res: Authenticate) => {
          _ref.auth = new Authenticate().deserialize(res);
          _ref.auth.uid = user.uid;
        });
        this.getUserInfo(this.auth.uid)
      } else {
        this.$router.push('/login');
      }
    });
  }

  getUserInfo(uid: string) {
    this.isLoading = true;

    UserApi.getUserInfo(uid)
    .then((res: any) => {
      this.user = new User().deserialize(res);
      this.$store.dispatch('auth/setUser', this.user);
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
