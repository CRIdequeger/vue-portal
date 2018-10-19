/* Created by cridequegerWorkBase at 2018/9/29 */

import express from 'express'
import User from '../modules/user'
const router = express.Router();



const deleteUser = async(req, res) => {
	const userList = req.body;
	try {
		for(let i = 0; i < userList.length; i++) {
			await User.findByIdAndDelete(userList[i]._id);
		}
		res.status(200).send({
			success: true,
			message: '删除成功'
		})
	} catch (e) {
		console.log(e);
		res.status(500).send({
			success: false,
			message: '服务器端发生错误!'
		})
	}
};

const updateUser = async(req, res) => {
	const user = req.body;
	try {
		await User.findByIdAndUpdate(user._id, user);
		res.status(200).send({
			success: true,
			message: '修改成功'
		})
	} catch (e) {
		console.log(e);
		res.status(500).send({
			success: false,
			message: '服务器端发生错误!'
		})
	}
};

const getUser = async(req, res) => {
	const _id = req.query.id;
	try {
		const result = await User.findById(
			{
				_id
			},
			{
				password: 0
			},
			);
		if(result == null) {
			res.status(200).send({
				success: false,
				message: '查无此人'
			})
		} else {
			res.status(200).send({
				success: true,
				message: '查询成功',
				data: result
			})
		}
	} catch (e) {
		console.log(e);
		res.status(500).send({
			success: false,
			message: '服务器端发生错误!'
		})
	}
};

router.delete('/', deleteUser);
router.put('/', updateUser);
router.get('/', getUser);

export default router;