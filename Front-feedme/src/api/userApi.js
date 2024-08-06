// // src/api/userApi.js

// import axios from 'axios';

// // Axios 인스턴스 생성
// const apiClient = axios.create({
//     baseURL: '/api',  // 기본 URL 설정
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // 요청 인터셉터 설정
// apiClient.interceptors.request.use(
//     config => {
//         const token = sessionStorage.getItem('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// export default apiClient;
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',  // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = token;  // Bearer 없이 토큰 설정
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log('Attempting to refresh token...');
                const accessToken = sessionStorage.getItem('accessToken');

                const refreshResponse = await axios.post('/api/token/refresh', {
                    accessToken: accessToken
                }, {
                    headers: { 'Authorization': accessToken }  // 만료된 토큰을 Authorization 헤더에 포함
                });

                const newAccessToken = refreshResponse.data.accessToken;
                sessionStorage.setItem('accessToken', newAccessToken);
                console.log('New access token received:', newAccessToken);

                originalRequest.headers['Authorization'] = newAccessToken;

                return apiClient(originalRequest);
            } catch (err) {
                console.error('Token refresh failed:', err);
                sessionStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
