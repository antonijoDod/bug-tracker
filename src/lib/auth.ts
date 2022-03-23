import axios from "axios";
import { initReactQueryAuth } from "react-query-auth";
import { storage } from 'utils/token'

interface User {
  id: number;
  username: string;
  email: string;
}

export type LoginCredentials = {
  identifier: string;
  password: string;
};

interface Error {
  message: string;
}

async function handleUserResponse(data) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

const loadUser = async () => {
  let user = null;

  if (storage.getToken()) {
    const response = await axios(process.env.REACT_APP_SERVER_API + "/api/users/me", {
      headers: {
        Authorization: "Bearer " + storage.getToken()
      }
    })
    const data = await response.data
    user = data;
  }
  return user;
}
const logoutFn = async () => {
  await storage.clearToken()
}

const loginFn = async ({ identifier, password }) => {
  const response = await axios.post(process.env.REACT_APP_SERVER_API + "/api/auth/local", { identifier, password })
  const responseData = await response.data
  const user = await handleUserResponse(responseData)
  return user;

}
const registerFn = async ({ identifier, password }) => {
  const response = await axios.post(process.env.REACT_APP_SERVER_API + "/api/auth/local", { identifier, password })
  const responseData = await response.data
  const user = await handleUserResponse(responseData)
  return user;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth<
  User,
  any,
  LoginCredentials
>(authConfig);

export { AuthProvider, AuthConsumer, useAuth };
