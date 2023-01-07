import express from 'express'
import { OrganizatorController } from '../controllers/organizator.controller';

const organizatorRouter = express.Router();

organizatorRouter.route('/attendanceRequest').post(
    (req, res) => new OrganizatorController().attendanceRequest(req, res)
)

organizatorRouter.route('/getAttendanceRequests').get(
    (req, res) => new OrganizatorController().getAttendanceRequests(req, res)
)

organizatorRouter.route('/createWorkshop').post(
    (req, res) => new OrganizatorController().createWorkshop(req, res)
)

organizatorRouter.route('/updateWorkshop').post(
    (req, res) => new OrganizatorController().updateWorkshop(req, res)
)

organizatorRouter.route('/deleteWorkshop').post(
    (req, res) => new OrganizatorController().deleteWorkshop(req, res)
)



export default organizatorRouter;