import express from 'express'
import { UserController } from '../controllers/user';

const userRouter = express.Router();

userRouter.route('/createWorkshop').post(
	(req, res) => new UserController().createWorkshop(req, res)
)

userRouter.route('/like').post(
	(req, res) => new UserController().like(req, res)
)

userRouter.route('/unlike').post(
	(req, res) => new UserController().unlike(req, res)
)

userRouter.route('/comment').post(
	(req, res) => new UserController().comment(req, res)
)

userRouter.route('/deleteComment').post(
	(req, res) => new UserController().deleteComment(req, res)
)

userRouter.route('/sendChatMessage').post(
	(req, res) => new UserController().sendChatMessage(req, res)
)

userRouter.route('/signUpWorkshop').post(
	(req, res) => new UserController().signUpWorkshop(req, res)
)

userRouter.route('/signOffWorkshop').post(
	(req, res) => new UserController().signOffWorkshop(req, res)
)

userRouter.route('/getUserComments').get(
	(req, res) => new UserController().getUserComments(req, res)
)

userRouter.route('/getUserLikes').get(
	(req, res) => new UserController().getUserLikes(req, res)
)

userRouter.route('/getUserAttendances').get(
	(req, res) => new UserController().getUserAttendances(req, res)
)

userRouter.route('/getUserChat').get(
	(req, res) => new UserController().getUserChat(req, res)
)

export default userRouter;