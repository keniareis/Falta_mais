import express from 'express';
import { config } from 'dotenv';
import connectDb from './database/db.js'
import routes from './routes/disciplineRoutes.js'

config();
connectDb();
const app = express();
const port = process.env.PORT || 3000

app.use(routes);
app.use(express.json());

app.listen(port, () => console.log(`listening on port ${port}!`));

app.get('/', (req, res) => {
    res.send("Hello world!");
});

export default app;