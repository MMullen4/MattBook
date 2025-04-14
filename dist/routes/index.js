import { Router } from "express";
import apiRoutes from "./api";
const router = Router();
// mount API routes
router.use("/api", apiRoutes);
router.use((_req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});
export default router;
