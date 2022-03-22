import axios from 'axios'

export const loginFn = async() => {
    const user = await axios("http://locahost:1337/api/auth/local")
    console.log(user)
}