import { Router } from "express";
import axios from "axios";
const router = Router();
import scan from "../../../models/scan.model";
const path = require("path");
const fs = require("fs");
import user from "../../../models/user.model";
import webpush from "web-push";
const publicVapidKey =
  "BP6ECLkVS7nq2mlLRU7KnoJXw3rVqQvLk2d2iatz6I1Uq7iWQdF31nICGZwWpsoRlR1Q6x6cTH2uNH2ISlaSn2A";
const privateVapidKey = "H8R86WvyFaMJm-A8Td-hm6f7fmLFnRytmfo832sP4rE";

webpush.setVapidDetails(
  "mailto:someone@example.com",
  publicVapidKey,
  privateVapidKey
);

const cloudinary = require("cloudinary").v2;
const CLOUDINARY_URL =
  "cloudinary://865816661836319:Po4IX1Ofte7_5U_IqK0-IzDyCaQ@ourwebsite";
cloudinary.config({
  cloud_name: "ourwebsite",
  api_key: "865816661836319",
  api_secret: "Po4IX1Ofte7_5U_IqK0-IzDyCaQ"
});

router.post("/", async (req, res) => {
  if (!req.files) return res.status(404).end();
  let filePath = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "/tmp",
    // @ts-ignore
    `${req.files.sampleFile.name}`
  );
  // @ts-ignore
  await req.files.sampleFile.mv(filePath);

  await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "image",
      // @ts-ignore
      public_id: `gallery/${req.files.sampleFile.name}`,
      overwrite: true,
      notification_url: "https://mysite.example.com/notify_endpoint"
    },
    // @ts-ignore
    async (error, result) => {
      console.log(result, error);
      // @ts-ignore
      var newScan = new scan({
        user: req.body.user,
        result: "",
        link: result.secure_url
      });
      await newScan.save();
    }
  );

  fs.unlink(filePath, () => console.log("file deleted"));

  try {
    const response = axios.post("/wassim", { file: req.files.file });
    const updatescan = await scan.find({ user: req.body.user });
    // @ts-ignore
    await updatescan.updateOne({ result: response.result });
    try {
      const payload = JSON.stringify({
        title: "Your scan results are here!",
        // @ts-ignore
        content: response.result
      });
      const foundUser = await user.findOne({
        _id: req.body.user
      });
      // @ts-ignore
      const pushSubscription = foundUser.push;
      console.log(foundUser);
      // @ts-ignore
      webpush.sendNotification(JSON.parse(pushSubscription), payload);
    } catch {
      console.log("nvm");
    }
    // @ts-ignore
    res.status(200).send(response.result);
  } catch {
    res.status(500).end();
  }
});

export default router;
