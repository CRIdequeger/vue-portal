/* Created by cridequegerWorkBase at 2018/9/18 */

import axios from '../extensions/axios';

const base = 'http://localhost:3000';

export const get = data => axios.get(`${base}/group`, { params: data });
export const create = data => axios.post(`${base}/group`, data);
export const update = data => axios.put(`${base}/group`, data);
export const checkDuplicate = data => axios.post(`${base}/group/checkDuplicate`, data);

