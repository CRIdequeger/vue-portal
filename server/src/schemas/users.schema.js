/**
 * Created by cridequegerWorkBase on 2016/10/27.
 */

import mongoose from 'mongoose';
import User from "../modules/user";

//声明一个mongoonse对象
let UsersSchema = new mongoose.Schema({
	name: String,
	fullname: String,
	password: String,
	email: String,
	create: Date,
	update: Date
})

//查询的静态方法
UsersSchema.statics = {
	findByName(name, cb) {
		return this.find({name: name})
			.exec(cb)
	}
}

//暴露出去的方法
export default UsersSchema;