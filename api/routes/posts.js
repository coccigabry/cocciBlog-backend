import express from "express";
import { verifyToken } from '../utilities/verifyToken.js'
import { getPostsCtrl, getPostByIDCtrl, deletePostCtrl, addPostCtrl, updatePostCtrl } from "../controllers/posts.js";


const router = express.Router()

router.get('/', getPostsCtrl)
router.get('/:id', getPostByIDCtrl)

router.post('/', verifyToken, addPostCtrl)

router.delete('/:id', verifyToken, deletePostCtrl)

router.put('/:id ', verifyToken, updatePostCtrl)


export default router