/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose'
import UserSchema from '../schemas/users.schema' //拿到导出的数据集模块

const User = mongoose.model('User', UserSchema) // 编译生成Movie 模型

export default User