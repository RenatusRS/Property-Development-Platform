import express from 'express'
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/registrationRequest').post(
    (req, res) => new AdminController().registrationRequest(req, res)
)

adminRouter.route('/getRegistrationRequests').get(
    (req, res) => new AdminController().getRegistrationRequests(req, res)
)

adminRouter.route('/getWorkshopRequests').get(
    (req, res) => new AdminController().getWorkshopRequests(req, res)
)

adminRouter.route('/workshopRequest').post(
    (req, res) => new AdminController().workshopRequest(req, res)
)

export default adminRouter;