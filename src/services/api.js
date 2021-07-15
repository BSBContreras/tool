import axios from 'axios';

const api = axios.create({ baseURL: 'http://joinsoft.com.br/coinspect/api/'});

export default api;