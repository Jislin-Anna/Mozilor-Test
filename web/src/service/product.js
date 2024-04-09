import APIClient from './api'


const getAllProducts = (page,size) => {
    let url = `/api/v1/products?pageNumber=${page}&pageSize=${size}`;
    return APIClient.get(url);
}

const addAllProducts = (values) => {
    let url = `/api/v1/products`;
    return APIClient.post(url, values);
}


export { getAllProducts,addAllProducts}