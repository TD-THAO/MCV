<template>
 <div class="auth">
    <div class="auth-form" >
      <form v-if="!isSuccess">
        <h1 class="mb-5">Quên mật khẩu</h1>
        <!-- <div class="form-group">
          <label class="font-weight-bold" for="">Họ và tên</label>
          <input type="text"
            class="form-control"
            id="exampleInputUsername"
            placeholder="Vui lòng nhập họ và tên"
            v-model="user.displayName"
          />
        </div>

        <div class="form-group">
          <label class="font-weight-bold" for="">Số điện thoại</label>
          <input type="number"
            class="form-control"
            id="exampleInputNumber"
            placeholder="Vui lòng nhập số điện thoại"
            v-model="user.phoneNumber"
          />
        </div> -->

        <div class="form-group">
          <label class="font-weight-bold" for="">Địa chỉ email</label>
          <input type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Vui lòng nhập email"
            v-model="auth.email"
          />
        </div>

        <button
          type="button"
          class="btn btn-gradient btn-gradient--galaxy w-100 rounded-pill mt-4"
          @click="sendEmailForgotPassword"
          :disabled="isLoading">
          Gửi
        </button>
      </form>

      <div v-else class="snippet snippet--success">
        <span class="snippet-icon">
          <i class="fa fa-check"></i>
        </span>
        <h2 class="mt-4">Thành công!</h2>
        <p>Đã gửi email xác nhận đặt lại mật khẩu thành công, vui lòng kiểm tra email</p>

        <button type="button"
          class="btn btn-gradient btn-gradient--galaxy w-100 rounded-pill mt-4"
          @click="handleRedirect">
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { User } from '@/shared/models/user';
import { Authenticate } from '@/shared/models/authenticate';

import Toast from '@/shared/utils/Toast';
import UserApi from '@/shared/api/User';

@Component({
  components: {},
})
export default class ForgotPassword extends Vue {
  auth: Authenticate = new Authenticate();
  database = firebase.database();
  isLoading: boolean = false;
  isSuccess: boolean = false;

  sendEmailForgotPassword() {
    this.isLoading = true;

    firebase.auth().sendPasswordResetEmail(this.auth.email)
    .then((res: any) => {
      this.isSuccess = true;
      Toast.success('Đã gửi thành công');
    })
    .catch((error) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  handleRedirect() {
    this.$router.push('/login');
  }
}
</script>
<style scoped lang="scss">
$success: #87bd48;

.snippet {
  &--success {
    .snippet-icon {
      border-color: $success;
      color: $success;
    }
  }

  &--success {
    .snippet-icon {
      border-color: $success;
      color: $success;
    }
  }

  &--success {
    .snippet-icon {
      border-color: $success;
      color: $success;
    }
  }

  &-icon {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 28px;
  }
}
</style>
