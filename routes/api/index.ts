import { Router } from "express";
import thoughtRoutes from "./thoughtRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

export default router;
