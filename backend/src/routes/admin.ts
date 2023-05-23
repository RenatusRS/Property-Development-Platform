import express from 'express'
import { AdminController } from '../controllers/admin';

const adminRouter = express.Router();

adminRouter.route('/registration-response').post(
	(req, res) => new AdminController().registrationResponse(req, res)
)

adminRouter.route('/get-worker-requests').get(
	(req, res) => new AdminController().getWorkerRequests(req, res)
)

adminRouter.route('/worker-request-response').post(
	(req, res) => new AdminController().workerRequestResponse(req, res)
)

export default adminRouter;