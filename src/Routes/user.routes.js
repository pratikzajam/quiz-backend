import expess from 'express';

import { auth } from '../Middleware/auth.middleware.js'
import { rbac } from '../Middleware/rbac.middleware.js'
import { signup, login, addQuiz, getQuiz, submitQuiz } from '../Controller/user.controller.js'

let Router = expess.Router();


Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/addquiz", addQuiz);
Router.get("/getquiz", getQuiz);
Router.post("/submitquiz", auth, rbac(["user"]), submitQuiz);



export default Router