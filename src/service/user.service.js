/* Created by cridequegerWorkBase at 2018/9/18 */

import axios from '../extensions/axios';

const base = 'http://localhost:3000';

export const register = data => axios.post(`${base}/register`, data);
export const login = data => axios.post(`${base}/login`, data);
export const getUserList = data => axios.post(`${base}/getUserList`, data);
export const getUser = id => axios.get(`${base}/user?id=${id}`);
export const deleteUser = data => axios.delete(`${base}/user`, { data });
export const updateUser = data => axios.put(`${base}/user`, data);

export const test = data => axios.post(`${base}/test`, data);

