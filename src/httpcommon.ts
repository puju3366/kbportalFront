import axios from "axios";

export const AUTH_API_URL = process.env.NODE_AUTH_API_URL;

export const PortThree =  axios.create({
    baseURL: 'https://adfsintegration.com/api/v1/',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ',
    }
  });

export default {PortThree}