/* Created by cridequegerWorkBase at 2018/12/14 */
import Mongoose from 'mongoose';

const GroupSchema = new Mongoose.Schema({
  groupName: String,
  parentGroupCode: String,
  groupCode: String,
  groupType: String,
  indexNumber: String
});

export default GroupSchema;
