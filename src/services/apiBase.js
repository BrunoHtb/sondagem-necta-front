import axios from 'axios';

const apiBase = axios.create({
    baseURL : 'https://localhost:7016/api/v1',
})

export default apiBase;