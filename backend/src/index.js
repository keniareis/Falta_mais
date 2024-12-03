import express from 'express';
import { config } from 'dotenv';
import connectDb from './database/db.js'
import routes from './routes/disciplineRoutes.js'
import bodyParser from 'body-parser';

config();
connectDb();
const app = express();
const port = process.env.PORT || 3000

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => console.log(`listening on port ${port}!`));

app.get('/', (req, res) => {
    res.send("Falta+");
});

export default app;