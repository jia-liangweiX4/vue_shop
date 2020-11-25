<template>
<el-container class="home-container">
  <el-header>
    <div>
      <img src="../assets/logo.png" alt="logo">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" plain @click="log_out" class="logout">退出</el-button>

    </el-header>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
      <el-menu background-color="#333744" text-color="#eee" active-text-color = '#ffd04b'	 unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">    
      <el-submenu :index="item.id+''" v-for = 'item in MenuList' :key = item.id>
        <template slot="title">
          <i :class="iconli[item.id]"></i>
          <span class="itemTag">{{item.authName}}</span>
        </template>
        <!--:index="'/'+itemsub.path" 启用router后，会以index作为路由跳转  -->
        <el-menu-item :index="'/'+itemsub.path"  v-for ='itemsub in item.children' :key = itemsub.id @click = 'activepath_change("/" + itemsub.path)'>
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{itemsub.authName}}</span>
          </template>
          
        </el-menu-item>
      </el-submenu>
    
    </el-menu>
    </el-aside>
    <!-- 主要区域 -->
    <el-main>
      <!-- 路由占位符 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>
<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      MenuList:[],
      iconli:{
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      }
    }
  },
  created(){
    this.getMenuList()
    // 为啥这里还要赋一次值
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    log_out() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
     var {data:res} = await this.$http.get('menus');
     if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //  console.log(res);
     this.MenuList = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    activepath_change(path) {
      window.sessionStorage.setItem('activepath',path) 
      this.activePath = path
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ccc;
  >div {
    span {
      margin-left: 10px;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
}

.el-aside{
  background-color:#333744;
}
.el-main{
  background-color:#eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.itemTag {
  margin-left: 10px;
}
</style>
