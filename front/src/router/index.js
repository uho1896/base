import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/components/layout/index'
import store from '@/store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        meta: { cache: true },
        component: resolve => require(['../components/home/index'], resolve),
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash};
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    const params = {
      ...to.params,
      fullPath: to.fullPath,
    };
    await store.dispatch('bag/putIn', params);
    await store.dispatch('progress/resetProgress');

    next();
  } catch(e) {
    console.log(e);
  }
});

export default router