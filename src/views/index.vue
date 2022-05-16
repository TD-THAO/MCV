<template>
  <div class="home">
    <div class="home__header border-bottom">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <a class="navbar-brand" href="#">FIWOR</a>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link"
              to="/jobs">
              Tuyển dụng
            </router-link>

            <router-link class="nav-link"
              to="/login">
              Đăng nhập
            </router-link>
            <!-- <a class="nav-link" href="#">Tuyển dụng</a> -->
            <!-- <button type="button"
              class="nav-link btn">
              Đăng nhập
            </button> -->
          </div>
        </div>
      </nav>
    </div>

    <div class="home__body">
      <router-view></router-view>
    </div>

    <footer class="home__footer">
      <div class="container">
        <h2>FIWOR</h2>
        <p>
          Trụ sở chính: Tầng 1,2,3 tòa nhà VNPT, 344 đường 2-9, Q. Hải Châu, TP Đà Nẵng<br>
          Chi nhánh: Tầng 4, Toà nhà VVA, Số 277 - 279 Lý Tự Trọng, P. Bến Thành, Quận 1, TP. Hồ Chí Minh<br>
          Điện thoại liên hệ: 0236 3539292
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Index extends Vue {
}
</script>
