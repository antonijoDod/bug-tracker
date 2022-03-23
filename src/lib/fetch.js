import axios from "axios";
import { storage } from "utils/token";

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API + "/api",
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = "Bearer " + storage.getToken();
  const onSuccess = (response) => response;
  const onError = (error) => {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  };
  return client(options).then(onSuccess).catch(onError);
};
