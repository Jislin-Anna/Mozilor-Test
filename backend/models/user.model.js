
import {db} from "./index.js";


const getUser = async (email, password) => {
    let user = [];
    try {
        user = await db.any('SELECT * FROM public.users WHERE email = $1 and password = $2 ', [email, password])
    }
    catch (error) {
        console.error(error)
    }
    return user;
}

const createUser = async (user) => {
    let result = [];
    try {
        result = await db.any('INSERT INTO public.users (email,password,username) values($1,$2,$3)', [user?.email, user?.password, user?.username])
    } catch (error) {
        console.error(error)
        result.push({
            "error": error
        })
    }
    return result;
}

export { getUser, createUser }