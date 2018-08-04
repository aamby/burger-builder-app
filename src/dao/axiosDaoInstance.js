import axios from 'axios';

const axiosDaoInstance = axios.create({
    //baseURL:'https://reactburger-54381.firebaseio.com/'
    baseURL:'http://localhost:4343/'
});

export default axiosDaoInstance;