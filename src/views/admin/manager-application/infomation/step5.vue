<template>
  <div class="bg-white px-4 py-3 c-card text-left mx-3">
    <div class="mb-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Kinh nghiệm làm việc</h5>
      </div>

      <div class="c-form">
        <div class="row">
          <div class="col-4" v-for="(skill, index) in skills" :key="index">
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="skill"
                  v-model="selectedSkills"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">{{ skill }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <div class="admin-ctn__title">
        <h5 class="font-weight-bold mb-3">Ngoại ngữ</h5>
      </div>

      <div class="c-form">
        <div class="row">
          <div class="col-6">
            <div class="form-group d-flex" v-for="(item, index) in foreignLanguages" :key="index">
              <label for="school" class="w-50">{{ item.name }}</label>
              <select class="form-control" v-model="selectedLanguages">
                <option value="" disabled hidden>Trình độ</option>
                <option v-for="(level, i) in levels" :key="i">
                  {{ level }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="addInfo"
      >
        Thêm mới
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class SkillInfomation extends Vue {
  skills = [
    'Kỹ năng giao tiếp',
    'Kỹ năng tổ chức',
    'Kỹ năng lãnh đạo',
    'Kỹ năng thuyết trình',
    'Kỹ năng làm việc theo nhóm',
    'Lập kế hoạch',
    'Giải quyết vấn đề',
    'Tư duy sáng tạo',
    'Dễ thích nghi với môi trường mới',
    'Quản lí thời gian hiệu quả',
  ];

  levels = [
    'Sơ cấp', 'Trung cấp', 'Cao cấp', 'Bản ngữ',
  ];

  foreignLanguages = [
    {
      name: 'Tiếng Anh',
      level: '',
    },
    {
      name: 'Tiếng Pháp',
      level: '',
    },
    {
      name: 'Tiếng Trung',
      level: '',
    },
    {
      name: 'Tiếng Nhật',
      level: '',
    },
    {
      name: 'Tiếng Hàn',
      level: '',
    },
  ];

  selectedLanguages: any = [];

  selectedSkills = [];

  mounted() {
    this.getSkillInfo();
  }

  addInfo() {
    // Call api to update user info
    console.log(this.selectedSkills);
    console.log(this.selectedLanguages);
  }

  getSkillInfo() {
    const data: any = [
      'Kỹ năng giao tiếp',
      'Kỹ năng làm việc theo nhóm',
    ];

    this.selectedSkills = data;
  }
}
</script>

<style scoped lang='scss'>
</style>
