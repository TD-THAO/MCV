import User from '@/views/user/index.vue';
import UserAccount from '@/views/user/account.vue';
import Templates from '@/views/user/templates/index.vue';
import DetailTemplate from '@/views/user/templates/detail.vue';
import Application from '@/views/user/application/index.vue';
import ApplicationExperience from '@/views/user/application/experience.vue';
import ApplicationCertification from '@/views/user/application/certification.vue';
import ApplicationLanguage from '@/views/user/application/language.vue';
import ApplicationSkill from '@/views/user/application/skill.vue';
import ApplicationResume from '@/views/user/application/resume.vue';
import ApplicationProfile from '@/views/user/application/profile.vue';

export default [
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'profile',
        name: 'UserAccount',
        component: UserAccount,
      },
      {
        path: 'templates',
        name: 'templates',
        component: Templates,
      },
      {
        path: 'templates/:id',
        name: 'DetailTemplate',
        component: DetailTemplate,
      },
      {
        path: 'application',
        component: Application,
        children: [
          {
            path: 'profile',
            name: 'ApplicationProfile',
            component: ApplicationProfile,
          },
          {
            path: 'resume',
            name: 'ApplicationResume',
            component: ApplicationResume,
          },
          {
            path: 'certification',
            name: 'ApplicationCertification',
            component: ApplicationCertification,
          },
          {
            path: 'experience',
            name: 'ApplicationExperience',
            component: ApplicationExperience,
          },
          {
            path: 'language',
            name: 'ApplicationLanguage',
            component: ApplicationLanguage,
          },
          {
            path: 'skill',
            name: 'ApplicationSkill',
            component: ApplicationSkill,
          },
          {
            path: '',
            redirect: {
              name: 'ApplicationProfile'
            },
          },
        ],
      },
      {
        path: '',
        redirect: {
          name: 'UserAccount'
        },
      },
    ],
  },
];
