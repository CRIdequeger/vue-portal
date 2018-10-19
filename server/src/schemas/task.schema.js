/* Created by cridequegerWorkBase at 2018/10/12 */

import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	date: String,
	timestamp: Number
});

export default TaskSchema