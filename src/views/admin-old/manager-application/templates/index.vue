<template>
  <div>
    <div v-if="!isLoading"
      class="bg-white px-4 py-3 c-card text-left mx-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Mẫu hồ sơ</h5>
      </div>

      <div class="templates row">
        <div v-for="item in templates"
          :key="item.id"
          class="col-3"
          @click="chooseTemplate(item)"
        >
          <div class="card">
            <img
              class="card-img-top"
              :src="getImgUrl(item.image_name)"
              alt="Card image cap"
            >
            <div class="img-hover">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="chooseTemplate(item)"
              >
                Xem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageLoader v-else/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import TemplateApi from '@/shared/api/Template';
import Toast from '@/shared/utils/Toast';
import { Template } from '@/shared/models/template';
import { Authenticate } from '@/shared/models/authenticate';
import PageLoader from '@/components/PageLoader.vue';

@Component({
  components: {
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'auth',
    ]),
  },
})
export default class Templates extends Vue {
  isLoading: boolean = false;
  templates: Template[] = [];
  auth: Authenticate;
  userId: string = '';

  @Watch('auth')
  watchAuth(newVal: Authenticate, oldVal: Authenticate) {
    this.userId = newVal.uid;
  }

  mounted() {
    if (this.auth.uid) {
      this.userId = this.auth.uid;
    }
    this.getTemplates();
  }

  getTemplates() {
    this.isLoading = true;
    TemplateApi.getTemplates()
    .then((res: any) => {
      if (res) {
        this.templates = res.map((item: Template) => new Template().deserialize(item));
      }
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  chooseTemplate(item: Template) {
    this.isLoading = true;
    TemplateApi.update(this.userId, item.formJSONString())
    .then((res: any) => {
      this.$router.push(`/admin/templates/${item.id}`);
      this.isLoading = false;
    })
    .catch((error: any) => {
      this.isLoading = false;
      Toast.handleError(error);
    });
  }

  getImgUrl(item: any) {
    const images = require.context('@/assets/templates', false, /\.jpg$/)
    return images('./' + item + '.jpg')
  }
}
</script>

<style scoped lang="scss">
.card {
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    .img-hover {
      display: flex;
    }
  }
  img {
    transition: transform .5s;
    height: 406px;
    object-fit: fill;

    // &:hover {
    //   transform: scale(1.2);
    // }
  }

  .img-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #21252924;
    display: none;
    justify-content: center;
    align-items: center;
  }
}
</style>
