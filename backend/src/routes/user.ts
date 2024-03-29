import express from 'express'
import { UserController } from '../controllers/user';

const userRouter = express.Router();

userRouter.route('/get-users').post(
	(req, res) => new UserController().getUsers(req, res)
)

userRouter.route('/get-objects').post(
	(req, res) => new UserController().getObjects(req, res)
)

userRouter.route('/upsert-object').post(
	(req, res) => new UserController().upsertObject(req, res)
)

userRouter.route('/delete-object').post(
	(req, res) => new UserController().deleteObject(req, res)
)

userRouter.route('/request-agency').post(
	(req, res) => new UserController().requestAgency(req, res)
)

userRouter.route('/get-workers').post(
	(req, res) => new UserController().getWorkers(req, res)
)

userRouter.route('/update-workers').post(
	(req, res) => new UserController().updateWorkers(req, res)
)

userRouter.route('/request-more-workers').post(
	(req, res) => new UserController().requestMoreWorkers(req, res)
)

userRouter.route('/update-image').post(
	(req, res) => new UserController().updateImage(req, res)
)

export default userRouter;