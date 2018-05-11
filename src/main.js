// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import './assets/my-theme/index.less';
import VueResource  from 'vue-resource'
//import 'iview/dist/styles/iview.css';

import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'

import VueMarkdown from 'vue-markdown';
Vue.component('vue-markdown', VueMarkdown);

Vue.config.productionTip = false
Vue.use(iView, { locale });
Vue.use(VueResource);
Vue.component('chart', ECharts)

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get(){return this.$root.bus} });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  data:{bus},
  components: { App }
})
