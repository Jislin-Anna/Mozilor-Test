
import jwt from "jsonwebtoken";
import { getAllProducts, addAllProducts } from '../models/product.model.js';

const parseToken = token => {
    let decodedtoken = ""
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Failed to verify token:', err);
        } else {
            decodedtoken = decoded
        }
    });
    return decodedtoken;
};



const getProducts = async (req, res, next) => {
    try {

        const { pageNumber = 0, pageSize = 0 } = req.query;
        const token = req.headers.authorization?.split(" ")[1]


        let decodedToken = parseToken(token)
        // 1. check if pagination is provided
        if (!pageNumber || !pageSize) {
            return res.status(404).json({
                "message": "Please provide pagination details"
            })
        }

        const data = await getAllProducts(decodedToken?.email, pageNumber, pageSize)

        res.status(200).json({
            status: "success",
            data: data.data,
            total: data?.total
        });
    } catch (err) {
        next(err);
    }
};

const addProducts = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).send({
                "message": 'No files were uploaded.'
            });
        }
        if (req.file.mimetype !== 'text/csv') {
            // If the file is not a CSV, reject it
            return res.status(400).send({
                "message": 'Only CSV files are allowed'
            });
        }
        const token = req.headers.authorization?.split(" ")[1]

        let decodedToken = parseToken(token)
        let result = await addAllProducts(req, decodedToken?.email)

        if (!result) {
            res.json({
                success: true,
                totalBatches: result?.total,
                duration: result?.duration
            })
        } else {
            res.status(500).json({
                "message": "failed"
            })
        }
    } catch (err) {
        next(err);
    }
};

export { getProducts, addProducts }