import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'accept': 'application/vnd.contacts+json',
    'Content-type': 'application/json',
    'X-API-KEY': process.env.REACT_APP_API_KEY}
});
