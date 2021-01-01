<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Thông tin cá nhân</h5>
    </div>
    <ValidationObserver ref="personalInfoForm" tag="form" v-slot="{ invalid }">
      <div class="c-form">
        <div class="row">
          <div class="col-6">
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
                    <option value="" disabled hidden>--Chọn ngày--</option>
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
                    <option value="" disabled hidden>--Chọn tháng--</option>
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
                    <option value="" disabled hidden>--Chọn năm--</option>
                    <option v-for="item in years" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <div class="invalid-error__mess">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>

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

            <div class="form-group">
              <label for="marital-status" class="mb-0"
                >Tình trạng hôn nhân <span class="icon-required">*</span></label
              >
              <div class="form-check form-check-inline ml-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="maritalStatus"
                  id="inlineRadio1"
                  value="false"
                  v-model="user.marital_status"
                />
                <label class="form-check-label label-radio" for="inlineRadio1"
                  >Độc thân</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="maritalStatus"
                  id="inlineRadio2"
                  value="true"
                  v-model="user.marital_status"
                />
                <label class="form-check-label label-radio" for="inlineRadio2"
                  >Đã kết hôn</label
                >
              </div>
            </div>
          </div>

          <div class="col-6">
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

          <div class="col-12 text-right">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="invalid"
              @click="updateInfo"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { User } from '@/shared/models/user';
import { DAY, MONTH, YEAR } from '@/shared/constants/date';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class PersonalInfomation extends Vue {
  days: number[] = DAY;
  months: number[] = MONTH; // mảng để chọn
  years: number[] = YEAR;
  cities = ['đà nẵng', 'quảng nam'];
  districts = ['đà nẵng', 'quảng nam'];

  user: User = new User();

  mounted() {
    this.getUserInfo();
  }

  updateInfo() {
    // Call api to update user info
    console.log(this.user.formJSONString());
  }

  getUserInfo() {
    const data = {
      name: 'Da Thao',
      email: 'tdthao29@gmail.com',
      phone: '0777919749',
      city: '',
      district: '',
      address: '',
      gender: true,
      marital_status: false,
      day: '',
      month: '',
      year: '',
    };

    this.user = new User().deserialize(data);
  }
}
</script>

<style scoped lang='scss'>
// @import 'PersonalInfomation.scss';
</style>
