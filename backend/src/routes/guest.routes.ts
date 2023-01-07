import express from 'express'
import { GuestController } from '../controllers/guest.controller';

const guestRouter = express.Router();

guestRouter.route('/login').post(
    (req, res) => new GuestController().login(req, res)
)

guestRouter.route('/register').post(
    (req, res) => new GuestController().register(req, res)
)

guestRouter.route('/getWorkshops').get(
    (req, res) => new GuestController().getWorkshops(req, res)
)

guestRouter.route('/getTop5Workshops').get(
    (req, res) => new GuestController().getTop5Workshops(req, res)
)

export default guestRouter;