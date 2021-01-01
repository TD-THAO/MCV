<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light border-bottom">
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
           <router-link class="nav-link"
            to="/home">
            Trang chủ
            </router-link>
          <a class="nav-link" href="#">Tuyển dụng</a>
          <button type="button" class="nav-link btn"
            @click="logout"
            :disabled="isLoading">
            Thoát
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import Toast from '@/shared/utils/Toast';
import { Authenticate } from '@/shared/models/authenticate';
import { mapActions } from 'vuex';

@Component({
  components: {},
  computed: {
  }
})
export default class Header extends Vue {
  isLoading: boolean = false;
  auth: Authenticate = new Authenticate();

  mounted() {
  }

  logout() {
    this.isLoading = true;
    firebase.auth().signOut().then((res: any) => {
      this.isLoading = false;
      this.$router.push('/login');
    },(error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  // getIdToken() {
  //   firebase.auth().currentUser?.getIdTokenResult(true).then(function(idToken) {
  //    console.log(idToken, 'idToken');

  //   }).catch(function(error) {
  //     console.log(error);

  //   });
  // }
}
</script>

<style scoped lang='scss'>
</style>
