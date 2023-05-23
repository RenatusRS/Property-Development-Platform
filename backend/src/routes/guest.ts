import express from 'express'
import { GuestController } from '../controllers/guest';

const guestRouter = express.Router();

guestRouter.route('/login').post(
	(req, res) => new GuestController().login(req, res)
)

guestRouter.route('/register').post(
	(req, res) => new GuestController().register(req, res)
)

export default guestRouter;