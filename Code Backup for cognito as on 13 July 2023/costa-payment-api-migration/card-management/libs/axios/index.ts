import axios from "axios";

const username = "oilx5tg05xe69d8h";
const password = "appjqbfn9ykz0yqz";
const credentials = btoa(username + ":" + password);

const wordPayClient = axios.create({
  baseURL: "https://try.access.worldpay.com",
  timeout: 1000 * 120,
  headers: {
    Authorization: `Basic ${credentials}`,
    authority: "try.access.worldpay.com",
    Connection: "keep-alive",
  },
});

export { wordPayClient };

