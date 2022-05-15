<template>
  <div class="admin d-flex">
    <!-- <div class="admin-left">
      <Sidebar />
    </div> -->

    <div class="admin-right flex-1">
      <Header />

      <div clas="admin-ctn">
        <div class="mt-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/layouts/Sidebar.vue';
import Header from '@/layouts/Header.vue';

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class Home extends Vue {
}
</script>
