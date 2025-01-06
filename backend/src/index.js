import express from 'express';
import { config } from 'dotenv';
import connectDb from './database/db.js'
import router from './routes/disciplineRoutes.js'
import bodyParser from 'body-parser';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';


config();
connectDb();
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());    
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(userRouter); 
app.use("/auth", authRouter); 
app.listen(port, () => console.log(`listening on port ${port}!`));

app.get('/', (req, res) => {
    res.send("Falta+");
});

export default app;