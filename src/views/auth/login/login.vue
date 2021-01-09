<template>
  <div class="auth">
    <div class="auth-form">
      <form>
        <h1 class="mb-5">Đăng nhập</h1>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Mật khẩu"
            v-model="user.password"
          />
        </div>
        <button type="button" class="btn btn-gradient btn-gradient--galaxy w-100 rounded-pill mt-4" @click="login">Đăng nhập</button>
      </form>

      <p class="auth-form__footer mt-5 mb-0">
        Bạn chưa có tài khoản?
        <router-link
          to="/register">
          Đăng ký
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { User } from '@/shared/models/user';
import Toast from '@/shared/utils/Toast';
import { FIREBASE_ERRORS, FIREBASE_ERRORS_MESSAGES } from '@/shared/enums/firebase-errors';

@Component({
  components: {},
})
export default class Login extends Vue {
  user: User = new User();
  isLoading: boolean = false;

  login() {
    this.isLoading = true;
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
    .then((res: any) => {
      this.isLoading = false;
      this.user = new User().deserialize(res);
      this.$router.push('/admin');
    })
    .catch((error) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>

<style scoped lang="scss">
@import "login.scss";
</style>
