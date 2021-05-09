import axios from 'axios';
import md5 from 'md5';

const public_key = '8a686c2de8be76133d24fdeaaf676908';
const private_key = 'c6354c5fb3b084fd5a9b760d1c57525d4bb17862';

const ts = Number(new Date());
const hash = md5(ts + private_key + public_key)

export const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: public_key,
    hash,
  }
})