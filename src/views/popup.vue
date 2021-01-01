<template>
  <div class="container">
    <div class="login-form">
      <form>
        <p>Cập nhật thông tin người dùng</p>
        <div class="form-group">
          <label for="">Họ và tên đầy đủ</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputUsername"
            placeholder="Vui lòng nhập họ và tên đầy đủ"
          />

        </div>
        <div class="form-group">
        <label for="">Số điện thoại</label>
          <input
            type="number"
            class="form-control"
            id="exampleInputNumber"
            placeholder="Vui lòng nhập số điện thoại"
          />
        </div>
        <p>Chú ý: Bạn nên dùng những thông tin thật để tránh bỏ qua những cơ hội việc làm tốt nhất.</p>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Login extends Vue {}
</script>
