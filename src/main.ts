import { createApp } from 'vue'//引入vue
import './tailwind.css'//引入tailwind
import './common/font/font.css'//引入字体图标
import router from './router/index'//引入vue路由
import '@/common/iconfont/iconfont.css'//引入iconfont字体图标库
import App from './App.vue'//当前入口

const app = createApp(App)//创建app实例
app.use(router)//使用路由
app.mount('#app')//挂载在app元素上
app.config.globalProperties.$message = message;
