/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose'
import CurrencyDateSchema from '../schemas/currencyDate.schema' //拿到导出的数据集模块

const CurrencyDate = mongoose.model('CurrencyDate', CurrencyDateSchema) // 编译生成Movie 模型

export default CurrencyDate