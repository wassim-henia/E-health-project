import dotenv from "dotenv";
dotenv.config();

import * as path from "path";
import fileUpload from "express-fileupload";
import express from "express";
const app = express();

import user from "./models/user.model";

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 1000000
  })
);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);

import cors from "cors";
app.use(cors());

import apiRouter from "./routes/api/api.router";
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "./public")));

import mongoose from "mongoose";

try {
  // @ts-ignore
  mongoose.connect(
    "mongodb+srv://Baby:misilimi000@cluster-8ce4h.mongodb.net/database?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
} catch {
  console.log(
    "mongodb+srv://Baby:misilimi000@cluster-8ce4h.mongodb.net/database?retryWrites=true"
  );
}

import webpush from "web-push";
const publicVapidKey =
  "BN26aeTelL2mfXmF-iJPk29IGM0Hg7qZeDPiyXslJ0unjxYdqiVxWMjRt63qcIu90rOZ2Cmin0HsxH-xUxj78a8";
const privateVapidKey = "HPf0CISKIHC_lwrUpswn2YENLHOLmb6wJf6zAcgYedc";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", async (req, res) => {
  // Get pushSubscription object
  const subscription = req.body.push;
  console.log(subscription);
  // Send 201 - resource created
  res.status(201).json({});
  const foundUser = await user.findOne({ _id: req.body.user });
  // @ts-ignore
  await foundUser.updateOne({
    push: JSON.stringify(subscription)
  });
  try {
    const payload = JSON.stringify({
      title: "you are now able to receive notifications"
    });
    webpush.sendNotification(subscription, payload);
    console.log("done");
  } catch {
    console.log("aaaaaa");
  }
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () =>
  console.log(`app running on port ${app.get("port")}`)
);
