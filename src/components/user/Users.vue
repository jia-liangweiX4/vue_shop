<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- clearable:提供一个X删除搜索关键字 -->
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
      <!-- 用户列表区域 border竖边框stripe是否为斑马纹-->
      <template>
        <el-table
          :data="userlist"
          stripe
          border
          style="width: 100%">
          <el-table-column
          label="序号"
            type="index"
            :index="0">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="90">
          </el-table-column>    
          <el-table-column
            prop="email"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色">
          </el-table-column>
          <el-table-column
            label="状态"
            width="90">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change = 'mg_stateChange(scope.row)'></el-switch>
            </template>   
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <!-- 删除按钮 -->
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <!-- 分配角色按钮enterable鼠标是否可以进入提示框 -->
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change= "pageSizeChange"
        @current-change= "handleCurrentChange"
        :current-page= "queryInfo.pagenum" 
        :page-sizes= "[2, 5, 10, 20]"
        :page-size= "queryInfo.pagesize"
        layout= "total, sizes, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
    </el-card>
    <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          @close="addDialogClosed">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

  </div> 
</template>
<script>
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        //搜索条件
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
       dialogVisible: false,
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.getUserList() 
  },
  methods: {
     async getUserList() {
      var {data:res} = await this.$http.get('/users',{params:this.queryInfo})
      console.log(res);
      if(res.meta.status !==200) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.total
     },
     pageSizeChange(size) {
       this.queryInfo.pagesize = size
       this.getUserList()
     },
     handleCurrentChange(page_num) {
       this.queryInfo.pagenum = page_num 
       this.getUserList()
     },
      async mg_stateChange(state){
      var {data:res} = await this.$http.put(`users/${state.id}/state/${state.mg_state}`)
      console.log(res);
      if(res.meta.status !== 200) {
        state.mg_state = !state.mg_state;
        return this.$message.error('更改状态失败')
      }
      return this.$message.success('更改状态成功')
     },
     addDialogClosed() {
        this.$refs.addFormRef.resetFields()
     },
    addUser() {
      
      this.$refs.addFormRef.validate(async (valid) => {
          if (valid) {
           var {data:res} = await this.$http.post('users',this.addForm)
           console.log(res);
           if(res.meta.status ==201) {
             this.dialogVisible = false
             this.$message.success('创建用户成功')
             this.getUserList()
           } else {
             return this.$message.error('创建用户失败')
           }
          } else {
            this.$message.error('填写信息有误')
            return false;
          }
        })
      }
  
  }
}
</script>
<style lang="less" scoped>
.el-card {
  // display: flex;
  margin-top: 20px !important;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>


