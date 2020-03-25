import axios from 'axios';

const api = axios.create({ baseURL: 'http://www.each.usp.br/cond_met_pand/tool/api'});

export default api;