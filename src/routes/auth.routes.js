import { Router } from "express";

import { registeredUser } from "../controllers/auth.controllers";

const router = Router();

router.route("/register").post(registeredUser);

export default router;