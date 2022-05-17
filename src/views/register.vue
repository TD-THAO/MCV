<template>
 <div class="auth">
    <div class="auth-form">
      <form v-if="!isSuccess">
        <h1 class="mb-5">Đăng ký</h1>
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

        <div class="form-group">
          <label class="font-weight-bold" for="">Mật khẩu</label>
          <input type="password"
            class="form-control"
            id="exampleInputPassword"
            placeholder=" Vui lòng nhập mật khẩu"
            v-model="auth.password"
          />
        </div>

        <button
          type="button"
          class="btn btn-gradient btn-gradient--galaxy w-100 rounded-pill mt-4"
          @click="register"
          :disabled="isLoading">
          Đăng ký
        </button>
      </form>

      <div v-else class="snippet snippet--success">
        <span class="snippet-icon">
          <i class="fa fa-check"></i>
        </span>
        <h2 class="mt-4">Thành công!</h2>
        <p>Đã đăng kí tài khoản thành công</p>
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
export default class Register extends Vue {
  auth: Authenticate = new Authenticate();
  database = firebase.database();
  isLoading: boolean = false;
  isSuccess: boolean = false;

  register() {
    this.isLoading = true;

    firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.password)
    .then((res: any) => {
      this.createUserInfor(res.user);
    })
    .catch((error) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  private createUserInfor(auth: Authenticate) {
    const dataSet = new User();
    dataSet.email = auth.email;
    dataSet.id = auth.uid;

    UserApi.create(auth.uid, dataSet.formJSONString())
    .then((res: any) => {
      this.isLoading = false;
      this.isSuccess = true;
      Toast.success('Đã tạo tài khoản thành công');
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  handleRedirect() {
    this.$router.push('/login');
  }
}
</script>
