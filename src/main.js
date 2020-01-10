// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'minireset.css'
import './style/common'
import Vue from 'vue'
import App from './App'
import router from './router/router'
import './config/rem'
import 'vant/lib/index.css'

Vue.config.productionTip = true

//引入Vant插件
import { Button, Search, Popup, ActionSheet, Picker, Field, Toast, Icon } from 'vant';

Vue.use(Button);  // 按钮
Vue.use(Search);  // 搜索框
Vue.use(Popup);   // 弹出层
Vue.use(ActionSheet); //上拉菜单
Vue.use(Picker);  // 选择器
Vue.use(Field);   // 输入框
Vue.use(Toast);  // 轻提示
Vue.use(Icon);

Vue.filter('date', function (val, cutChar) {
  cutChar = typeof cutChar === 'string' ? cutChar : '/';
  return new Date(val).toLocaleString().split(' ')[0].replace('/', cutChar);
})

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
})
