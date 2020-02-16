import { Router } from "express";
import scan from "../../../models/scan.model";
import user from "../../../models/user.model";
const router = Router();

router.get("/getscans", async (req, res) => {
  let scans = await scan.find({ user: req.body._id });
  res.status(200).send(scans);
});

router.get("/getmedecins", async (req, res) => {
  let medecins = await user.find({ role: "medecin" });
  res.status(200).send(medecins);
});

export default router;
