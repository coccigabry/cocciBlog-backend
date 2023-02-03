import express from "express";
import { registerCtrl, loginCtrl, logoutCtrl } from "../controllers/auth.js";


const router = express.Router()

router.post('/register', registerCtrl)
router.post('/login', loginCtrl)
router.post('/logout', logoutCtrl)


export default router