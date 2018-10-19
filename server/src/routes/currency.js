/* Created by cridequegerWorkBase at 2018/10/11 */

import express from 'express'

const router = express.Router();
import Currency from '../modules/currency.model'
import CurrencyDate from '../modules/currencyDate.model'

const getCurrency = async (req, res) => {
	/* 拼装数据成各币种的币值 */
  const params = req.query;
  let query = {};
	params.price_start *= 1;
	params.price_end *= 1;
	if (params.price_start !== 0 || params.price_end !== 0) {
		query.value = {};
		if (params.price_start !== 0) query.value.$gte = params.price_start;
		if (params.price_end !== 0) query.value.$lte = params.price_end;
	}
  if (params.date_start !== '' || params.date_end !== '') {
    query.timestamp = {};
    if (params.date_start !== '') query.timestamp.$gte = params.date_start;
    if (params.date_end !== '') query.timestamp.$lte = params.date_end;
  };
	console.log(query);
  const currencyType = [
    {
      en: 'USDGBP',
      zh: '英镑',
    },
    {
      en: 'USDEUR',
      zh: '欧元',
    },
    {
      en: 'USDCNY',
      zh: '人民币',
    },
    {
      en: 'USDJPY',
      zh: '日元',
    }
  ];
	let currency = [];
	for (let i = 0; i < currencyType.length; i++) {
		query.name = currencyType[i].en;
		console.log(query);
		let result = await Currency
			.find(
				query,
			)
			.sort('timestamp');
		currency.push({
			name: currencyType[i].zh,
      date: [],
			data: []
		});
		result.forEach(item => {
			currency[i].data.push(item.value);
      currency[i].date.push(item.date);
		})

	}
	res.status(200).send({
		currency
	})
};

router.get('/', getCurrency);

export default router;
