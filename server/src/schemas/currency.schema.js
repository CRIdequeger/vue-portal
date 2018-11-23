/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose';

//声明一个mongoonse对象
var CurrencySchema = new mongoose.Schema({
	name: String,
	value: Number,
	timestamp: String,
	date: String,
	cid: String,
});

//查询的静态方法
CurrencySchema.statics = {
};

//暴露出去的方法
export default CurrencySchema;
