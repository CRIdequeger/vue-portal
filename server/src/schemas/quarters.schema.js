/* Created by cridequegerWorkBase at 2018/12/14 */
import Mongoose from 'mongoose';

const QuartersSchema = new Mongoose.Schema({
  groupCode: String,
  groupName: String,
  quartersCode: String,
  levelCode:  String,
  quartersName: String,
  quartersType: String,
  indexNumber: String
});

export default QuartersSchema;
