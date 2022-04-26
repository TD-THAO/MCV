<template>
  <modal
    :name="name"
    class="basic-modal"
    :clickToClose="true"
    :width="500"
    height="auto"
    :scrollable="true"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose', $event)"
  >
    <div class="modal-body modal-body--custom text-center" v-html="content"></div>

    <div class="modal-footer pt-2 pb-2 justify-content-center">
      <button class="btn btn-secondary btn-mw-100"
        :disabled="isLoading"
        @click="closeModal">
        Hủy
      </button>
      <button class="btn btn-danger btn-mw-100"
        :disabled="isLoading"
        @click="submitForm">
        Xóa
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  components: {
  },
})
export default class ModalConfirmDelete extends Vue {
  @Prop(String) readonly name!: string;
  @Prop(String) readonly content!: string;
  @Prop({default: false}) readonly isLoading!: boolean;
  item: any = {};

  beforeOpen(event: any) {
    if (event.params.item) {
      this.item = event.params.item
    }
  }

  closeModal() {
    this.$modal.hide(this.name);
  }

  submitForm() {
    this.$emit('submit', this.item);
  }
}
</script>
