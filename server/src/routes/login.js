/* Created by cridequegerWorkBase at 2018/9/18 */

import jwt from 'jsonwebtoken'
import User from '../modules/user'

export default async(req, res) => {
	const reqUser = req.body;
	const user = await User.findByName(reqUser.name)
	if( user.length > 0 && JSON.stringify(user[0].password) === JSON.stringify(reqUser.password)) {
	//	通过
		const token = jwt.sign({_id: user[0]._id}, 'secret', {
			//expiresIn : 60 * 60 * 24,  授权时效24小时
			expiresIn : 60 * 60 // 授权时效60分钟
		});
		res.status(200).send({
			success: true,
			message: '登录成功',
			token: token,
			data: {
				user: {
					fullname: user[0].fullname,
					name: user[0].name,
					age: user[0].age,
					email: user[0].email
				}
			}
		})
	} else {
		res.status(200).send({
			success: false,
			message: '登录失败,用户名或密码错误!',
		})
	}
}