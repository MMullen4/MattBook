import { Router, Request, Response } from "express";
import apiRoutes from "./api/index.js";

const router: Router = Router();

// mount API routes
router.use("/api", apiRoutes);

router.use((_req: Request, res: Response): void => {
  res.status(404).send("<h1>Wrong Route!</h1>");
});

export default router;
