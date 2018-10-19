/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose'
import TaskSchema from '../schemas/task.schema' //拿到导出的数据集模块

const Task = mongoose.model('Task', TaskSchema) // 编译生成Movie 模型

export default Task