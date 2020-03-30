设置表头样式

el-form 校验中 插入 el-table

```html
//el-form校验
//Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 //prop 属性设置为需校验的字段名即可。
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<script>
	export default {
        data(){
            return {
                   ruleForm: {
                      name: '',
                      
                    },
                        rules: {
                         name: [
                                 { required: true, message: '请输入活动名称',                                        trigger: 'blur' },
                                 { min: 3, max: 5, message: '长度在 3 到 5 个字                                        符', trigger: 'blur' }
                         ],

        }
                	
            }
        }
    }
</script>

```





- 校验须知
  - form 组件需要绑定 相关数据 提供给validate方法
  - 每一个form-item组件 需要绑定相应的prop进行比对校验
  - rules的填写, 绑定到form组件  也可单独绑定到form-item组件上



为el-table 封装 el-form的校验

> 问题关键就在于如何给el-form-item动态绑定prop

