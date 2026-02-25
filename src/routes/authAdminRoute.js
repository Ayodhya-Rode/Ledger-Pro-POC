import express from "express";
import { adminRegisterController, adminLoginController,adminRefreshController,logoutController } from "../controllers/authAdminController.js";

const router = express.Router();
 

router.post("/register", adminRegisterController)
router.post("/login", adminLoginController)
router.post("/refresh", adminRefreshController)
router.post("/logout", logoutController)

export default router