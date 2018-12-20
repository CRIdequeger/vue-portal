<template>
  <el-card>
    <div class="clearfix" slot="header">
      <i class="fa fa-keyboard-o" style="padding-right: .5rem;"></i>聪明的表单
    </div>
    <el-form :model="form" label-width="120px" ref="form" :rules="rules" status-icon>
      <el-row :gutter="20">
        <el-col :span="8">
          <h3>元数据</h3>
        </el-col>
        <el-col :span="16">
          <h3>效果</h3>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-for="(item, index) in formMetaData.inputs" :key="item.key">
        <el-col :span="8" style="border-bottom: 1px solid #000">
          {{item}}
        </el-col>
        <el-col :span="16">
          <!-- Input -->
          <el-form-item :prop="item.name" v-if="item.type === 'input'" :label="item.label">
            <el-input v-model="form[item.name]" autocomplete="off"></el-input>
          </el-form-item>
          <!-- Radio -->
          <el-form-item :prop="item.name" v-if="item.type === 'radio'" :label="item.label">
            <el-radio-group v-model="form[item.name]">
              <el-radio v-for="option in item.options" :key="option.value" :label="option.value">{{option.text}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- Checkbox -->
          <el-form-item :prop="item.name" v-if="item.type === 'checkbox'" :label="item.label">
            <el-checkbox-group v-model="form[item.name]">
              <el-checkbox v-for="option in item.options" :key="option.value" :label="option.value" :name="item.name">
                {{option.text}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- Select -->
          <el-form-item :prop="item.name" v-if="item.type === 'select'" :label="item.label">
            <el-select v-model="form[item.name]" placeholder="请选择">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.text"
                :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- Datetime -->
          <el-form-item :prop="item.name" v-if="item.type === 'datetime'" :label="item.label">
            <el-date-picker
              v-model="form[item.name]"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <!--between Datetime-->
          <el-form-item v-if="item.type === 'betweenDatetime'" label="活动时间" required>
            <el-col :span="11" style="padding-left:0">
              <el-form-item :prop="item.options[0].name">
                <el-date-picker type="date" placeholder="选择日期" v-model="form[item.options[0].name]" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11" style="padding-left:0">
              <el-form-item :prop="item.options[1].name">
                <el-date-picker type="date" placeholder="选择日期" v-model="form[item.options[1].name]" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <!-- Upload -->
          <el-form-item :prop="item.name" v-if="item.type === 'upload'" :label="item.label">
            <el-upload
              class="upload-demo"
              drag
              :action="item.action"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <!-- Textarea -->
          <el-form-item :prop="item.name" v-if="item.type === 'textarea'" :label="item.label">
            <el-input type="textarea" v-model="form[item.name]" autocomplete="off"></el-input>
          </el-form-item>
          <!-- Number -->
          <el-form-item :prop="item.name" v-if="item.type === 'number'" :label="item.label">
            <el-input-number v-model="form[item.name]" autocomplete="off" :precision="item.precision || 0" :size="item.size || 'small'" :controls="item.controls || false"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="8">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-card>

</template>

<script>
  export default {
    name: 'smartForm',
    props: [
      'formMetaData'
    ],
    data() {
      let form = {}, rules = {};
      for (let item of this.formMetaData.inputs) {
        form[item.name] = item.type === 'checkbox' ? [] : '';
        rules[item.name] = item.validators;
      }
      return {
        metaDataDemo: {
          inputs: [
            {
              key: '001',
              label: '测试input',
              name: 'testInput',
              type: 'input',
              /* 下拉框, 单选按钮组, 多选框 */
              options: [
                {
                  text: '',
                  value: ''
                }
              ],
            }
          ]
        },
        form,
        rules
      };
    },
    mounted() {
      console.log(this.form)
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate( (valid) => {
          if(valid) {
            console.log('验证通过')
          }
        });
        console.log(this.form)
      }
    },
  };
</script>

<style scoped>

</style>
