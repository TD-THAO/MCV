<template>
  <div class="mg-sidebar">
    <ul class="list-group sidebar-list__group-parent">
      <li class="list-group-item text-left">
        <div class="sidebar-list__item-header d-flex justify-content-between align-items-center">
          <i class="fa fa-newspaper-o mr-1"></i>
          <a href="" class="flex-1"><span>Quản lý hồ sơ</span></a>
          <i class="fa fa-angle-down text-right"></i>
        </div>

        <ul class="list-group sidebar-list__group-children">
          <li class="list-group-item text-left border-0 p-3">
            <i class="fa fa-circle-o font-10 "></i>
            <router-link to="/admin/complete-profile">
              <span>Cập nhật thông tin hồ sơ</span>
            </router-link>
          </li>
          <li class="list-group-item text-left border-0 p-3">
            <i class="fa fa-circle-o font-10"></i>
            <router-link to="/admin/create-profile">
              <span>Tạo hồ sơ</span>
            </router-link>
          </li>
        </ul>
      </li>

      <li class="list-group-item text-left">
        <div class="sidebar-list__item-header d-flex justify-content-between align-items-center">
          <i class="fa fa-user mr-1"></i>
          <a href="" class="flex-1"><span>Quản lý tài khoản</span></a>
          <i class="fa fa-angle-down text-right"></i>
        </div>
        <ul class="list-group sidebar-list__group-children">
          <li class="list-group-item text-left border-0 p-3">
            <i class="fa fa-circle-o font-10"></i>
            <router-link to="/admin">
              <span>Cập nhật thông tin</span>
            </router-link>
          </li>
          <li class="list-group-item text-left border-0 p-3">
            <i class="fa fa-circle-o font-10"></i>
            <router-link to="/admin/change-password">
              <span>Đổi mật khẩu</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component({
  components: {
  },
})
export default class Sidebar extends Vue {
  mounted() {
  }
}
</script>

<style scoped lang="scss">
// @import 'ChangePassword.scss';
.mg-sidebar {
  .fa {
    width: 20px;
  }
  a {
    text-decoration: none;
    color: black;
  }
}

.sidebar-list {
  &__group-parent {
    box-shadow: 0 0 21px 0 rgba(89, 102, 122, 0.1);
    height: 100vh;

    .list-group-item {
      border: 0;
      padding: 0;
      background: rgba(255, 251, 251, 27%);
      color: #fff;
    }
  }

  &__item-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding: 1rem;
  }
}
</style>
