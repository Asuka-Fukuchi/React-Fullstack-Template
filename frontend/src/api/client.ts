// アプリ全体で使うHTTP通信の共通窓口
import axios from 'axios';          // HTTP通信パッケージ

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// axiosにはHttpClientのように決まった型がないので自分で定義
// レスポンスの型とデータタイプは最低限含めておくと良い
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});


// リクエスト時にtokenを自動付与する
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // for debug
    console.log("API Request:", {
        url: `${config.baseURL}${config.url}`,
        method: config.method,
        hasToken: !!token,
    });

    return config;
},
    (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
);

// error handling
apiClient.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("Unauthorized - token expired or invalid");
        }

        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
)

export default apiClient;