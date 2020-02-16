import { Router } from "express";
import graphQLRouter from "./graphql.router";
import uploadRouter from "./upload.router";
import patientRouter from "./patient.router";
import medecinRouter from "./medecin.router";
const router = Router();

router.use("/graphql", graphQLRouter);
router.use("/upload", uploadRouter);
router.use("/patient", patientRouter);
router.use("/medecin", medecinRouter);

export default router;
