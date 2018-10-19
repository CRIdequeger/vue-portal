import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../views/DashBoard';
import Login from '../views/Login';
import Register from '../views/Register';
import updateUsers from '../components/user/update.user'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: Dashboard,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/user/:id/update',
      name: 'updateUsers',
      component: updateUsers,
      props: true,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
