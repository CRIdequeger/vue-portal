/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose';
import User from "../modules/user";

//声明一个mongoonse对象
var CurrencyDateSchema = new mongoose.Schema({
	date: String,
	timestamp: Number,
	source: String
})

//查询的静态方法
CurrencyDateSchema.statics = {
};

//暴露出去的方法
export default CurrencyDateSchema;