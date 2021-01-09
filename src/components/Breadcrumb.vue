<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">22</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Library</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Library</a>
        </li>
        <li class="breadcrumb-item active"
          aria-current="page">
          Data
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';

@Component({
  components: {},
})
export default class Breadcrumb extends Vue {
  mounted() {
    // this.initBreadcrumb();
  }

  initBreadcrumb() {
    console.log(this.$route);
    const arr = this.$route.path.split('/');
    if (arr.length <= 2) {
      console.log(arr, 'arr');

    }
  }
}
</script>

<style scoped lang='scss'>
.breadcrumb {
  background-color: transparent;
}
</style>
