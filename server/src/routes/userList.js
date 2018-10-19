/* Created by cridequegerWorkBase at 2018/9/29 */

import User from '../modules/user'

export default async(req, res) => {
	const user = req.body;
	const result = await User.find(
		{
			$or : [ //多条件，数组
				{name : {$regex : new RegExp(user.name)}},
				{email : {$regex : new RegExp(user.email)}}
			]
		},
		{
			password: 0
		}
	);
	res.status(200).send(result)
}