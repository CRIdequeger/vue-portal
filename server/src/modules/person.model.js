/* Created by cridequegerWorkBase at 2018/12/14 */
import mongoose from 'mongoose'
import PersonSchema from '../schemas/person.schema' //拿到导出的数据集模块

const Person = mongoose.model('Person', PersonSchema); // 编译生成Movie 模型

export default Person
