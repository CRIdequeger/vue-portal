/* Created by cridequegerWorkBase at 2018/12/14 */
import Mongoose from 'mongoose';

const GroupSchema = new Mongoose.Schema({
  groupAddress: String,
  groupCode: String,
  groupDes: String,
  groupName: String,
  groupType: String,
  parentGroupCode: String
});

export default GroupSchema;
