
import express from 'express';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()
const port = 3001;

app.use(cors())

app.use(express.json())

dotenv.config({
  path: './config.env'
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})