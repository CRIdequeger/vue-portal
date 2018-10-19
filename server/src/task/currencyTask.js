/* Created by cridequegerWorkBase at 2018/10/11 */


import superagent from "superagent";
import CurrencyDate from "../modules/currencyDate.model";
import Currency from "../modules/currency.model";
import uuid from 'node-uuid';
import Task from "../modules/task.model";

const currencyHandle = async () => {
	/* 取得上次获取货币任务执行到的日期 */
	let currencyTask = await Task.findOne();
	let date = '';
	/* 判断任务是否执行完毕 */
	if(currencyTask !== null && currencyTask.timestamp <= Date.UTC(...'1999-00-01'.split('-'))) {
		return {
			success: false,
			message: '任务已经执行到1999年01月01日, 自动停止执行'
		}
	}
	/* 如果是第一次执行任务, 查询结果将不存在, 将初始化执行任务的开始日期 */
	if (currencyTask === null) {
		currencyTask = await Task.create({
			date: '2018-07-12',
			timestamp: Date.UTC(...'2018-06-12'.split('-')), // 取得毫秒数 one day = 1000 * 60 * 60 * 24
		});
	}
	/* 取得需要执行任务的日期 */
	date = currencyTask.date;
	const currency = await getCurrency(date);
	const cuuid = uuid.v1();
	const currencyDate_saveResult = await saveCurrencyDate(currency, cuuid);
	const currency_saveResult = await saveCurrency(currency, cuuid);
	if(currencyDate_saveResult && currency_saveResult) {
		const taskSaveResult = await Task.findOneAndUpdate(currencyTask._id, {
			date: new Date(parseInt(currencyTask.timestamp) - 86400000).toISOString().substring(0, 10),
			timestamp: currencyTask.timestamp - 86400000
		});
		console.log(taskSaveResult);
		if (taskSaveResult) {
			currencyHandle()
		} else {
			console.log(`发生意外,当前执行至${date}`)
		}
	}
};


/* 第一次获取数据后发现uuid并未存储上, 该方法用来修复 */
const fixCurrency = async () => {
	const currencyDate = await CurrencyDate.find();
	let i = 0;
	while(i < currencyDate.length) {
		const cid = uuid.v1();
		const updatedCurrencyDate = await currencyDate[i].updateOne(currencyDate, {
			cid
		});
		const updatedCurrency = await Currency.updateMany({
			date: currencyDate[i].date
		}, {
			cid
		});
		console.log(updatedCurrencyDate, updatedCurrency, i);
		i++;
	}
};

/* 在做筛选(按条件搜索)时,
 * 发现当前schema无法支持币值的过滤.
 * 写此方法修改数据结构,
 * 重新存储,
 * 并废弃无用的currencyDate schema
*/

const refactCurrencySchema = async () => {

};

const getCurrency = (date) => {
	return new Promise((resolve, reject) => {
		try {
			superagent
				.get(
					`http://apilayer.net/api/historical`
				)
				.query({
					access_key: '1e6e640caf23c9210511262cb7dd88a5',
					currencies: 'USD,GBP,EUR,CNY,JPY',
					date
				})
				.end((req, res) => {
					if (res.body.success) {
						resolve(res.body)
					} else {
						reject(res.body)
					}
				})
		} catch (e) {
			reject(e)
		}
	});
};

const saveCurrency = (data, cuuid) => {
	return new Promise((resolve, reject) => {
		try {
			const documents_arr = [];
			Object.keys(data.quotes).forEach(key => {
				documents_arr.push({
					name: key,
					value: data.quotes[key],
					timestamp: data.timestamp,
					date: data.date,
					cid: cuuid
				});
			});
			Currency.insertMany(documents_arr, (err) => {
				if (err) {
					reject(err)
				}
				resolve({
					success: true,
					message: '[货币]存储成功!'
				})
			})
		} catch (e) {
			reject(e)
		}
	});

};

const saveCurrencyDate = (data, cuuid) => {
	return new Promise((resolve, reject) => {
		CurrencyDate.create({
			date: data.date,
			timestamp: data.timestamp,
			source: data.source,
			cid: cuuid
		},
		err => {
			if(err) {
				reject(err)
			}
			resolve({
				success: true,
				message: '[货币任务]存储成功!'
			})
		});
	});
};

export default currencyHandle;