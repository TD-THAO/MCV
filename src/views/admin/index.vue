<template>
  <div class="admin d-flex">
    <div class="admin-left">
      <Sidebar />
    </div>

    <div class="admin-right flex-1">
      <Header />

      <div clas="admin-ctn">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
        <router-view></router-view>
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
    let _ref = this;
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        user.providerData.forEach(function (res: Authenticate) {
          console.log(res);
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
.admin-right {
  background-color: #eff3f6;
}
.breadcrumb {
  background-color: transparent;
}
</style>
