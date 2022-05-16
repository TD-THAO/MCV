<template>
  <div>
    <div class="card text-left c-card mx-3">
      <div class="card-header">
        <h3 class="card-title">Mẫu hồ sơ</h3>
      </div>

      <div class="card-body">
        <div class="templates row">
          <div v-for="item in templates"
            :key="item.id"
            class="col-3"
            @click="chooseTemplate(item)"
          >
            <div class="card-item">
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
    </div>

    <PageLoader v-if="isLoading"/>
  </div>
</template>

<script lang='ts'>
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import TemplateApi from '@/shared/api/Template';
import Toast from '@/shared/utils/Toast';
import { Template } from '@/shared/models/template';
import { User } from '@/shared/models/user';
import PageLoader from '@/components/PageLoader.vue';

@Component({
  components: {
    PageLoader,
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
})
export default class Templates extends Vue {
  isLoading: boolean = false;
  templates: Template[] = [];
  user: User;

  mounted() {
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
    TemplateApi.update(this.user.id, item.formJSONString())
    .then((res: any) => {
      this.$router.push(`/user/templates/${item.id}`);
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
.card-item {
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
