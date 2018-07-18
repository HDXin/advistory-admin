import Images from './Image'
import Upload from './Upload';
import KTable from './KTable';
import KFormItem from './KFormItem';
import Page from './Page'
import Vue from 'vue'


KFormItem.install = function(Vue){
    Vue.component(KFormItem.name,KFormItem);
}

Images.install = (Vue) =>{
    Vue.component(Images.name,Images);
}
Upload.install = (Vue) =>{
    Vue.component(Upload.name,Upload);
}

KTable.install = function(Vue){
    Vue.component(KTable.name,KTable);
}

Page.install = function(Vue){
    Vue.component(Page.name,Page);
}


Vue.use(KFormItem);
Vue.use(KTable);
Vue.use(Images);
Vue.use(Upload);
Vue.use(Page)