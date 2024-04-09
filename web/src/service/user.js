import APIClient from './api'


const LoginUser = (values) => {
    let url = `/api/v1/users/login`;
    return APIClient.post(url, values);
}

const SignUpUser = (values) => {
    let url = `/api/v1/users/signup`;
    return APIClient.post(url, values);
}


export { LoginUser,SignUpUser}