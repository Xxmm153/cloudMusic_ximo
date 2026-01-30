import { createApp } from "vue"; //引入vue
import "./tailwind.css"; //引入tailwind
import "./common/font/font.css"; //引入字体图标
import router from "./router/index"; //引入vue路由
import "@/common/iconfont/iconfont.css"; //引入iconfont字体图标库
import store from "@/store/index"; //商店
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
import App from "./App.vue"; //当前入口
const app = createApp(App); //创建app实例
app.use(store); //使用路由
app.use(vue3videoPlay);
app.use(router); //使用路由
app.mount("#app"); //挂载在app元素上
