import Cookies from 'js-cookie'

export const storage = {
    getToken: () => Cookies.get('token'),
    setToken: token =>
        Cookies.set('token', token),
    clearToken: () => Cookies.remove('token', { path: '/' }),
};