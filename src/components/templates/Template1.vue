<template>
  <div id="template-1" class="template" :class="classes">
    <div class="d-flex">
      <nav class="template__sidebar navbar navbar-expand-lg navbar-dark" id="sideNav">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">
          <span class="d-block d-lg-none">Clarence Taylor</span>
          <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2"
              src="@/assets/default-avatar.jpg" alt="..." /></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
            class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <span class="nav-link">
                <strong>Giới tính: </strong>{{ application.user.genderString }}
              </span>
            </li>
            <li class="nav-item">
              <span class="nav-link">
                <strong>Ngày sinh: </strong>{{ application.user.birthdayString }}
              </span>
            </li>
            <li class="nav-item">
              <span class="nav-link">
                <strong>Điện thoại: </strong>{{ application.user.phone }}
              </span>
            </li>
          </ul>
        </div>
      </nav>
      <div class="template__content">
        <!-- Resume & User Info-->
        <section class="resume-section" id="about">
          <div class="resume-section-content">
            <!-- <h1 class="mb-0">
              Clarence
              <span class="text-primary">Taylor</span>
            </h1> -->
            <h1 class="mb-0 text-primary">
              {{ application.user.name }}
            </h1>
            <div class="subheading mb-5">
              {{ application.user.addressString }}
              <span class="text-primary"> · {{ application.user.email }}</span>
            </div>
            <p class="lead mb-5">
              {{ application.resume.describe }}
            </p>
          </div>
        </section>
        <hr class="m-0" />
        <!-- Experience-->
        <section class="resume-section" id="experience">
          <div class="resume-section-content">
            <h2 class="mb-5">Kinh nghiệm</h2>
            <div v-for="(item, index) in application.experiences" :key="index"
              class="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div class="flex-grow-1">
                <h3 class="mb-0">{{ item.company }}</h3>
                <div class="subheading mb-3">{{ item.name_job }}</div>
                <p>
                  {{ item.describe }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <span class="text-primary">
                  {{ item.start_at }} - {{ item.end_at }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <hr class="m-0" />
        <!-- Certificate-->
        <section class="resume-section" id="education">
          <div class="resume-section-content">
            <h2 class="mb-5">Học vấn - Bằng cấp</h2>
            <div v-for="(item, index) in application.certificates" :key="index"
              class="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div class="flex-grow-1">
                <h3 class="mb-0">{{ item.school_name }}</h3>
                <div class="subheading mb-3">{{ item.career_name }}</div>
                <div>{{ item.specialized }}</div>
                <p>Loại tốt nghiệp: {{ item.gra_certificate }}</p>
              </div>
              <div class="flex-shrink-0">
                <span class="text-primary">
                  {{ item.start_at }} - {{ item.end_at }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <hr class="m-0" />
        <!-- Skills-->
        <section class="resume-section" id="skills">
          <div class="resume-section-content">
            <h2 class="mb-5">Kỹ năng</h2>
            <!-- <div class="subheading mb-3">Workflow</div> -->
            <ul class="fa-ul mb-0">
              <li v-for="(item, index) in application.skills" :key="index">
                <i class="fa fa-check"></i>
                {{ skillName[item] }}
              </li>
            </ul>
          </div>
        </section>
        <hr class="m-0" />
        <!-- Languages-->
        <section class="resume-section" id="awards">
          <div class="resume-section-content">
            <h2 class="mb-5">Ngôn ngữ</h2>
            <ul class="fa-ul mb-0">
              <li v-for="(item, index) in application.languages" :key="index">
                <i class="fa fa-check"></i>
                {{ languageName[item.name] }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Application } from '@/shared/models/application';
import { SKILL_NAME } from '@/shared/enums/skill';
import { LANGUAGE_NAME } from '@/shared/enums/language';

@Component({
})
export default class ModalCEEXperience extends Vue {
  @Prop() readonly application: Application;
  @Prop() readonly classes: String;
  skillName = SKILL_NAME;
  languageName = LANGUAGE_NAME;
}
</script>
