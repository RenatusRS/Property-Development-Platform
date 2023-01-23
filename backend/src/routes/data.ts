import express from 'express'
import { DataController } from '../controllers/data';

const dataRouter = express.Router();

dataRouter.route('/remove').post(
	(req, res) => new DataController().remove(req, res)
)

dataRouter.route('/update').post(
	(req, res) => new DataController().update(req, res)
)

dataRouter.route('/find').post(
	(req, res) => new DataController().find(req, res)
)

export default dataRouter;