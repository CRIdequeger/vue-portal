/* Created by cridequegerWorkBase at 2018/12/14 */
import express from 'express';
import Group from '../modules/group.model';

const router = express.Router();

/* 获取list */
const getList = async (req, res) => {
  const { parentGroupCode } = req.body;
  console.log(req.params);
  console.log(req.body);
  let queryPromise;
  queryPromise = Group.find({ parentGroupCode});
  const resultList = {
    success: true,
    data: await queryPromise
  };

  res.status(200).send(resultList)
};

/* 根据groupCode返回 */
const getOneByGroupCode = (req, res) => {

};

const checkDuplicate = async (req, res) => {
  const { groupCode } = req.body;
  const queryResult = await Group.find({ groupCode });
  let result;
  if (queryResult.length !== 0) {
    result = {
      success: true,
      data: {
        isDuplicate: true
      }
    }
  } else {
    result = {
      success: true,
      data: {
        isDuplicate: false
      }
    }
  }
  res.status(200).send(result);
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
      data: {
        group: createResult
      }
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
router.get('/:id', getOneByGroupCode);
router.post('/', create);
router.post('/checkDuplicate', checkDuplicate);
router.put('/', update);
router.delete('/', deleteGroup);

export default router;
