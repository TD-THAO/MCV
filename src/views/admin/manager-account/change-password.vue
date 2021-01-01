<template>
   <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Đổi mật khẩu</h5>
    </div>
    <ValidationObserver ref="changePasswordForm" tag="form" v-slot="{ invalid }">
      <div class="c-form">
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for="password">Mật khẩu hiện tại <span class="icon-required">*</span></label>
              <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Vui lòng nhập mật khẩu cũ"
                  v-model="user.password"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label for="new_password">Mật khẩu mới <span class="icon-required">*</span></label>
              <ValidationProvider name="new_password" rules="required" v-slot="{ errors }">
                <input
                  type="password"
                  class="form-control"
                  id="new_password"
                  placeholder="Vui lòng nhập mật khẩu mới"
                  v-model="user.new_password"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>

             <div class="form-group">
              <label for="confirm_new_password">Nhập lại mật khẩu mới<span class="icon-required">*</span></label>
              <ValidationProvider name="confirm_new_password" rules="required|confirmed:new_password" v-slot="{ errors }">
                <input
                  type="password"
                  class="form-control"
                  id="confirm_new_password"
                  placeholder="Vui lòng nhập lại mật khẩu mới"
                  v-model="user.confirm_new_password"
                />

                <div class="invalid-error__mess">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>

          <div class="col-12 text-right">
            <button type="button"
              class="btn btn-primary"
              :disabled="invalid"
              @click="changePassword">
              Thay đổi
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { User } from '@/shared/models/user';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ChangePassword extends Vue {
  user: User = new User();

  changePassword() {
    // Call api to change password
    console.log(this.user.formpasswordString());
  }
}
</script>

<style scoped lang="scss">
// @import 'ChangePassword.scss';
</style>
