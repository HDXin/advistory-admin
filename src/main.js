// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './components/common'
import 'element-ui/lib/theme-chalk/index.css'
import "wangeditor/dist/css/wangEditor.less";
import 'normalize.css'
import './styles/index.less'
import './util'
import moment from 'moment';
moment.locale('zh-cn')
Vue.config.productionTip = false

Vue.prototype.moment = moment;

Vue.use(ElementUI);

Vue.mixin({   
  methods:{  
     goBack(){
         this.$router.go(-1)
     }
  }  
}); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
