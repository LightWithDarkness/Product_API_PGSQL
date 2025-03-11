import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/signOut', signOut);

export default router;