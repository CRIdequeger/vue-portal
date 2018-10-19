/* Created by cridequegerWorkBase at 2018/9/18 */

import axios from '../extensions/axios';

const base = 'http://localhost:3000';

export const getCurrency = data => axios.get(`${base}/currency`, { params: data });
