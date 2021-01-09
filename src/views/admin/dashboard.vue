<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="admin-ctn__title">
      <h5 class="font-weight-bold mb-3">Dashboard</h5>
    </div>

    <div>
      ABC
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import range from 'lodash/range';
import { User } from '@/shared/models/user';
import { DAY, MONTH, YEAR } from '@/shared/constants/date';
import { mapActions, mapGetters, mapState } from 'vuex';
import { Authenticate } from '@/shared/models/authenticate';
import UserApi from '@/shared/api/User';
import Toast from '@/shared/utils/Toast';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
   computed: {
    ...mapState('auth', [
      'auth',
    ]),
   },
})
export default class Dashboard extends Vue {
}
</script>
