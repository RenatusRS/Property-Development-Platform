import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/pia');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));


app.get('/', (req, res) => res.send('Hello World!'));