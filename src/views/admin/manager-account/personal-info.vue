<template>
  <div>
    <div class="col-12 text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModalConfirm()"
      >
        Đổi mật khẩu
      </button>
    </div>

    <div class="bg-white px-4 py-3 c-card text-left mx-3 mt-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Cập nhật thông tin tài khoản</h5>
      </div>
      <ValidationObserver ref="personalInfoForm" tag="form">
        <div class="c-form">
          <div class="row">
            <div class="col-12 col-xl-6">
              <div class="form-group">
                <label for="username"
                  >Họ tên <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="user_name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control"
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
                  >Tỉnh/Thành phố <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="city"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control" v-model="user.city">
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
                  >Số điện thoại <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="phone"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control"
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
                  >Huyện/Quận <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="district"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select class="form-control" v-model="user.district">
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
                    >Ngày sinh <span class="icon-required">*</span></label
                  >
                  <ValidationProvider
                    name="day"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select class="form-control" v-model="user.day">
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
                    >Tháng sinh <span class="icon-required">*</span></label
                  >
                  <ValidationProvider
                    name="month"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select class="form-control" v-model="user.month">
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
                    >Năm sinh <span class="icon-required">*</span></label
                  >
                  <ValidationProvider
                    name="year"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select class="form-control" v-model="user.year">
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
                  >Địa chỉ <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="address"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control"
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
                  >Địa chỉ email <span class="icon-required">*</span></label
                >
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <input
                    :class="{ 'invalid-error__input': errors.length }"
                    v-model="user.email"
                    type="text"
                    class="form-control"
                    placeholder="Vui lòng nhập email"
                  />

                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label for="sex" class="mb-0"
                  >Giới tính <span class="icon-required">*</span></label
                >
                <div class="form-check form-check-inline ml-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="true"
                    v-model="user.gender"
                  />
                  <label class="form-check-label label-radio" for="female"
                    >Nữ</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio2"
                    value="false"
                    v-model="user.gender"
                  />
                  <label class="form-check-label label-radio" for="inlineRadio2"
                    >Nam</label
                  >
                </div>
              </div>
            </div>

            <div class="col-12">

            </div>

            <div class="col-12 text-right">
              <button
                type="button"
                class="btn btn-primary"

                @click="updateInfo"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </ValidationObserver>

      <PageLoader v-if="isLoading"/>
    </div>

    <ModalConfirm
      name="modalConfirm"
      content="Bạn có chắc chắn muốn gửi email xác nhận đổi mật khẩu không?"
      @submit="handleConfirm"
    />
  </div>
</template>

<script lang='ts'>
import firebase from 'firebase';

import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import range from 'lodash/range';
import { User } from '@/shared/models/user';
import { DAY, MONTH, YEAR } from '@/shared/constants/date';
import { CITIES, DISTRICT } from '@/shared/constants/address';
import { mapActions, mapGetters, mapState } from 'vuex';
import { Authenticate } from '@/shared/models/authenticate';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';
import PageLoader from '@/components/PageLoader.vue';
import ModalConfirm from '@/components/modal/ModalConfirm.vue';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    PageLoader,
    ModalConfirm,
  },
   computed: {
    ...mapState('auth', [
      'auth',
    ]),
   },
})
export default class PersonalInfomation extends Vue {
  days: number[] = DAY;
  months: number[] = MONTH;
  years: number[] = YEAR;
  cities: string[] = CITIES;
  districts: string[] = DISTRICT;
  user: User = new User();
  auth: Authenticate;
  isLoading: boolean = false;
  userId: string = '';

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
    this.getUserInfo(newVal.uid);
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
      this.getUserInfo(this.auth.uid);
    }
  }

  updateInfo() {
    this.isLoading = true;
    UserApi.update(this.userId, this.user.formJSONString())
    .then((res: any) => {
      Toast.success('Cập nhật tài khoản thành công');
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getUserInfo(uid: string) {
    this.isLoading = true;

    UserApi.getUserInfo(uid)
    .then((res: any) => {
      this.user = new User().deserialize(res);
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

    firebase.auth().sendPasswordResetEmail(this.auth.email)
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
