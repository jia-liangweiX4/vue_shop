<template>
  <div class="login">
    <div class="login_box">
      <div class="avatr">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 一定要自定义el-form的class类名,才能自定义样式 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="Formrules" label-width="100px" class="login_form">
      <el-form-item label="用户" prop="username" label-width="60px">
      <el-input type="text" v-model="loginForm.username" placeholder="请输入" prefix-icon="iconfont icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="60px">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入" prefix-icon="iconfont icon-3702mima"></el-input>
      </el-form-item>
      <el-form-item class="btns">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      Formrules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '名称长度不符合要求', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度不符合', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      var ret = await this.$http.post('login', this.loginForm)
      console.log(ret.data)
      const { meta } = ret.data
      if (meta.status !== 200) return this.$message.error('登录失败！')
      if (meta.status === 200 && meta.msg === '登录成功') this.$message.success('ok')
      window.sessionStorage.setItem('token', ret.data.data.token)
      this.$router.push('/home')
    },
    /// //////////////////下面先进行表单的与验证
    // this.$refs.loginFormRef.validate(async valid => {
    //   if (!valid) return
    //   const { data: res } = await this.$http.post('login', this.loginForm)
    //   console.log(res)
    //   if (res.meta.status !== 200) return this.$message.error('登录失败！')
    //   this.$message.success('登录成功')
    //   // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
    //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
    //   //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
    //   window.sessionStorage.setItem('token', res.data.token)
    //   // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
    //   this.$router.push('/home')
    // })
    resetForm() {
      console.log(this)
      // 获得表单对象
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang = "less" scoped>
  .login {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
      .avatr {
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 130px;
        width: 130px;
        background-color: #fff;
        /* border: 1px solid #eee; */
        border-radius: 50%;
        padding: 10px;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
          border: 1px solid #fff;
          background-color: #fff;
          border-radius: 50%;
          /* overflow: hidden; */
        }
      }
      .login_form {
        /* background-color: #ccc; */
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
      }
  }
  .btns {
    /* float: right; */
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
    margin-bottom: 5px;
    /* margin-top: -10px; */
  }
</style>
