import express from 'express';
import { config } from 'dotenv';
import connectDb from './database/db.js'
import router from './routes/disciplineRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import swaggerRouter from './routes/sweggerRoutes.js';


config();
connectDb();
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());    
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(router);
app.use(userRouter); 
app.use("/auth", authRouter); 
app.use("/doc", swaggerRouter); 
app.listen(port, () => console.log(`listening on port ${port}!`));

app.get('/', (req, res) => {
    res.send("Falta+");
});

export default app;