import { Router } from "express";

const router = Router();
import user from "../../../models/user.model";
import note from "../../../models/note.model";

router.get("/patients", async (req, res) => {
  const patients = await user.find({ _id: { $in: [req.body.patients] } });
  res.status(200).send(patients);
});

router.get("/notes", async (req, res) => {
  const notes = await note.find({
    medecin: req.body._id,
    user: req.body.user
  });
  res.status(200).send(notes);
});

router.post("/sendnote", async (req, res) => {
  const newnote = new note({
    user: req.body.user,
    content: req.body.content,
    createdAt: req.body.createdAt
  });
  await newnote.save();
  res.status(201).send(note);
});

export default router;
