import { createApp } from 'vue'
import './style.css'
import './assets/styles/mobile-override.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局异常捕获
app.config.errorHandler = (err, vm, info) => {
  const componentName = vm?.$options?.name || vm?.$options?.__name || 'Unknown'
  console.error(`[Vue Error] 组件: ${componentName}`)
  console.error(`[Vue Error] 信息: ${info}`)
  console.error(err)
}

app.use(router)
app.mount('#app')
