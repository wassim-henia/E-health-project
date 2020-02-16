import User from "../models/user.model";
import jwt from "jsonwebtoken";
// @ts-ignore
export default async (req, res, next) => {
  if (req.token) {
    const decoded = jwt.decode(req.token);
    // @ts-ignore
    req.user = await User.findOne({ _id: decoded._id });
  }
  next();
};
