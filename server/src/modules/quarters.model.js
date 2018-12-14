/* Created by cridequegerWorkBase at 2018/12/14 */
import mongoose from 'mongoose'
import QuartersSchema from '../schemas/quarters.schema' //拿到导出的数据集模块

const Quarters = mongoose.model('Quarters', QuartersSchema); // 编译生成Movie 模型

export default Quarters
