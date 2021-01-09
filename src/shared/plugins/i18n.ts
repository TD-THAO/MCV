import Vue from 'vue';
import VueI18n from 'vue-i18n';
import vi from 'vee-validate/dist/locale/vi.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'vi',
  messages: {
    vi: {
      fields: {
        email: 'email',
        password: 'mật khẩu',
        password_confirmation: 'xác nhận mật khẩu',
        user_name: 'họ tên',
        phone: 'số điện thoại',
        address: 'địa chỉ',
        day: 'ngày',
        month: 'tháng',
        year: 'năm',
        city: 'tỉnh/thành phố',
        district: 'huyện/quận',
        new_password: 'mật khẩu mới',
        confirm_new_password: 'xác nhận mật khẩu mới',
        name: 'tên',
      },

      validation: {
        ...vi.messages,
        required: 'Vui lòng nhập {_field_}',
      },
    },
  },
});

export { i18n };
