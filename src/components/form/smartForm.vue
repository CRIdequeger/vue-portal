<template>
  <el-card>
    <div class="clearfix" slot="header">
      <el-row class="caption">
        <el-col :span="12"><i class="fa fa-keyboard-o" style="padding-right: .5rem;"></i>聪明的表单
        </el-col>
        <el-col :span="12" class="action" style="text-align: right;">
          <el-button type="primary" size="small" :icon="metaDataShow? `el-icon-minus` :`el-icon-plus`" @click="metaDataShow = !metaDataShow">{{metaDataShow? `隐藏元数据`: `显示元数据`}}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-form :model="form" :label-width="formMetaData.form.labelWidth || '120px'" :label-position="formMetaData.form.labelPosition || 'right'" ref="form" :rules="rules" status-icon>
      <el-row :gutter="20">
        <el-col v-if="metaDataShow" :span="8">
          <h3>元数据</h3>
        </el-col>
        <el-col :span="metaDataShow?16:24">
          <h3>效果</h3>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <el-col v-if="metaDataShow" :span="8" style="border-bottom: 1px solid #000">
          {{item}}
        </el-col>
        <el-col v-for="(item, index) in row" :key="item.key" :span="Math.ceil(24 / formMetaData.form.col)">
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
            <el-select v-model="form[item.name]" placeholder="请选择" style="width: 100%;">
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
              placeholder="选择日期时间"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <!--between Datetime-->
          <el-form-item v-if="item.type === 'betweenDatetime'" label="活动时间" required>
            <el-col :span="11" style="padding-left:0">
              <el-form-item :prop="item.options[0].name">
                <el-date-picker type="date" placeholder="选择日期" v-model="form[item.options[0].name]" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
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
            <el-input-number v-model="form[item.name]" autocomplete="off" :precision="item.precision || 0" :size="item.size || 'small'" :controls="item.controls || false" style="width: 100%;"></el-input-number>
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
      let form = {}, rules = {}, rows = [], rowNum = -1;
      for (let index in this.formMetaData.inputs) {
        if( index % this.formMetaData.form.col === 0 ) {
          rowNum +=1;
          rows[rowNum] = [];
        }
        let item = this.formMetaData.inputs[index];
        form[item.name] = item.type === 'checkbox' ? [] : '';
        rows[rowNum].push(item);
        rules[item.name] = item.validators;
      }
      console.log(rows);
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
        rules,
        rows,
        metaDataShow: false
      };
    },
    mounted() {
      console.log(this.form)
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate( (valid) => {
          if(valid) {
            this.$emit('submit', this.form)
          }
        });
      }
    },
  };
</script>

<style scoped lang="sass">
  .upload-demo
    width: 100%
</style>
