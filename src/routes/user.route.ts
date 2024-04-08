import { Router } from 'express';
import { UserController } from './../controllers/user.controller';

export class UserRoute {
    public router: Router = Router();
    private userController: UserController = new UserController();

    constructor(){
        this.router.post("/", this.userController.signUp);
    }
}