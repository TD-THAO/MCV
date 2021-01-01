<template>
 <div class="auth">
    <div class="auth-form">
      <form>
        <h1 class="mb-5">Đăng ký</h1>
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

        <div class="form-group">
          <label class="font-weight-bold" for="">Mật khẩu</label>
          <input type="password"
            class="form-control"
            id="exampleInputPassword"
            placeholder=" Vui lòng nhập mật khẩu"
            v-model="auth.password"
          />
        </div>

        <!-- <div class="form-group">
          <label class="font-weight-bold" for="">Nhập lại mật khẩu</label>
          <input type="password"
            class="form-control"
            id="exampleInputConfirmPassword"
            placeholder="Vui lòng nhập lại mật khẩu"
          />
        </div> -->

        <button
          type="button"
          class="btn btn-gradient btn-gradient--galaxy w-100 rounded-pill mt-4"
          @click="register"
          :disabled="isLoading">
          Đăng ký
        </button>
      </form>

      <p class="auth-form__footer mt-5 mb-0">
        Bạn đã có tài khoản?
        <router-link
          to="/login">
          Đăng nhập
        </router-link>
      </p>
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

    UserApi.createWithKey(auth.uid, dataSet.formJSONString())
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã tạo tài khoản thành công');
      this.$router.push('/login');
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
