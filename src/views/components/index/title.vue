<!-- user:ximo -->
<!-- name: 头部组件 -->
<!-- path:false -->
<template>
  <div class="size-full flex justify-between items-center px-[20px]">
      <!-- 容器 -->
      <div class=' h-full flex items-center gap-[10px]'>
        <!-- 左侧logo处 -->
         <!-- 图标 -->
          <!-- 随着主题颜色变换logo  繁体字体样式 -->
          <div class="iconfont icon-wangyi  text-primary" style="font-size:30px;"></div>
           <!-- 随着主题颜色变换logo  图标样式-->
          <!-- <div class="iconfont icon-wangyiyunyinle  text-primary" style="font-size:30px;"></div> -->
          <!-- 固定颜色logo -->
            <!-- <img :src="logoImage" alt="" class="h-[50%]"> -->
            <!-- 名称 -->
            <div class="text-[18px] font-bold">Ximo Muisc Player</div>
            <!-- 首页按钮 -->
            <Button variant="outline" size="sm" class="ml-[20px] h-[60%] text-[13px] hover:text-primary">
                首页
            </Button>
            <!-- 前进按钮 -->
             <Button variant="outline" size="sm"  class="h-[60%]  hover:text-primary">
               <ChevronLeft class="size-[13px]" />
            </Button>
            <!-- 回退按钮 -->
             <Button variant="outline" size="sm" class="h-[60%] hover:text-primary">
               <ChevronRight class="size-[13px]"/>
            </Button>
            <!-- 项目仓库按钮 -->
              <Button variant="outline" size="sm"  class="ml-[20px] gap-[5px] h-[60%] text-[13px] hover:text-primary" >
               <Github class="size-[12px]"/>项目仓库<ArrowUpRight class="size-[13px]"/>
            </Button>
         </div>
         <!-- 中间 -->
         <div class="flex-1 h-[100%] px-[80px] relative overflow-hidden">
             <!-- 你可以根据你的想象力再此填充一下中间空白如显示歌词/动画等 主包先空着 -->
          </div>
          <!-- 右侧输入框 登录 -->
         <div class="flex gap-[10px] h-full items-center">
            <!-- 收缩框 -->
            <InputGroup>
               <InputGroupInput  placeholder="搜索音乐、歌手、专辑..." />
               <InputGroupAddon>
                 <Search class="size-[13px]" />
               </InputGroupAddon>
            </InputGroup>
            <!-- 登录按钮 -->
            <Button  @click="showLogin" variant="outline" size="sm" class="h-[60%] hover:text-primary" ><User class="size-[13px]" /><span class=" text-[13px]">登录</span></Button>
         </div>
    </div>
       <Dialog v-model:open="loginDialogShow" @update:open="closeDialog">
    <form>
      <DialogContent class="sm:max-w-1/4 transition-all duration-300" @click="DialogContentClick">
        <DialogHeader>
          <DialogTitle>登录Login</DialogTitle>
          <DialogDescription>
            当前登录方式为<span class="text-primary">{{ loginType.text }}</span>,当然你也可以选择剩下两种登录方式( <span v-for="(i,index) in loginTypeOther" :key="i.value" class="text-primary">{{ i.text }} <span v-if="!index">、</span></span> )
          </DialogDescription>
        </DialogHeader>
        <div class=" h-55 flex flex-col justify-center items-center" v-if="loginType.value==='qr'">
         
           <div class="size-38 relative">
            <!-- <vueQr :text="qrUrl"></vueQr> 使用插件生成二维码-->
             <!-- 直接使用返回的base64展示 -->
            <div v-show="!qrUrl" class="flex justify-center items-center size-38">
              <div class="relative w-24 h-24">
                <!-- 外圈旋转 -->
                <div class="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <!-- 内圈反向旋转 -->
                <div class="absolute inset-2 rounded-full border-2 border-primary/10 border-b-primary animate-spin-reverse"></div>
                <!-- 中心花朵 -->
                <div class="absolute inset-4 flex justify-center items-center">
                  <div class="w-8 h-8 rounded-full bg-primary/30 animate-pulse"></div>
                </div>
              </div>
            </div>
            <img  v-show="qrUrl" :src="qrUrl" alt="" class="size-full absolute">
            <div v-show="avatarUrl" class="absolute size-full z-50 bg-black/80 flex flex-col justify-center items-center">
               <div v-if="noUseQr" class="text-sm text-card">已过期</div>
               <img v-else  :src="avatarUrl" alt="" class="size-15 rounded-full">
               <div v-show="!noUseQr&&nickname " class="text-sm mt-1 text-primary font-bold">{{ nickname }}</div>
            </div>
           </div>
           <div class="text-sm mt-1">{{qrMessage?qrMessage:'请使用网易云app扫码'}}</div>
            <Button class="mt-3" type="submit" @click.stop="reCreatQr">
            重新生成
          </Button>
        </div>
        <div class="grid gap-4" v-else>
          <div class="flex flex-col gap-1">
            <Label for="name-1">{{ loginType.value==='phone'?'手机号':'邮箱' }}</Label>
            <Input v-model="sendLoginData.user" id="name-1" name="name"  :placeholder="loginType.value==='phone'?'手机号 这儿~':'邮箱 这儿~'" class="rounded-sm !h-8" :class="{'border-primary':uerWarning}" />
            <div v-show="uerWarning" class="text-[11px] ml-1 text-primary">{{ loginType.value==='phone'?'手机号不能为空哦~':'邮箱不能为空哦~'  }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="username-1">密码</Label>
            <Input type="password"  v-model="sendLoginData.password" id="username-1" name="username" placeholder="密码 这儿~" class="rounded-sm !h-8" :class="{'border-primary':passwordWarning}" />
            <div v-show="passwordWarning" class="text-[11px] ml-1 text-primary">{{ '密码不能为空哦~'  }}</div>
          </div>
        </div>
          
        <DialogFooter>
         <div class="flex-1 flex items-end gap-4 ">
           <span v-for="i in loginTypeOther" @click="changeLogin(i)" class="text-[13px] items-end text-primary hover:underline cursor-pointer transition-all">
            {{ i.text }}
           </span>
           <!-- <span  class="text-[13px] items-end text-primary hover:underline cursor-pointer transition-all">
            扫码登录
          </span> -->
         </div>
          <DialogClose as-child v-show="loginType.value!=='qr'">
            <Button variant="outline">
              下次一定
            </Button>
          </DialogClose>
          <Button type="submit" @click.stop="goLogin" v-show="loginType.value!=='qr'">
            现在就登录
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
       
  </Dialog>

</template>

<script setup lang='ts'>

//#region 引入import
import { ref, computed } from 'vue'//引入vue
import {homeapi } from '@/api'//引入api
import { ChevronLeft, ChevronRight, Github, ArrowUpRight, User, Search } from 'lucide-vue-next'//使用lucide图标
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { Button } from '@/components/ui/button'//引入shadcn组件button
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'//引入shadcn组件input组组件
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'//引入模态框组件
import { Input } from '@/components/ui/input'//引入输入框组件
import { Label } from '@/components/ui/label'//引入标签组件
import 'vue-sonner/style.css'//引入弹窗css
import { Toaster } from '@/components/ui/sonner'//引入弹窗
import { toast } from 'vue-sonner'//引入弹窗
//#endregion 引入import
interface loginTypeType{
    text:string
    value:'phone'|'email'|'qr'
}
//#region 响应式数据 ref、reactive、watch、computed...
const loginType = ref<loginTypeType>({ text: '手机号登录', value: 'phone' })//登录方式
const uerWarning=ref<boolean>(false)//账号警告
const passwordWarning=ref<boolean>(false)//密码警告
const loginDialogShow = ref<boolean>(false)//登录弹窗是否显示
const qrUrl = ref<string>('')//当前二维码
const QrKey=ref<any>()//当前二维码的key
const currentQrSetTimeInterval = ref<any>(null)//当前二维码定时器
const avatarUrl = ref<string>('')//扫码成功后用户头像
const nickname = ref<string>('')//扫码成功后用户名称
const qrMessage = ref<string>('')//当前message
const noUseQr=ref<boolean>(false)//当前二维码是否过期
//登录的账号密码
const sendLoginData = ref<{user:string,password:string}>({
   user:'',
   password:''
})
//计算剩下的登录方式
const loginTypeOther=computed(()=>{
  if(loginType.value.value==='phone'){
    return [{text:'邮箱登录',value:'email'},{text:'扫码登录',value:'qr'}]
  }else if(loginType.value.value==='email'){
    return [{text:'手机号登录',value:'phone'},{text:'扫码登录',value:'qr'}]
  }else{
    return [{text:'手机号登录',value:'phone'},{text:'邮箱登录',value:'email'}]
  }
})
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
//#endregion 生命周期

//#region 事件函数
//关闭当前二维码查询事件
const closeQrInterval = () => {
  if (!currentQrSetTimeInterval.value) return
  clearInterval(currentQrSetTimeInterval.value)
  currentQrSetTimeInterval.value=null
}
//初始化二维码相关数据
const initQrData = () => {
  qrUrl.value=''
  avatarUrl.value=''
  nickname.value=''
  qrMessage.value=''
  noUseQr.value=false
}

//初始化弹窗输入的账号密码
const initSendData = () => {
  sendLoginData.value={
   user:'',
   password:''
}
}
//当弹窗改变的时候执行
const closeDialog = () => {
    closeQrInterval()//关闭定时器
  DialogContentClick()//警告消失
  initSendData()//初始化账号密码
  loginType.value = { text: '手机号登录', value: 'phone' }//初始化当前状态
 
}
//点击弹窗让警告消失
const DialogContentClick = () => {
 uerWarning.value && (uerWarning.value = false)
 passwordWarning.value && (passwordWarning.value=false)
}
//现在登录
const goLogin = async() => {
      //账号校验为空
    if (!sendLoginData.value.user) {
        uerWarning.value=true
        return
      }
       //密码校验为空
      if(!sendLoginData.value.password){
       passwordWarning.value=true
        return
      }
      // 当前是手机号的情况
       let params 
      try {
        if (loginType.value.value === "phone") {
          params = {
            phone: sendLoginData.value.user,
            password: sendLoginData.value.password
          }
        } else { 
          params = {
            email: sendLoginData.value.user,
            password: sendLoginData.value.password
          }
        }
       
        const rudata = await homeapi.getCellphone(params)
        // 调用接口显示有风险 没办法做
        if (rudata.code === 200) {
          // 进行存储当前用户信息及token
        } else {
          //提示
        }
          console.log('手机号',rudata)
       } catch (error) {
          console.error('登录失败',error)
       }

}
//改变登录方式
const changeLogin = (data:loginTypeType) => {
  loginType.value = data
  closeQrInterval()//关闭定时器
  reCreatQr()//生成二维码
  initSendData()//初始化账号密码
}
//生成二维码
const reCreatQr =async () => {
  if (loginType.value.value === 'qr') {
    closeQrInterval()//关闭定时器
     initQrData()//清空二维码状态
    // 生成二维码
     const key = await homeapi.getQrkey()
    QrKey.value=key.data.unikey
    const qrUrlData = await homeapi.getCreatQr(QrKey.value)
    // 显示二维码
    if (qrUrlData.code===200) {
     qrUrl.value=qrUrlData.data.qrimg
     }
   currentQrSetTimeInterval.value=setInterval(() => {
    qrPolling()
   }, 3000);
    console.log('二维码',qrUrl.value)
  }
}
// 二维码轮询
const qrPolling = async () => {
  const qrUrlData = await homeapi.getCheckQr(QrKey.value)
  //当前只要登录就都不行  二维码登录成功的在这处理
  // if(){} 
  if (qrUrlData.code === 802) {
    avatarUrl.value=qrUrlData.avatarUrl
    nickname.value = qrUrlData.nickname
    qrMessage.value = qrUrlData.message
    return
  } 
  if (qrUrlData.code === 800) {
    qrMessage.value = qrUrlData.message
    noUseQr.value = true
      closeQrInterval()//关闭定时器
   }
}
//点击‘登录’按钮
const showLogin = () => {
  loginDialogShow.value=true
}
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息

</script>
<style lang='scss' scoped>
:deep(.border-input){
    height: 60%;
    font-size: 14px;
    input{
        font-size: 13px;
    }
}
/* 花朵精美动画效果 */
@keyframes bloom {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
    opacity: 0.9;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-4px) rotate(2deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

</style>