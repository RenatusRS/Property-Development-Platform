import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from './routes/guest';
import guestRouter from './routes/guest';
import organizatorRouter from './routes/organizator';
import adminRouter from './routes/admin';
import dataRouter from './routes/data';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/pia');
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('db connection ok')
})

const router = express.Router();

app.use('/guest', guestRouter);
app.use('/users', userRouter);
app.use('/organizator', organizatorRouter);
app.use('/admin', adminRouter);
app.use('/data', dataRouter);

app.listen(4000, () => console.log(`Express server running on port 4000`));