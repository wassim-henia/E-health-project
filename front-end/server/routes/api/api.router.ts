import { Router } from "express";

import v1Router from "./v1/main.router";

const router = Router();

router.use("/v1", v1Router);

export default router;
