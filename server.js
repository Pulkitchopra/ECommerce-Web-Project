import express from 'express';
import dotenv from 'dotenv'
import database from './config/db.js'

import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'

import productRoutes from './routes/productRoute.js'
import cors from 'cors'




import { fileURLToPath } from 'url';
import path from 'path';
const app = express();

dotenv.config();

database();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/build')))



app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/category', categoryRoutes);
app.use("/api/v1/product", productRoutes);


app.use('*', function(req,res){

    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.get('/', (req,res) => {
    res.send({
        message: 'ECommerce Project'
    })
})






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
})
