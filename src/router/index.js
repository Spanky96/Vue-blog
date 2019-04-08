import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import Login from '@/pages/Login';

import Article from '@/pages/index/Article';
import Whisper from '@/pages/index/Whisper';
import Leacots from '@/pages/index/Leacots';
import Album from '@/pages/index/Album';
import About from '@/pages/index/About';
import Details from '@/pages/index/Details';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page'
    },
    {
      path: '/page',
      name: 'Index',
      component: Index,
      redirect: '/page/article',
      children: [
        {
          path: 'article',
          name: 'Article',
          component: Article
        },
        {
          path: 'whisper',
          name: 'Whisper',
          component: Whisper
        },
        {
          path: 'leacots',
          name: 'Leacots',
          component: Leacots
        },
        {
          path: 'album',
          name: 'Album',
          component: Album
        },
        {
          path: 'about',
          name: 'About',
          component: About
        },
        {
          path: 'details',
          name: 'Details',
          component: Details
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
