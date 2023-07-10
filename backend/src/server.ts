import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from './routes/user';
import guestRouter from './routes/guest';
import dataRouter from './routes/data';

const app = express();

const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads', express.static(path.join(__dirname, 'uploads'))));

mongoose.connect('mongodb://127.0.0.1:27017/pia');
mongoose.connection.once('open', () => {
	console.log('db connection ok')
});


app.use('/guest', guestRouter);
app.use('/data', dataRouter);
app.use('/user', userRouter);

app.listen(4000, () => console.log(`Express server running on port 4000`));
