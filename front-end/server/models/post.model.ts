import * as Mongoose from "mongoose";

const PostSchema: Mongoose.Schema = new Mongoose.Schema({
  user: String,
  content: String,
  createdAt: String,
});

export interface IPost extends Mongoose.Document {
  user?: string;
  content?: string;
  createdAt?: string;
}

export default Mongoose.model<IPost>("Post", PostSchema);
