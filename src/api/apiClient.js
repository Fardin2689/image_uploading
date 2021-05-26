import { create } from 'apisauce';

const instance = create({
  baseURL: `http://localhost:4000`,
});

export default instance;
