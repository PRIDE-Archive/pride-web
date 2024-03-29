/**
 * import necessary module
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import locale from 'view-design/dist/locale/en-US'
import 'view-design/dist/styles/iview.css'
import '@/assets/my-theme/index.less';
import VueResource  from 'vue-resource'
/**
 * import third part module
 */
import ECharts from 'vue-echarts/components/ECharts'
import VueMarkdown from 'vue-markdown'
import ReadMore from 'vue-read-more'
import VueMeta from 'vue-meta'
import TextHighlight from 'vue-text-highlight'
/**
 * import ECharts modules manually to reduce bundle size
 */
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/sunburst'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legend/ScrollableLegendModel.js'
import 'echarts/lib/component/legend/ScrollableLegendView.js'
import 'echarts/lib/component/legend/scrollableLegendAction.js'
import 'echarts/lib/component/dataZoom.js'
import 'echarts/lib/chart/map'
import 'echarts/map/json/world.json'
import 'echarts/map/js/world.js'

Vue.component('vue-markdown', VueMarkdown);
Vue.component('text-highlight', TextHighlight);
Vue.config.productionTip = false
Vue.use(ViewUI, { locale })
Vue.use(VueResource);
Vue.use(ReadMore);
Vue.component('chart', ECharts)
Vue.use(VueMeta)

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get(){return this.$root.bus} });

new Vue({
  router,
  store,
  data:{bus},
  render: h => h(App)
}).$mount('#app')