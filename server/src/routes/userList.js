/* Created by cridequegerWorkBase at 2018/9/29 */

import User from '../modules/user'

export default async (req, res) => {
  const params = req.body;
  let queryPromise;
  queryPromise = User
    .find(
      {
        $or: [ //多条件，数组
          { name: { $regex: new RegExp(params.user.name) } },
          { email: { $regex: new RegExp(params.user.email) } }
        ]
      },
      {
        password: 0
      }
    )
    .skip((params.pageNumber - 1) * params.pageSize)
    .limit(params.pageSize)
    .sort({ _id: -1 });

  let totalPromise = User.find().count();
  let [queryResult, total] = await Promise.all([queryPromise, totalPromise]);
  /*let result = Object.assign(
    {},
    {
      total,
      pageSize: params.pageSize,
      pageNumber: params.pageNumber
    },
    queryResult
  );*/
  let result = {
    total,
    pageSize: params.pageSize,
    pageNumber: params.pageNumber,
    userList: queryResult,
  };
  console.log(result);
  res.status(200).send(result)
}
