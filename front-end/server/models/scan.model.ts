import * as Mongoose from "mongoose";

const ScanSchema: Mongoose.Schema = new Mongoose.Schema({
  user: String,
  result: String,
  link: String,
  createdAt: Date
});

export interface IScan extends Mongoose.Document {
  user?: string;
  result?: string;
  link?: string;
  createdAt?: Date;
}

export default Mongoose.model<IScan>("Scan", ScanSchema);
