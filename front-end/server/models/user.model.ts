import Mongoose from "mongoose";

const UserSchema: Mongoose.Schema = new Mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: Date,
  gender: String,
  phone: String,
  role: String,
  push: String,
  patients: { type: Array },
  salt: String
});

export interface IUser extends Mongoose.Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  birthday?: Date;
  gender?: string;
  phone?: string;
  role?: string;
  push?: string;
  patients?: IUser[];
  salt?: string;
}

export default Mongoose.model<IUser>("User", UserSchema);
