/* Created by cridequegerWorkBase at 2018/9/18 */

import User from '../modules/user'
import jwt from "jsonwebtoken";

export default async(req, res) => {
	let user = req.body;
	const duplicate_result = await User.findByName(user.name);
	console.log(duplicate_result.length)
	if(duplicate_result.length !== 0) {
		res.status(200).send({
			success: false,
			message: '注册失败, 用户名已存在'
		});
	} else {
		user = Object.assign({}, {
			create: new Date(),
			update: new Date()
		}, user);
		try {
			const create_result = await User.create(user);
			console.log(create_result);
			const token = jwt.sign({_id: user._id}, 'secret', {
				expiresIn : 60 * 60 * 24 // 授权时效24小时
			});
			console.log(token);
			res.status(200).send({
				success: true,
				message: '注册成功',
				token,
				data: {
					user: {
						fullname: user.fullname,
						name: user.name,
						age: user.age,
						email: user.email
					}
				}
			})
		} catch (err) {
			console.log(err);
			res.status(500).send({
				success: false,
				message: '服务器端发生错误!',
				err
			})
		}
	}
}