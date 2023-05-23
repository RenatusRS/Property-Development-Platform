import express from 'express'
import { UserController } from '../controllers/user';

const userRouter = express.Router();

userRouter.route('/change-password').post(
	(req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/get-users').get(
	(req, res) => new UserController().getUsers(req, res)
)

userRouter.route('/update-user').post(
	(req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/get-objects').get(
	(req, res) => new UserController().getObjects(req, res)
)

userRouter.route('/upsert-object').post(
	(req, res) => new UserController().upsertObject(req, res)
)

userRouter.route('/delete-object').post(
	(req, res) => new UserController().deleteObject(req, res)
)

userRouter.route('/upsert-rating').post(
	(req, res) => new UserController().upsertRating(req, res)
)

userRouter.route('/delete-rating').post(
	(req, res) => new UserController().deleteRating(req, res)
)

userRouter.route('/request-agency').post(
	(req, res) => new UserController().requestAgency(req, res)
)

userRouter.route('/offer-response').post(
	(req, res) => new UserController().offerResponse(req, res)
)

userRouter.route('/get-workers').get(
	(req, res) => new UserController().getWorkers(req, res)
)

userRouter.route('/update-workers').post(
	(req, res) => new UserController().updateWorkers(req, res)
)

userRouter.route('/request-more-workers').post(
	(req, res) => new UserController().requestMoreWorkers(req, res)
)

userRouter.route('/job-response').post(
	(req, res) => new UserController().jobResponse(req, res)
)

export default userRouter;