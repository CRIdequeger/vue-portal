/* Created by cridequegerWorkBase at 2018/12/14 */
import Mongoose from 'mongoose';

import mongoose from 'mongoose'
import GroupSchema from '../schemas/group.schema' //拿到导出的数据集模块

const Group = mongoose.model('Group', GroupSchema); // 编译生成Movie 模型

export default Group
