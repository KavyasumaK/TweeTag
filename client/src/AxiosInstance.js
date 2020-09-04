import Axios from 'axios';

export const AxiosInstance =Axios.create({
  baseURL:'http://localhost:1337/api/v1/'
});


export default AxiosInstance;