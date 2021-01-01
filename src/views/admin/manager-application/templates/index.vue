<template>
  <div class="container">
    <div class="cv-temp py-3 row">
      <div class="col-sm-5 cv-temp__left">
        <div class="cv-temp__avatar mt-5">
          <!-- <img src="@/assets/profile.jpg" alt="" /> -->
        </div>

        <div class="cv-temp__infor mt-4 p-5 text-light">
          <div class="cv-temp__contact mb-5">
            <ul>
              <li class="d-flex align-items-center mb-4 cv-temp__contact-name">
                <i class="fa fa-user mr-3"></i>
                <div class="">
                  <h2 class="mb-0 ">Tran Da Thao 333333</h2>
                  <p class="mb-0">Front-end Developer</p>
                </div>
              </li>

              <li class="d-flex align-items-center mb-4">
                <i class="fa fa-phone mr-3"></i>
                <div class="">
                  <a href="#" class="d-block text-light">+84 777919749</a>
                </div>
              </li>

              <li class="d-flex align-items-center mb-4">
                <i class="fa fa-map-marker mr-3"></i>
                <p class="mb-0">242 Nguyen Hoang Street, Da Nang City</p>
              </li>

              <li class="d-flex align-items-center">
                <i class="fa fa-envelope-o mr-3"></i>
                <a href="#" class="d-block text-light">tdthao29@gmail.com</a>
              </li>
            </ul>
          </div>

          <div class="cv-temp__social d-flex">
            <a href="https://www.facebook.com/profile.php?id=100036254980961"
              target="_blank" class="text-light">
              <i class="fa fa-facebook-official"></i>
            </a>
            <a href=""
              target="_blank" class="text-light">
             <i class="fa fa-github"></i>
            </a>
            <a href="https://www.instagram.com/stacey.dt_"
              target="_blank" class="text-light">
              <i class="fa fa-linkedin-square"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-sm-7 cv-temp__right">
        <div class="row cv-temp__ctn">
          <div class="col-sm-12 cv-temp__ctn-item mb-4">
            <h3 class="cv-temp__ctn-title">ABOUT ME</h3>
            <div class="cv-temp__ctn-text text-break">
              <p class="mb-0"> I am a third year student at Danang Pedagogical University,
                majoring in information technology. I am quite active, eager to learn.
                Enjoys programming and aspires to become a good web programmer.
              </p>
            </div>
          </div>

          <div class="col-sm-6 cv-temp__ctn-item mb-4">
            <h3 class="cv-temp__ctn-title">EXPERIENCES</h3>
            <div class="cv-temp__ctn-text cv-temp__ctn-text--border text-break">
              <ul>
                <li>
                  <p>Design web template by html, css, js,bootstrap,..</p>
                </li>
                <li>
                  <p> Work with database SQL, MySQL.</p>
                </li>
                <li>
                  <p>Having learned PHP programming language.</p>
                </li>
                <li>
                  <p>Responsive Web Design Certification.</p>
                </li>
                <li>
                  <p>Javascript Alogithms and Data Structures Certification.</p>
                </li>
                <li>
                  <p>Front-End Libraries Certification.</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 cv-temp__ctn-item mb-4">
            <h3 class="cv-temp__ctn-title">EDUCATION</h3>
            <div class="cv-temp__ctn-text cv-temp__ctn-text--border text-break">
              <ul>
                <li>
                  <h6 class="font-weight-bold">2015 - 2017</h6>
                  <p> Graduated from high school at Tran Phu High School</p>
                </li>

                <li>
                  <h6 class="font-weight-bold">2018 - 2020</h6>
                  <p>Are studying at University of DaNang-University of Science and Education.<br>
                    Major: Information technology
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 cv-temp__ctn-item cv-temp__ctn-skills mb-4">
            <h3 class="cv-temp__ctn-title">SKILLS</h3>
            <div class="cv-temp__ctn-text cv-temp__ctn-text--border cv__ctn-text--height text-break">
              <ul>
                <li class="cv-temp__ctn-skills-item">
                  <p>English</p>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </li>

                <li class="cv-temp__ctn-skills-item">
                  <p>Design Web Front-End</p>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </li>

                <li class="cv-temp__ctn-skills-item">
                  <p>Teamwork and search</p>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 cv-temp__ctn-item cv-temp__ctn-inter">
            <h3 class="cv-temp__ctn-title">INTERESTS</h3>
            <div class="cv-temp__ctn-text cv-temp__ctn-text--border">
              <ul>
                <li class="d-flex align-items-center">
                  <i class="fa fa-camera mb-0 mr-1"></i>
                  <p class="mb-0">Take photos</p>
                </li>

                <li class="d-flex align-items-center">
                  <i class="fa fa-shopping-bag mb-0 mr-1"></i>
                  <p class="mb-0">Go Shopping</p>
                </li>

                <li class="d-flex align-items-center">
                  <i class="fa fa-book mb-0 mr-1"></i>
                  <p class="mb-0">Read books</p>
                </li>

                <li class="d-flex align-items-center">
                  <i class="fa fa-plane mb-0 mr-1"></i>
                  <p class="mb-0">Travel</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Templates extends Vue {}
</script>

<style scoped lang="scss">
@import 'index.scss';
</style>
