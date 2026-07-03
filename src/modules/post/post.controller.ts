import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse "
import httpStatus from "http-status-codes"


const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.user?.id

    const payload = req.body

    const result = await postService.createPost(payload, id as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: result
    })
})

const getAllPosts =catchAsync (async (req: Request, res: Response,  next: NextFunction) => {
    const result = await postService.getAllPost()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts fetched successfully",
        data: result
    })
})

const getPostById =catchAsync (async (req: Request, res: Response,  next: NextFunction) => {
    const postId = req.params.postId

    if(!postId){
        throw new Error("Post ID is required in the request parameters")
    }

    const result = await postService.getPostByID(postId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post fetched successfully",
        data: result
    })
})

const updatePost =catchAsync (async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN"
    const postId = req.params.postId
    const payload = req.body
    
    const result = await postService.updatePost(postId as string, payload, authorId as string, isAdmin as boolean )  //isAdmin as boolean


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post updated successfully",
        data: result
    })
})

const deletePost =catchAsync (async (req: Request, res: Response,  next: NextFunction) => {
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN"


    if (!req.params.postId) {
        throw new Error("Post ID is required in the request parameters")
    }
    const postId = req.params.postId

    await postService.deletePost(postId as string, authorId as string, isAdmin as boolean)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted successfully",
        data: null
    })
})

const getPostsStats =catchAsync( async (req: Request, res: Response,  next: NextFunction) => {

    const result = await postService.getPostsStats()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts stats retrieved successfully",
        data: result
    })
})

const getMyPosts =catchAsync (async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id 

    const result = await postService.getMyPosts(authorId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My posts fetched successfully",
        data: result
    })
})

export const postController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsStats,
    getMyPosts
}