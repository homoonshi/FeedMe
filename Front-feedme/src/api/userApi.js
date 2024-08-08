import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',  // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 설정 : 요청 전 실행
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

export default apiClient;