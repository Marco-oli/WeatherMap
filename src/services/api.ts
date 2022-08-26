import axios from 'axios';

export const api_key = '34b26edaf69450106350d8803df9eb14';

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
});
