/**
 * Created by cridequegerWorkBase on 2018/1/26.
 */
'use strict';

const express = require('express');
const app = express();
const routerArticleList = require('./article-list/router')



//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.get('/', (req, res) => {
	res.send('welcome');
});

app.use('/article-list', routerArticleList);

app.listen(3000, () => console.log('Example app listening on port 3000!'));