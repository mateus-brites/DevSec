
import { AppError } from "@/error/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";




export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;


    if(!authToken) {
        throw new AppError("Token is missing!", 401);
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub: user_id } = verify(token, "6eb51784aeb24e7fed5ce4fe9f27b0bd");

        if(!user_id) {
            throw new AppError('user unauthorized')
        }

        return next();
    } catch(err) {
        console.log(err)
        throw new AppError("Token is invalid!", 401);
    }
}