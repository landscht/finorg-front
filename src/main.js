import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import store from "./store";
import locale from 'element-ui/lib/locale/lang/fr'



Vue.config.productionTip = false

Vue.use(ElementUI, {locale});
Vue.use(VueRouter);

const router = new VueRouter({
  routes : [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/signup', component: Signup},
    {path: '/home', component: Home}
    ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
