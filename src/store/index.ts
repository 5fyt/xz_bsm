//初始化pinia
import { createPinia } from 'pinia'
import type { App } from 'vue'
import { useLoginStore } from './login/login'
const pinia=createPinia()
function registerPinia(app:App<Element>){
  app.use(pinia)
  const store=useLoginStore()
  store.asyncLoadRouter()
}
export default registerPinia
