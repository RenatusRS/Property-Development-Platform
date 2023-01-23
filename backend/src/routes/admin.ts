import express from 'express'
import { AdminController } from '../controllers/admin';

const adminRouter = express.Router();


adminRouter.route('/workshopRequest').post(
	(req, res) => new AdminController().workshopRequest(req, res)
)

export default adminRouter;