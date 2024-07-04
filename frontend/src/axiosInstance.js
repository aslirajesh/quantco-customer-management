import axios from 'axios';

const axiosInstance = () => {
    return axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

axiosInstance().interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    //   do something
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
