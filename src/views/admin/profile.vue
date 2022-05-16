<template>
  <div>
    <div class="card text-left c-card mx-3">
      <ValidationObserver ref="personalInfoForm" tag="form">
        <div class="card-header">
          <h3 class="card-title">Chỉnh sửa thông tin</h3>
        </div>
        <div class="card-body">
          <div class="c-form">
            <div class="row">
              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="username"
                    class="c-form__label"
                  >
                    Tên công ty <span class="icon-required">*</span></label
                  >
                  <ValidationProvider
                    name="user_name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="username"
                      placeholder="Vui lòng nhập tên công ty"
                      v-model="user.company_name"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="phone-number"
                    class="c-form__label"
                  >
                    Số điện thoại <span class="icon-required">*</span>
                  </label>
                  <ValidationProvider
                    name="phone"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="phone-number"
                      placeholder="Vui lòng nhập số điện thoại"
                      v-model="user.phone"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="address"
                    class="c-form__label"
                  >
                    Địa chỉ <span class="icon-required">*</span>
                  </label>
                  <ValidationProvider
                    name="address"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="address"
                      placeholder="Vui lòng nhập địa chỉ"
                      v-model="user.company_address"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-12">
                <div class="form-group">
                  <label
                    for="company"
                    class="c-form__label"
                  >
                    Mô tả <span class="icon-required">*</span>
                  </label>

                  <ValidationProvider
                    name="company"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea class="form-control form-control-lg"
                      placeholder="Vui lòng nhập mô tả"
                      v-model="user.describe"
                    >
                    </textarea>

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <PageLoader v-if="isLoading"/>
        </div>

        <div class="card-footer text-right">
          <button
            type="button"
            class="btn btn-primary"
            @click="updateInfo"
          >
            Lưu
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState } from 'vuex';

import PageLoader from '@/components/PageLoader.vue';

import { User } from '@/shared/models/user';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class PersonalInfomation extends Vue {
  user: User;
  isLoading: boolean = false;

  updateInfo() {
    // this.isLoading = true;
    // // this.user.role = 'ADMIN';
    // UserApi.update(this.user.id, this.user.formJSONString())
    // .then((res: any) => {
    //   Toast.success('Cập nhật thông tin thành công');
    //   this.isLoading = false;
    // })
    // .catch((error: any) => {
    //   this.isLoading = false;
    //   Toast.handleError(error);
    // });
  }
}
</script>
