import { Response } from "express";

interface ResponseData {
    success: boolean;
    message: string;
    data?: any;
}

export class HttpStatus {
    private sendResponse(res: Response, status: number, message: string, data?: any) {
        const responseData: ResponseData = {
            success: status >= 200 && status < 300,
            message,
            data
        };

        res.status(status).json(responseData);
    }

    successResponse(res: Response, message: string, data?: any) {
        this.sendResponse(res, 200, message, data);
    }

    badRequestResponse(res: Response, message?: string, data?: any) {
        this.sendResponse(res, 400, message || "Something went wrong, please try again later.", data);
    }

    invalidTokenResponse(res: Response, message?: string, data?: any) {
        this.sendResponse(res, 401, message || "Invalid Token!", data);
    }

    recordCreatedResponse(res: Response, message: string, data?: any) {
        this.sendResponse(res, 201, message, data);
    }

    unauthorizedResponse(res: Response, message: string, data?: any) {
        this.sendResponse(res, 403, message, data);
    }
}