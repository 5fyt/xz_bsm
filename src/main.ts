import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import registerStore from './store/index'
import './assets/css/index.less'
import 'element-plus/dist/index.css'
import '@/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//封装的刷新后路由不会跳转到404而是保持到原来的路由，顺序不能改，先是动态注册路由在是挂载路由
app.use(registerStore)
app.use(router)
app.mount('#app')
