<template>
  <div class="smart-form">
    <el-card>
      <div class="clearfix" slot="header">
        <el-row class="caption">
          <el-col :span="12"><i class="fa fa-keyboard-o" style="padding-right: .5rem;"></i>{{formMetaData.form.name}}
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
              <el-input v-model="form[item.name]" autocomplete="off" :disabled="item.disabled"></el-input>
            </el-form-item>
            <!-- Radio -->
            <el-form-item :prop="item.name" v-if="item.type === 'radio'" :label="item.label">
              <el-radio-group v-model="form[item.name]">
                <el-radio v-for="option in item.options" :key="option.value" :label="option.value" :disabled="option.disabled">{{option.text}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- Checkbox -->
            <el-form-item :prop="item.name" v-if="item.type === 'checkbox'" :label="item.label">
              <el-checkbox-group v-model="form[item.name]">
                <el-checkbox v-for="option in item.options" :key="option.value" :label="option.value" :name="item.name" :disabled="option.disabled">
                  {{option.text}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- Select -->
            <el-form-item :prop="item.name" v-if="item.type === 'select'" :label="item.label">
              <el-select v-model="form[item.name]" placeholder="请选择" style="width: 100%;" :disabled="item.disabled">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.text"
                  :value="option.value"
                  :disabled="option.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- Datetime -->
            <el-form-item :prop="item.name" v-if="item.type === 'datetime'" :label="item.label">
              <el-date-picker
                v-model="form[item.name]"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%;"
                :disabled="item.disabled">
              </el-date-picker>
            </el-form-item>
            <!--Datetime Range-->
            <el-form-item :prop="item.name" v-if="item.type === 'datetimerange'" :label="item.label">
              <el-date-picker
                v-model="form[item.name]"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-form-item>
            <!-- Upload -->
            <el-form-item :prop="item.name" v-if="item.type === 'upload'" :label="item.label">
              <el-upload
                class="upload-demo"
                drag
                :action="item.action"
                multiple
                :disabled="item.disabled">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <!-- Textarea -->
            <el-form-item :prop="item.name" v-if="item.type === 'textarea'" :label="item.label">
              <el-input type="textarea" v-model="form[item.name]" autocomplete="off" :disabled="item.disabled"></el-input>
            </el-form-item>
            <!-- Number -->
            <el-form-item :prop="item.name" v-if="item.type === 'number'" :label="item.label">
              <el-input-number v-model="form[item.name]" autocomplete="off" :precision="item.precision || 0" :size="item.size || 'small'" :controls="item.controls || false" style="width: 100%;" :disabled="item.disabled"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>


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
          form: {
            name: '聪明的表单',
            /* 120px */
            labelWidth: '130px',
            /* left, right, top */
            labelPosition: 'right',
            /* 有几列 */
            col: 2
          },
          inputs: [
            {
              key: '001',
              label: '测试input',
              name: 'testInput',
              type: 'input',
              validators: [
                { required: true, message: '请输入文字', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              key: '002',
              label: '测试radio',
              name: 'testRadio',
              type: 'radio',
              options: [
                {
                  text: '测试一',
                  value: 0,
                  disabled: true,
                },
                {
                  text: '测试二',
                  value: 1
                },
                {
                  text: '测试三',
                  value: 2
                }
              ],
              validators: [
                { required: true, message: '请选择一项', trigger: 'change' }
              ]
            },
            {
              key: '003',
              label: '测试checkbox',
              name: 'testCheckbox',
              type: 'checkbox',
              options: [
                {
                  text: '测试一',
                  value: 0,
                  disabled: true,
                },
                {
                  text: '测试二',
                  value: 1
                },
                {
                  text: '测试三',
                  value: 2
                }
              ],
              validators: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ]
            },
            {
              key: '004',
              label: '测试select',
              name: 'testSelect',
              type: 'select',
              // disabled: true,
              options: [
                {
                  text: '测试一',
                  value: 0,
                  disabled: true,
                },
                {
                  text: '测试二',
                  value: 1
                },
                {
                  text: '测试三',
                  value: 2
                }
              ],
              validators: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              key: '005',
              label: '测试datetime',
              name: 'testDatetime',
              type: 'datetime',
              disabled: true,
              /*validators: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ]*/
            },
            {
              key: '006',
              label: '测试时间范围',
              name: 'testDatetimeRange',
              type: 'datetimerange',
              validators: [
                {
                  required: true, message: '请选择时间范围', trigger: 'blur'
                },
                {
                  validator: (rule, value, callback) => {
                    callback()
                  },
                  trigger: 'blur'
                }
              ]
            },
            {
              key: '007',
              label: '测试upload',
              name: 'testUpload',
              disabled: true,
              type: 'upload',
              /* 文件提交地址 */
              action: 'https://jsonplaceholder.typicode.com/posts/'
            },
            {
              key: '008',
              label: '测试textarea',
              name: 'testTextarea',
              disabled: true,
              type: 'textarea',
              /*validators: [
                { required: true, message: '请输入描述', trigger: 'blur' }
              ]*/
            },
            {
              key: '009',
              label: '测试number',
              name: 'testNumber',
              disabled: true,
              type: 'number',
              precision: 2,
              validators: [
                { required: true, message: '请输入数字', trigger: 'blur' }
              ]
            },
          ]
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        form,
        rules,
        rows,
        metaDataShow: false
      };
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate( (valid) => {
          if(valid) {
            this.$emit('submit', this.form)
          }
        });
      },
      resetForm() {
        this.$refs['form'].resetFields();
      }
    },
  };
</script>

<style scoped lang="sass">
  .upload-demo
    width: 100%
</style>
