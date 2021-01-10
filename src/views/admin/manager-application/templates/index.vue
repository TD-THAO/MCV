<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Mẫu hồ sơ</h5>
    </div>

    <div class="templates row">
      <div class="col-3">
        <div class="card">
          <img class="card-img-top" src="@/assets/templates/temp-1.png" alt="Card image cap">
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <img class="card-img-top" src="@/assets/templates/temp-2.png" alt="Card image cap">
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <img class="card-img-top" src="@/assets/templates/temp-3.png" alt="Card image cap">
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <img class="card-img-top" src="@/assets/templates/temp-4.png" alt="Card image cap">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Templates extends Vue {
}
</script>

<style scoped lang="scss">
.card {
  overflow: hidden;
  cursor: pointer;

  img {
    transition: transform .5s;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
