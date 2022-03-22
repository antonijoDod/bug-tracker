import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_ENV_VARIABLE + "/api",
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3NzA1NjcwLCJleHAiOjE2NTAyOTc2NzB9.Qa46-56sWniUfODSXuzgoxucH0yV2ojTr5NtEHKcdQc`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  };
  return client(options).then(onSuccess).catch(onError);
};
