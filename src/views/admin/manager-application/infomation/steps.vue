<template>
  <div>
    <div class="bg-white px-4 py-3 c-card text-left mx-3 mb-3">
       <ul class="progressbar row m-0 p-0">
          <li class="col" v-for="route in routes"
            :key="route.name"
            :class="{ 'active': isCurrentRoute(route.path) }">
            <router-link :to="route.path">
              <p class="progressbar__icon mb-1">{{ route.icon }}</p>
              <span class="progressbar__txt font-weight-bold">{{ route.name }}</span>
            </router-link>
          </li>
        </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class ManagerApplicationInfo extends Vue {
  routes = [
    {
      path: 'step1',
      name: 'Thông tin cá nhân',
      icon: '1',
    },
    {
      path: 'step2',
      name: 'Thông tin hồ sơ',
      icon: '2',
    },
    {
      path: 'step3',
      name: 'Học vấn bằng cấp',
      icon: '3',
    },
    {
      path: 'step4',
      name: 'Kinh nghiệm làm việc',
      icon: '4',
    },
    {
      path: 'step5',
      name: 'Kỹ năng',
      icon: '5',
    },
  ];

   private isCurrentRoute(path: string): boolean {
    const lastItem =  this.$route.path.substring( this.$route.path.lastIndexOf('/') + 1);
    return path === lastItem;
  }
}
</script>

<style scoped lang="scss">
$col-main: #3e96d6;

.progressbar {
  li {
    text-align: center;
    position: relative;

    &::after {
      content: '';
      width: 70%;
      height: 2px;
      position: absolute;
      background-color: #ddd;
      top: 21px;
      left: calc((-100% / 3) - 10px);
      background-color: $col-main;
    }

    &:first-child {
      &::after {
        content: none;
      }
    }

    &.active {
      .progressbar {
        &__icon {
          background-color: $col-main;
          color: #fff;
        }

        &__txt {
          color: $col-main;
        }
      }
    }

    a {
      color: $col-main;

      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  }

  &__icon {
    width: 40px;
    margin: auto;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid $col-main;
    color: $col-main;
    font-weight: bold
  }
}
</style>
