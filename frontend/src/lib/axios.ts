import axios from 'axios';

const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

const libAxios = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    },
});

export default libAxios;
