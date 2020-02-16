import * as Mongoose from "mongoose";

const noteSchema: Mongoose.Schema = new Mongoose.Schema({
  medecin: String,
  user: String,
  content: String,
  createdAt: Date
});

export interface INote extends Mongoose.Document {
  medecin?: string;
  user?: string;
  content?: string;
  createdAt?: Date;
}

export default Mongoose.model<INote>("Note", noteSchema);
