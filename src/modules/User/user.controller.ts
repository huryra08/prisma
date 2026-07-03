import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatusCode, { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse ";







// const registerUser =  async (req :Request, res : Response) => {

//      try {
//          const payload = req.body;


//     const user = await  userService.registerUserDB(payload);




//     res.status(httpStatusCode.CREATED).json({ 
//         success: true,
//         statusCode: httpStatusCode.CREATED,
//         message: "User registered successfully",
//         data :{ user }
//      });


//      } catch (error) {
//         console.log(error);

//         res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
//             message: "Internal server error",
//             error: error instanceof Error ? error.message : "Unknown error"
//         });
//      }


// }


const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body

    const user = await userService.registerUserDB(payload)


    //   res.status(httpStatusCode.CREATED).json({
    //         success: true,
    //         statusCode: httpStatusCode.CREATED,
    //         message: "User register successfully",
    //        data: {
    //         user
    //        }
    //     });


    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: "User registered successfully",
        data: { user }
    })

})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const {accessToken} = req.cookies
    console.log(req.user, "User request");


    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)


    // if (typeof verifiedToken === "string"){
    //     throw new Error (verifiedToken)
    // }

    const profile = await userService.getMyProfileFromDb(req.user?.id as string)
    // console.log(verifiedToken);


    sendResponse ( res, {
        success : true,
        statusCode : httpStatusCode.OK,
        message : "user profile fetched successfully",
        data : {profile}
    }

    )
    
})

const updateMyProfile = catchAsync(async (req: Request, res:Response, next: NextFunction)=>{

    const userId = req.user?.id as string

    const payload = req.body

    const updatedProfile = await userService.updateMyProfileInDB(userId, payload)



    sendResponse(res, {
        success : true,
        statusCode :httpStatusCode.OK,
        message : "User profile update successfilly",
        data :{updatedProfile}
    })


})




export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile

}