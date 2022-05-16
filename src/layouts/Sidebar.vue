<template>
  <div class="mg-sidebar">
    <div class="mg-sidebar__logo p-3 text-center">
      <h3 class="mb-0">FIWOR</h3>
    </div>

    <div class="mg-sidebar__main mt-3">
      <ul v-for="item in sidebarMenus" :key="item.name"
        class="nav">
        <li class="nav-item"
          :class="activeRoute(item) ? 'active' : ''">
          <router-link class="nav-link d-flex align-items-center"
            :to="item.path">
            <i :class="item.icon"></i>
            <span class="ml-2">{{ item.name }}</span>
          </router-link>
      </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Authenticate } from '@/shared/models/authenticate';
import { User } from '@/shared/models/user';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
  },
})
export default class Sidebar extends Vue {
  @Prop() readonly user: User;

  adminMenus = [
    {
      name: 'Hồ sơ ứng viên',
      icon: 'fa fa-address-card',
      path: '/admin/applications',
    },
    {
      name: 'Quản lý ứng viên',
      icon: 'fa fa-address-book',
      path: '/admin/users',
    },
    {
      name: 'Quản lý bài đăng',
      icon: 'fa fa-user',
      path: '/admin/jobs',
    },
    {
      name: 'Thông tin cá nhân',
      icon: 'fa fa-user',
      path: '/admin',
    },
  ];
  userMenus = [
    {
      name: 'Quản lý hồ sơ',
      icon: 'fa fa-address-card',
      path: '/user/application/profile',
    },
    {
      name: 'Mẫu hồ sơ',
      icon: 'fa fa-address-book',
      path: '/user/templates',
    },
    {
      name: 'Quản lý tài khoản',
      icon: 'fa fa-user',
      path: '/user/profile',
    },
  ];
  sidebarMenus: any[] = [];

  @Watch('user')
  watchUser(newVal: User, oldVal: User) {
    if (newVal && newVal.isAdmin) {
      this.sidebarMenus = this.adminMenus;
      return;
    }

    this.sidebarMenus = this.userMenus;
  }


  activeRoute(item: any) {
    if (item.path === this.$route.path) {
      return true;
    }

    return false;
  }

  getUserInfo(uid: string) {
    // this.isLoading = true;

    // UserApi.getUserInfo(uid)
    // .then((res: any) => {
    //   this.user = new User().deserialize(res);
    //   if (this.user.isAdmin) {
    //     this.sidebarMenus = this.adminMenus;
    //   } else {
    //     this.sidebarMenus = this.userMenus;
    //   }
    //   console.log(this.sidebarMenus, 'sidebarMenus')
    //   // this.isLoading = false;
    // })
    // .catch((error: any) => {
    //   // this.isLoading = false;
    //   Toast.handleError(error);
    // });
  }
}
</script>

<style scoped lang="scss">
.mg-sidebar {
  height: 100%;
  background: rgba(149, 104, 213, .62);
  color: #fff;

  a {
    color: #fff;
  }

  &__logo {
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }

  &__main {
    .nav {
      flex-direction: column;

      &-item {
        text-transform: uppercase;
        line-height: 30px;
        font-size: 12px;
        font-weight: 600;
        margin: 5px 15px;

        &.active,
        &:hover {
          .nav-link {
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.23);
          }
        }
      }

      &-link {
        padding: 10px 15px;
        transition: all .3s;
      }
    }
  }
}
</style>
