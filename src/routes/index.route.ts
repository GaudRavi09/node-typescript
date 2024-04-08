import { Router } from "express";
import { UserRoute } from "./user.route";

export class Routes {
    public router: Router = Router();
    
    // routes instances
    private userRoutes: UserRoute = new UserRoute();
    

    constructor(){
        this.router.use("/user", this.userRoutes.router);
    }
}