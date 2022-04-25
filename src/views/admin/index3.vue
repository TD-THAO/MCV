<template>
  <div class="admin">
    <h1 id="title">{{ name }}</h1>
    <h1 v-html="name" :id="title"></h1>
    <p v-if="true">Thoat an thoat hien 1</p>
    <p v-show="true">Thoat an thoat hien 2</p>
    <a :href="link" @click.stop="submit">Link</a>
    <p>{{ revertContent }}</p>
    <button @click="submit">Click</button>
    <p :class="{ active: isActive }">Class</p>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class ManagerApplication extends Vue {
  name = '<span style="color: red">Mau sac</span>';
  id = 1;
  title = 'title';
  link = 'https://google.com';
  book = 'book name'
  isActive = true;

  mounted() {}

  get revertContent() {
    return this.book + ' new'
  }

  submit() {
    this.book = 'book title'
  }
}
</script>

<style scoped lang='scss'>
.active {
  background: red;
}
</style>
