/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose'
import CurrencySchema from '../schemas/currency.schema.js' //拿到导出的数据集模块

const Currency = mongoose.model('Currency', CurrencySchema) // 编译生成Movie 模型

export default Currency