import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/changeData').post(
    (req, res) => new UserController().changeData(req, res)
)

userRouter.route('/getMyWorkshops').get(
    (req, res) => new UserController().getMyWorkshops(req, res)
)

userRouter.route('/sendMessage').post(
    (req, res) => new UserController().sendMessage(req, res)
)

userRouter.route('/getMessages').get(
    (req, res) => new UserController().getMessages(req, res)
)

userRouter.route('/createWorkshop').post(
    (req, res) => new UserController().createWorkshop(req, res)
)

userRouter.route('/like').post(
    (req, res) => new UserController().like(req, res)
)

userRouter.route('/comment').post(
    (req, res) => new UserController().comment(req, res)
)

userRouter.route('/deleteComment').post(
    (req, res) => new UserController().deleteComment(req, res)
)

userRouter.route('/signUpWorkshop').post(
    (req, res) => new UserController().signUpWorkshop(req, res)
)

userRouter.route('/signOffWorkshop').post(
    (req, res) => new UserController().signOffWorkshop(req, res)
)

userRouter.route('/getWorkshop').get(
    (req, res) => new UserController().getWorkshop(req, res)
)

export default userRouter;