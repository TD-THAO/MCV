<template>
  <div class="admin d-flex">
    <div class="admin-left">
      <Sidebar />
    </div>

    <div class="admin-right flex-1">
      <Header />

      <div clas="admin-ctn">
        <!-- <Breadcrumb /> -->
        <div class="mt-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/layouts/Header.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import firebase from 'firebase';
import { Authenticate } from '@/shared/models/authenticate';

@Component({
  components: {
    Header,
    Sidebar,
    Breadcrumb,
  },
})
export default class ManagerApplication extends Vue {
  auth: Authenticate = new Authenticate();

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

        this.$store.dispatch('auth/setUser', this.auth);
      } else {
        this.$router.push('/login');
      }
    });
  }
}
</script>

<style scoped lang='scss'>
.breadcrumb {
  background-color: transparent;
}

.admin {
  min-height: calc(100vh);

  &-right {
    background-color: #eff3f6;
    margin-left: 280px;
    background-color: #eff3f6;
  }

  &-left {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 9;
    height: auto;
    line-height: inherit;
    width: 280px;
    text-align: left;
    transition: 0.3s;
    box-shadow: 0 0 21px 0 rgba(89, 102, 122, 0.1);
    background: url(~@/assets/bg-01.jpg) no-repeat;
    background-size: cover;
  }
}
</style>
