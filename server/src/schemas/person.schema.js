/* Created by cridequegerWorkBase at 2018/12/14 */
import Mongoose from 'mongoose';

const PersonSchema = new Mongoose.Schema({
  fullName:String,
  hasUser:Boolean,
  userName: String,
  userPwd: String,
  personGender: String,
  securityLevel: String,
  personBirthday: String,
  personCode: String,
  postalAddress: String,
  postCode: String,
  officePhone: String,
  personPhone: String,
  personEmail: String,
  groupCode: String,
  groupName: String,
  quartersCode: String,
  quartersName: String,
  allowedHosts: String
});

export default PersonSchema;
