import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:3000`,
  headers: {'accept': 'application/vnd.contacts+json', 'X-API-KEY': 'any-api-key'}
});
