import axios from 'axios';

const axiosDaoInstance = axios.create({
    //baseURL:'https://reactburger-54381.firebaseio.com/',
    //baseURL:'https://bbrest.herokuapp.com/',
    //baseURL:'http://localhost:4343/',
    baseURL:'https://bbrest.herokuapp.com/',
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
});

export default axiosDaoInstance;