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
app.use(router)
app.use(registerStore)
app.mount('#app')