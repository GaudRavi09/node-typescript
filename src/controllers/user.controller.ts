import { User } from "../models/user.model";
import { hashPassword } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { NextFunction, Request, Response } from "express";

export class UserController extends HttpStatus {
    async signUp(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const requestBody: any = req.body;
            requestBody.password = await hashPassword(requestBody.password);

            const existingUser = await User.findOne({
                where: {
                    email: requestBody.email
                }
            });

            if(existingUser) return httpStatus.badRequestResponse(res, "Email address already exist.")

            const result = await User.create(requestBody);
            
            if(result){
                // Create a copy of the user object without the password field
                const userWithoutPassword = { ...result.toJSON() };
                delete userWithoutPassword.password;
                return httpStatus.recordCreatedResponse(res, "User created successfully.",userWithoutPassword)
            }else{
                return httpStatus.badRequestResponse(res, "Unable to create user.")
            }
        } catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }
}