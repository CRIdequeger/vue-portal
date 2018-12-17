/**
 * Created by cridequegerWorkBase on 2018/1/26.
 */

'use strict';

import express from 'express'
import bodyParser from 'body-parser'
import register from './routes/register'
import login from './routes/login'
import test from './routes/test'
import getUserList from './routes/userList'
import group from './routes/group'
import user from './routes/user'
import currencyReptile from './task/currencyTask'
import currency from './routes/currency'
import connectDb from "./utils/connectDb";
import jwtAuth from "./middleware/jwt";
const app = express();

connectDb();
// currencyReptile();

app.all('*', (req, res, next) => {
	//设置跨域访问
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers","content-type,Authorization");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
	/* 每次请求检查token是否过期 如果过期则响应过期 */
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 静态文件服务器
app.use(express.static('public'));

app.use(jwtAuth);


app.post('/register', register);
app.post('/login', login);
app.post('/getUserList', getUserList);
app.use('/user', user);
app.use('/currency', currency);
app.use('/test', test);
app.use('/group', group);


app.listen(3000, () => console.log('Example app listening on port 3000!'))
