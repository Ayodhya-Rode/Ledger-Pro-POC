import express from "express";
import { createCustomer,deleteCustomer } from "../controllers/customerController.js";
const router = express.Router()


router.post("/add-customer",createCustomer)
router.delete("/delete-customer/:id",deleteCustomer)

export default router