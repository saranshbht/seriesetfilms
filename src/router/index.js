import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
// import Item from "../views/Item";
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Profile from '../views/Profile';
import Favorites from '../views/Favorites';
// import AuthGaurd from './auth_guard';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:type/:id',
    name: 'Item',
    props: true,
    component: () => import('../views/Item.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresVisitor: true
    }
    // component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresVisitor: true
    }
    // component: () => import('../views/SignUp.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // beforeEnter: AuthGaurd
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    // beforeEnter: AuthGaurd
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: 'Invalid Path',
    component: Home,
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ path: '/signin' });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (user) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
