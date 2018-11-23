/* Created by cridequegerWorkBase at 2018/10/11 */

import express from 'express'

const router = express.Router();
import Currency from '../modules/currency.model'

const getCurrency = async (req, res) => {
	/* 拼装数据成各币种的币值 */
  const params = req.query;
	params.price_start *= 1;
	params.price_end *= 1;
  let query = getQuery(params);

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

const getQuery = (params) => {
  let query = {};
  /* 币值范围过滤条件 */
  if (params.price_start !== 0 || params.price_end !== 0) {
    query.value = {};
    if (params.price_start !== 0) query.value.$gte = params.price_start;
    if (params.price_end !== 0) query.value.$lte = params.price_end;
  }
  /* 按日期过滤 */
  if (params.date_start !== '' || params.date_end !== '') {
    query.timestamp = {};
    if (params.date_start !== '') {
      let start_date = new Date(params.date_start);
      query.timestamp.$gte = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
    }
    if (params.date_end !== '') {
      let end_date = new Date(params.date_end);
      query.timestamp.$lte = Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate()) * 1 + 86400000 + '';
    }
  };
  return query;
};

router.get('/', getCurrency);

export default router;
