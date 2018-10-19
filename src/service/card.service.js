/* Created by cridequegerWorkBase at 2018/7/23 */
import axios from 'axios';

const base = 'http://localhost:3000';

const getCards = () => axios.get(`${base}/getCards`);


export default { getCards };
