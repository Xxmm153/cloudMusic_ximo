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
          <div class="iconfont icon-wangyi  text-primary !text-2xl"></div>
           <!-- 随着主题颜色变换logo  图标样式-->
          <!-- <div class="iconfont icon-wangyiyunyinle  text-primary" style="font-size:30px;"></div> -->
          <!-- 固定颜色logo -->
            <!-- <img :src="logoImage" alt="" class="h-[50%]"> -->
            <!-- 名称 -->
            <div class="text-[18px] font-bold">Ximo Muisc <span class="text-primary">Player</span></div>
            <!-- 首页按钮 -->
            <Button variant="outline" size="sm" class="ml-[20px] h-[65%] text-[13px] hover:text-primary" @click="goRouter('/')">
                首页
            </Button>
            <!-- 前进按钮 -->
             <Button variant="outline" size="sm"  class="h-[65%]  hover:text-primary" @click="goRouter(1)">
               <ChevronLeft class="size-[13px]" />
            </Button>
            <!-- 回退按钮 -->
             <Button variant="outline" size="sm" class="h-[65%] hover:text-primary" @click="goRouter(-1)">
               <ChevronRight class="size-[13px]"/>
            </Button>
            <!-- 项目仓库按钮 -->
             <a href="https://github.com/Xxmm153/cloudMusic_ximo" class="h-[65%]" target="_blank">
                 <Button variant="outline" size="sm"  class="ml-[20px] gap-[5px] h-full text-[13px] hover:text-primary" >
               <Github class="size-[12px]"/>项目仓库<ArrowUpRight class="size-[13px]"/>
            </Button>
             </a>
         </div>
         <!-- 中间 -->
         <div class="flex-1 h-[100%] px-[80px] relative overflow-hidden">
             <!-- 你可以根据你的想象力再此填充一下中间空白如显示歌词/动画等 主包先空着 -->
          </div>
          <!-- 右侧输入框 登录 -->
         <div class="flex gap-[10px] h-full items-center">
            <!-- 收缩框 -->
            <InputGroup class="!h-[65%]">
               <InputGroupInput  placeholder="搜索音乐、歌手、专辑..." />
               <InputGroupAddon>
                 <Search class="size-[13px]" />
               </InputGroupAddon>
            </InputGroup>
            <Button  @click="drakMode"  variant="outline" size="sm" class="h-[65%] hover:text-primary" >
              <MoonStar v-if="!isDrak" class="size-[13px]" /> <Sun v-else class="size-[13px]" /><span class=" text-[13px]"> {{ !isDrak?'黑夜':'白天' }}</span>
            </Button>
            <Button  @click="showThemDialog" variant="outline" size="sm" class="h-[65%] hover:text-primary" ><Sparkles class="size-[13px] text-primary " /><span class=" text-[13px]">切换主题</span></Button>
            <!-- 登录按钮 -->
            <Button  @click="showLogin" variant="outline" size="sm" class="h-[65%] hover:text-primary" ><User class="size-[13px]" /><span class=" text-[13px]">登录</span></Button>
         </div>
    </div>
  <Dialog v-model:open="loginDialogShow" @update:open="closeDialog">
    <form>
      <DialogContent class="sm:max-w-1/4 transition-all duration-300" @click="DialogContentClick">
        <DialogHeader>
          <DialogTitle class="text-2xl">登录Login</DialogTitle>
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
           <span v-for="i in loginTypeOther" @click="changeLogin(i)" class="text-[13px] items-end hover:underline cursor-pointer transition-all">
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
 <Dialog v-model:open="themShow" @update:open="themShowDialogClose">
      <DialogContent class="sm:max-w-1/4 transition-all duration-300">
        <DialogHeader>
          <DialogTitle>切换主题</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div class="thembox py-4 px-5 m-h-1/3" >
      <!-- <div class="thembox-t h-fit text-3xl font-bold">
        <div class="t-t-l"><span class="text-primary">Variable</span> <span class="text-primary">Themes</span></div>
        <div class="t-t-r iconfont icon-zhuti_tiaosepan !text-2xl text-primary"></div>
      </div> -->
       <div class="thembox-t h-fit font-bold">
        <!-- <div class="t-t-l"><span class="">VariableThemes</span></div> -->
        <div class="t-t-l"><span class="text-2xl">可变主题  </span></div>
        <div class="t-t-r iconfont icon-zhuti_tiaosepan !text-2xl text-primary"></div>
      </div>
      <!-- <div class=" mt-0">
        Cycle between 9 themes and choose your favorite theme to apply~.
      </div> -->
       <div class=" mt-0">
        在9个主题之间循环，选择你最喜欢的主题来使用吧~。
      </div>
      <!-- 这里主题可以写数组进行循环 当时主题少所以就一个个加上去了  随后变多了hhh  你可以优化成数组改一下 -->
      <div class="them-con my-6">
        <!-- Rose Theme -->
        <div class="them-con-item rose bg-primary" :class="{'them-ac':currentThem==='rose'}" @click="changeThem('rose')">
          <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Purple Theme -->
        <div class="them-con-item Purple bg-primary" :class="{'them-ac':currentThem==='Purple'}" @click="changeThem('Purple')">
         <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Green Theme -->
        <div class="them-con-item green bg-primary" :class="{'them-ac':currentThem==='green'}" @click="changeThem('green')">
         <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Dark Theme -->
        <div class="them-con-item dark bg-background" :class="{'them-ac':currentThem==='dark'}" @click="changeThem('dark')">
          <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div> 
          </div>
        </div>
        
        <!-- Red Theme -->
        <div class="them-con-item red bg-primary" :class="{'them-ac':currentThem==='red'}" @click="changeThem('red')">
          <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Orange Theme -->
        <div class="them-con-item orange bg-primary" :class="{'them-ac':currentThem==='orange'}" @click="changeThem('orange')">
        <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Blue Theme -->
        <div class="them-con-item blue bg-primary" :class="{'them-ac':currentThem==='blue'}" @click="changeThem('blue')">
        <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- Yellow Theme -->
        <div class="them-con-item yellow bg-primary" :class="{'them-ac':currentThem==='yellow'}" @click="changeThem('yellow')">
          <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
        
        <!-- DeepPink Theme -->
        <div class="them-con-item deeppink bg-primary" :class="{'them-ac':currentThem==='deeppink'}" @click="changeThem('deeppink')">
          <!-- <div class="top">
            <div class="iconfont icon-lvsehuanbaohuichang"></div>
            deeppink
          </div> -->
          <div class="top">
            <div class="h-5"></div>
          </div>
          <div class="tm-show">
            <div style="background-color: var(--primary)"></div>
            <div style="background-color: var(--parimary-hover)"></div>
            <div style="background-color: var(--foreground)"></div>
            <div style="background-color: var(--background)"></div>
          </div>
        </div>
      </div>
      <div class="bu">
            <Button variant="outline" @click="themShowDialogClose">
            不要
          </Button>
          <Button @click="themShowDialogOk">
              就要就要
            </Button>
      </div>
      </div>
      </DialogContent>
  </Dialog>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, computed } from 'vue'//引入vue
import { homeapi } from '@/api'//引入api
import { useRouter } from 'vue-router'//引入路由
import { ChevronLeft, ChevronRight, Github, ArrowUpRight, User, Search,Sparkles,MoonStar,Sun} from 'lucide-vue-next'//使用lucide图标
// import vueQr from 'vue-qr/src/packages/vue-qr.vue'
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
const router = useRouter()//使用路由
const themShow = ref<boolean>(false)//主题弹窗显示
const isDrak=ref<any>(localStorage.getItem('isDrak') || false)//是否为暗黑模式
const currentThem=ref(localStorage.getItem('themeXimo')||'rose')
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
//切换暗黑
const drakMode = () => {
  isDrak.value = !isDrak.value
  localStorage.setItem('isDrak',isDrak.value )
  if (isDrak.value){
      // start吧主题存储一份 进行替换
  const themeOther = localStorage.getItem('themeXimo') || 'rose'
  localStorage.setItem('themeOther',themeOther)
  //end吧主题存储一份 进行替换
  currentThem.value = 'dark'
    localStorage.setItem('themeXimo', 'dark')
    document.documentElement.className =  'dark'
  return
  }
   currentThem.value = localStorage.getItem('themeOther') || 'rose'
  localStorage.setItem('themeXimo', localStorage.getItem('themeOther') || 'rose')
    document.documentElement.className =  localStorage.getItem('themeOther') || 'rose'
}
//主题弹窗确定
const themShowDialogOk = () => {
  localStorage.setItem('themeXimo', currentThem.value)
  document.documentElement.className = currentThem.value
  themShow.value=false
}
//当主题弹窗打开是时候触发
const themShowDialogClose = () => {
  currentThem.value = localStorage.getItem('themeXimo') || 'rose'
  themShow.value=false
}
//改变主题
const changeThem = (theme: string) => {
  currentThem.value=theme
}
//打开主题切换弹窗
const showThemDialog = () => {
    themShow.value=true
}
//路由跳转
const goRouter = (path: string | number) => {
  typeof path === 'number' && router.go(path)
  typeof path === 'string' && router.push({path})
}
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
.them-ac {
  position: relative;
  border: 3px solid #c0ab92;
  &::after {
    position: absolute;
    content: "\e60b";
    font-family: "iconfont" !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #c0ab92;
  }
}
//使用我其他项目写的样式
.thembox {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: var(--color-card);
  overflow: hidden;
  .bu {
    display: flex;
    justify-content: end;
    gap: 20px;
    padding-left: 10px;
    margin-top: 10px;
    > div {
      cursor: pointer;

      width: 150px;
      height: 40px;
      background-color: #b6ab90;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 1s;
      &:hover {
        transform: scale(1.03);
      }
    }
    .color {
      background-color: var(--primary);
      color:#fff
    }
  }
  .thembox-t {
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .thembox-con {
    height: 40px;
    line-height: 40px;
    color: var(--primary);
  }
  .them-con {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    gap: 20px;
    justify-items: center;
    align-items: center;
    .them-con-item {
      box-sizing:content-box;
      cursor: pointer;
      height: 4rem;
      width: 6rem;
      border-radius: 0.6rem;
      padding: 0.5rem 0.5rem 0 0.5rem;
      .top {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.8rem;
      }
      .tm-show {
        height: 60px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        > div {
          height:1.3rem;
          width: 1.3rem;
          border-radius: 50%;
          border: 1px solid #b7b7b7;
        }
        div:nth-child(n + 1) {
          margin-left: -10px;
        }
      }
    }
  }
}
//
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