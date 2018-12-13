<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <el-row class="caption">
            <el-col><i class="fa fa-sitemap"></i>组织机构树</el-col>
          </el-row>
          <el-tree :data="data" :props="defaultProps" icon-class="fa fa-plus" @node-click="handleNodeClick"
                   @node-contextmenu="showContextMenu">
            <span class="custom-tree-node" slot-scope="{node, data}">
              <span>
                <i v-if="data.type === 'userGroup'" class="fa fa-users" style="color:#32c5d2"></i>
                <i v-else-if="data.type === 'quarters'" class="fa fa-flag" style="color:#E08283"></i>
                <span>{{data.text}}</span>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <el-row class="caption">
            <el-col :span="12"><i class="fa fa-table"></i>人员信息列表</el-col>
            <el-col :span="12" class="action">
              <el-button type="primary" size="small" icon-class="fa fa-plus" plain @click="handleCreate">新增人员
              </el-button>
              <el-button type="primary" size="small" icon-class="fa fa-trash" plain>删除人员</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData.rows"
            border
            style="width: 100%">
            <el-table-column
              label="操作"
              width="112"
              fixed="left">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                    <el-button size="mini" type="primary" icon="fa fa-edit"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                    <el-button size="mini" type="primary" icon="fa fa-trash-o"
                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="岗位管理" placement="top-start">
                    <el-button size="mini" type="primary" icon="fa fa-flag-o"
                               @click="handleQuatersManage(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="账号分配" placement="top-start">
                    <el-button size="mini" type="primary" icon="fa fa-user-o"
                               @click="handleAccount(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                </el-button-group>

              </template>
            </el-table-column>
            <el-table-column
              prop="personCode"
              label="人员编码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fullName"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="quartersName"
              label="岗位"
              width="180">
            </el-table-column>
            <el-table-column
              prop="securityLevel"
              label="密级">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <context-menu id="context-menu" ref="ctxMenu">
      <li v-for="item in contextMenuList">
        <el-button :disabled="item.disable" size="medium" :icon="`fa ${item.icon}`" @click="handleContextMenuClick">
          {{item.text}}
        </el-button>
      </li>
    </context-menu>
    <el-dialog
      title="人员信息"
      :visible.sync="personInfoDialog.visible"
      width="750px"
      :open="beforePersonInfoDialogOpen">
      <el-form :model="personInfoForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-input v-model="personInfoForm.groupName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属岗位">
              <el-select v-model="personInfoForm.quartersCode" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="人员编码">
              <el-input v-model="personInfoForm.personCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="personInfoForm.fullName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密级">
              <el-select v-model="personInfoForm.securityLevel" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="personInfoForm.personGender" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="出生日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="personInfoForm.personBirthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码">
              <el-input v-model="personInfoForm.postCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="通讯地址">
          <el-input type="textarea" v-model="personInfoForm.postalAddress"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="办公电话">
              <el-input v-model="personInfoForm.officePhone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人电话">
              <el-input v-model="personInfoForm.personPhone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电子邮件">
              <el-input v-model="personInfoForm.personEmail" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="IP地址">
              <el-input v-model="personInfoForm.allowedHosts" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="personInfoDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="personInfoDialog.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import contextMenu from 'vue-context-menu';

  export default {
    name: 'TreeGrid',
    data() {
      return {
        data: [
          {
            "id": "userGroup_001",
            "parent": "#",
            "text": "测试",
            "state": { "opened": false },
            "children": true,
            "type": "userGroup",
            "data": {
              "groupName": "测试",
              "parentGroupCode": "",
              "groupCode": "001",
              "groupType": "ceshi",
              "indexNumber": "0"
            },
            children: [
              {
                "id": "userGroup_22",
                "parent": "userGroup_001",
                "text": "222",
                "state": { "opened": false },
                "children": true,
                "type": "userGroup",
                "data": {
                  "groupName": "222",
                  "parentGroupCode": "001",
                  "groupCode": "22",
                  "groupType": "",
                  "indexNumber": "1"
                },
                children: [
                  {
                    "id": "quarters_333",
                    "parent": "userGroup_22",
                    "text": "333",
                    "state": { "opened": true },
                    "children": false,
                    "type": "quarters",
                    "data": {
                      "groupCode": "22",
                      "groupName": "222",
                      "quartersCode": "333",
                      "levelCode": "",
                      "quartersName": "333",
                      "indexNumber": "1",
                      "quartersDuty": "333"
                    }
                  }
                ]
              }
            ]
          }, {
            "id": "userGroup_123",
            "parent": "#",
            "text": "123",
            "state": { "opened": false },
            "children": true,
            "type": "userGroup",
            "data": {
              "groupName": "123",
              "parentGroupCode": "",
              "groupCode": "123",
              "groupType": "123",
              "indexNumber": "1"
            }
          }
        ]
        ,
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        tableData: {
          "draw": 3,
          "recordsTotal": 1,
          "recordsFiltered": 1,
          "rows": [{
            "fullName": "123",
            "hasUser": false,
            "userName": "",
            "userPwd": "",
            "personGender": "male",
            "securityLevel": "none",
            "personBirthday": "",
            "personCode": "123",
            "postalAddress": "123",
            "postCode": "",
            "officePhone": "",
            "personPhone": "",
            "personEmail": "",
            "groupCode": "1111",
            "groupName": "11",
            "quartersCode": "11",
            "quartersName": "111",
            "allowedHosts": ""
          }]
        },
        contextMenuList: [
          {
            icon: 'fa-plus',
            text: '新建部门',
            disable: false
          },
          {
            icon: 'fa-edit',
            text: '修改部门',
            disable: false
          },
          {
            icon: 'fa-minus',
            text: '删除部门',
            disable: false
          },
          {
            icon: 'fa-plus-square',
            text: '新建岗位',
            disable: false
          },
          {
            icon: 'fa-pencil-square',
            text: '修改岗位',
            disable: false
          },
          {
            icon: 'fa-minus-circle',
            text: '删除岗位',
            disable: false
          }
        ],
        contextMenuListDisableArr: [],
        personInfoDialog: {
          visible: false,
          action: ''
        },
        selectedRow: {},
        personInfoForm: {},
      };
    },
    components: {
      contextMenu
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      showContextMenu(e, data, node, _this) {
        // 重置右键菜单的所有按钮状态
        this.changeContextMenuBtnDisable(this.contextMenuListDisableArr, false);
        // 根据节点类型禁用按钮状态
        if (data.type === 'userGroup') {
          this.contextMenuListDisableArr = [4, 5];
          this.changeContextMenuBtnDisable(this.contextMenuListDisableArr, true)
        } else if (data.type === 'quarters') {
          this.contextMenuListDisableArr = [0, 1, 2, 3];
          this.changeContextMenuBtnDisable(this.contextMenuListDisableArr, true);
        }
        this.$refs.ctxMenu.open();
      },
      handleContextMenuClick() {
        console.log('hi')
      },
      handleCreate() {
        this.personInfoDialog = {
          visible: true,
          action: 'create'
        };
      },
      handleEdit(rowIndex, row) {
        this.selectedRow = row;
        this.personInfoDialog = {
          visible: true,
          action: 'edit'
        };
      },
      handleDelete(rowIndex, row) {
      },
      handleQuatersManage(rowIndex, row) {
      },
      handleAccount(rowIndex, row) {
      },
      beforePersonInfoDialogOpen() {
        if(this.personInfoDialog.action === 'edit') {

        }
      },
      changeContextMenuBtnDisable(nthList, value) {
        nthList.forEach((item) => {
          this.$set(this.contextMenuList[item], 'disable', value);
        });
      }
    },
  };
</script>

<style scoped lang="scss">
  #context-menu {
    .split-line {
      margin: 3px 0;
      height: 1px;
      background: rgba(0, 0, 0, .15);
    }
    .el-button {
      border: none;
      width: 100%;
    }
  }

  .action {
    text-align: right;
  }

  .caption {
    height: 48px;
    i {
      margin-right: 5px;
    }
  }

  .el-button--mini {
    padding: 3px 5px;
  }
  .el-select {
    width: 100%
  }
</style>
