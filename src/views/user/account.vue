<template>
  <div>
    <div class="col-12 text-right mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalConfirm()"
      >
        Đổi mật khẩu
      </button>
    </div>
    <div class="card text-left c-card mx-3">
      <ValidationObserver ref="personalInfoForm" tag="form">
        <div class="card-header">
          <h3 class="card-title">Chỉnh sửa hồ sơ</h3>
        </div>
        <div class="card-body">
          <div class="c-form">
            <div class="row">
              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="username"
                    class="c-form__label"
                  >
                    Họ tên <span class="icon-required">*</span></label
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
                      placeholder="Vui lòng nhập họ và tên"
                      v-model="user.name"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="city"
                    class="c-form__label"
                  >
                    Tỉnh/Thành phố <span class="icon-required">*</span>
                  </label>
                  <ValidationProvider
                    name="city"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select class="form-control form-control-lg" v-model="user.city">
                      <option value="" disabled hidden>Chọn Tỉnh/Thành phố</option>
                      <option v-for="item in cities" :key="item">
                        {{ item }}
                      </option>
                    </select>
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
                  <label for="district"
                    class="c-form__label"
                  >
                    Huyện/Quận <span class="icon-required">*</span>
                  </label>
                  <ValidationProvider
                    name="district"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select class="form-control form-control-lg" v-model="user.district">
                      <option value="" disabled hidden>Chọn Huyện/Quận</option>
                      <option v-for="item in districts" :key="item">
                        {{ item }}
                      </option>
                    </select>
                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="form-group row">
                  <div class="col-4">
                    <label for="day"
                      class="c-form__label"
                    >
                      Ngày sinh <span class="icon-required">*</span>
                    </label>
                    <ValidationProvider
                      name="day"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <select class="form-control form-control-lg" v-model="user.day">
                        <option value="" disabled hidden>Ngày</option>
                        <option v-for="item in days" :key="item">
                          {{ item }}
                        </option>
                      </select>
                      <div class="invalid-error__mess">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="col-4">
                    <label for="month"
                      class="c-form__label"
                    >
                      Tháng sinh <span class="icon-required">*</span>
                    </label>
                    <ValidationProvider
                      name="month"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <select class="form-control form-control-lg" v-model="user.month">
                        <option value="" disabled hidden>Tháng</option>
                        <option v-for="item in months" :key="item">
                          {{ item }}
                        </option>
                      </select>
                      <div class="invalid-error__mess">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="col-4">
                    <label for="year"
                      class="c-form__label"
                    >
                      Năm sinh <span class="icon-required">*</span>
                    </label>
                    <ValidationProvider
                      name="year"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <select class="form-control form-control-lg" v-model="user.year">
                        <option value="" disabled hidden>Năm</option>
                        <option v-for="item in years" :key="item">
                          {{ item }}
                        </option>
                      </select>
                      <div class="invalid-error__mess">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
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
                      v-model="user.address"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="form-group">
                  <label for="email"
                    class="c-form__label"
                  >
                    Địa chỉ email <span class="icon-required">*</span>
                  </label>
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <input
                      :disabled="true"
                      :class="{ 'invalid-error__input': errors.length }"
                      v-model="user.email"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Vui lòng nhập email"
                    />

                    <div class="invalid-error__mess">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="sex"
                    class="c-form__label"
                  >
                    Giới tính <span class="icon-required">*</span>
                  </label>
                  <div class="d-flex">
                    <label class="c-control c-control-radio mr-3">Nữ
                      <input class="c-control-input"
                        type="radio"
                        checked="checked"
                        name="gender"
                        value="true"
                        v-model="user.gender"
                      >
                      <span class="checkmark"></span>
                    </label>

                    <label class="c-control c-control-radio">Nam
                      <input class="c-control-input"
                        type="radio"
                        name="gender"
                        value="false"
                        v-model="user.gender"
                      >
                      <span class="checkmark"></span>
                    </label>
                  </div>
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

      <ModalConfirm
        name="modalConfirm"
        content="Bạn có chắc chắn muốn gửi email xác nhận đổi mật khẩu không?"
        @submit="handleConfirm"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import firebase from 'firebase';
import range from 'lodash/range';

import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState } from 'vuex';

import PageLoader from '@/components/PageLoader.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';

import { User } from '@/shared/models/user';
import { DAY, MONTH, YEAR } from '@/shared/constants/date';
import { CITIES, DISTRICT } from '@/shared/constants/address';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    PageLoader,
    ModalConfirm,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class PersonalInfomation extends Vue {
  days: number[] = DAY;
  months: number[] = MONTH;
  years: number[] = YEAR;
  cities: string[] = CITIES;
  districts: string[] = DISTRICT;
  user: User;
  isLoading: boolean = false;

  updateInfo() {
    this.isLoading = true;
    UserApi.update(this.user.id, this.user.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật tài khoản thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  openModalConfirm() {
    this.$modal.show('modalConfirm');
  }

  handleConfirm() {
    this.isLoading = true;

    firebase.auth().sendPasswordResetEmail(this.user.email)
    .then((res: any) => {
      this.isLoading = false;
      Toast.success('Đã gửi email xác nhận đổi mật khẩu');
      this.$modal.hide('modalConfirm');
    })
    .catch((error) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }
}
</script>
