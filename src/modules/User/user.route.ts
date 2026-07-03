import {  NextFunction, Request, Response, Router } from "express";
import httpStatus from "http-status";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middlewere/auth";

const router = Router();

router.post("/register", userController.registerUser)

// const auth = (...requiredRoles: Role[]) => {
//     return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const authHeader = req.headers.authorization;


//         const token = req.cookies.accessToken ?
//         req.cookies.accessToken


//          : 
//          req.headers.authorization?.startsWith("Bearer ") ? 
//          req.headers.authorization?.split(" ")[1] 
//          :req.headers.authorization;



//         if (!token) {
//             throw new Error("You are not logged in. Please log in to access this resource");
//         }

//         const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

//         if (!verifiedToken.success) {
//             throw new Error(verifiedToken.error);
//         }

//         const { email, name, id, role } = verifiedToken.data as JwtPayload;

//         if (requiredRoles.length && !requiredRoles.includes(role as Role)) {
//             throw new Error("Forbidden. You don't have permission to access this resource");
//         }

//         const user = await prisma.user.findUnique({
//             where: {
//                 id,
//                 email,
//                 name,
//                 role: role as Role
//             }
//         });

//         if (!user) {
//             throw new Error("User not found. Please log in again");
//         }
        
//         if (user.activeStatus === "BLOCKED") {
//             throw new Error("Your account is blocked , please contact to support");
//         }


//         req.user = {
//             email,
//             name,
//             id,
//             role
//         };

//         next();
//     });
// };

router.get("/me",
    
    
//     (req :Request, res:Response, next :NextFunction)=>{

//     console.log(req.cookies);

    
//         const {accessToken} = req.cookies
//         console.log(accessToken);
    
    
//         const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
     
//         if(!verifiedToken.success){
//             throw new Error (verifiedToken.error)
//         }
    
//         // if (typeof verifiedToken === "string"){
//         //     throw new Error (verifiedToken)
//         // }

        
//         const {email, name, id, role} = verifiedToken.data as JwtPayload

        
//         // const requiredRoles = ["ADMIN", "USER", "AUTHOR"]

        
//         const requiredRoles = [Role.ADMIN, Role.USER, Role.AUTHOR]



//         if (!requiredRoles.includes(role)){
//             return res.status(403).json({
//                 success : false,
//                 statusCode : httpStatus.FORBIDDEN,
//                 message :"Forbidden. You don't have permission to access this resource"
//             })
//         }

//         req.user = {
//             email,
//             name,
//             id,
//             role
//         }


    

//     next()
//     // res.status(200).json({
//     //     success : true,
//     //     statusCode :200,
//     //     message : "User profile retrieved successfully",
//     // })
// },

auth( Role.ADMIN, Role.USER, Role.AUTHOR),

userController.getMyProfile)

router.put("/my-profile", auth(Role.ADMIN, Role.USER, Role.AUTHOR),
userController.updateMyProfile )


export const userRouters = router;
 