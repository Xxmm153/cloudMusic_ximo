import { createPinia } from 'pinia'//引入pinia
import piniapersist  from 'pinia-plugin-persistedstate'//持久化插件
const store = createPinia()//创建实例
//应用主键
store.use(piniapersist)//应用持久化插件
export default store//暴露