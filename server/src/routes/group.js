/* Created by cridequegerWorkBase at 2018/12/14 */
import express from 'express';
import Group from '../modules/group.model';

const router = express.Router();

/* 获取list */
const getList = (req, res) => {
  const groupList = Group.find();
  res.status(200).send(groupList)
};

/* 根据id返回 */
const getOneById = (req, res) => {
};

/* 新增 */
const create = async (req, res) => {
  const createGroup = req.body;
  let createResult;
  console.log(createGroup);
  try {
    createResult = await Group.create(createGroup);
    res.status(200).send({
      success: true,
      group: createResult
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      message: '服务器端发生错误!',
      err
    })
  }
};

/* 修改 */
const update = async (req, res) => {
  const updateGroup = req.body;
  console.log(req.params);
  const updateResult = await Group.findByIdAndUpdate(updateGroup._id, updateGroup);
  res.status(200).send(updateResult);
}


/* 删除 */
const deleteGroup = (req, res) => {

};

router.get('/', getList);
router.get('/:id', getOneById);
router.post('/', create);
router.put('/', update);
router.delete('/', deleteGroup);

