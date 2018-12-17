/* Created by cridequegerWorkBase at 2018/9/18 */

import axios from '../extensions/axios';

const base = 'http://localhost:3000';

export const create = data => axios.post(`${base}/group`, data);
