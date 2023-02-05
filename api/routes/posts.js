import express from "express";
import { getPostsCtrl, getPostByIDCtrl, deletePostCtrl, /* addPostCtrl, updatePostCtrl */ } from "../controllers/posts.js";


const router = express.Router()

router.get('/', getPostsCtrl)
router.get('/:id', getPostByIDCtrl)

//router.post('/', addPostCtrl)

router.delete('/:id', deletePostCtrl)

//router.put('/:id ', updatePostCtrl)


export default router