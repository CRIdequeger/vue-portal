/* Created by cridequegerWorkBase at 2018/9/18 */

import mongoose from 'mongoose'

const connectDb = () => {
	mongoose.connect('mongodb://localhost:27017/portal')
	const db = mongoose.connection
	db.on('error', console.error.bind(console, '连接错误:'))
	db.once('open', (callback) => {
		console.log('MongoDB连接成功！！')
	})
}

export default connectDb;
