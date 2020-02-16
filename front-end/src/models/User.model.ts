export interface IUser {
  _id?: string;
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
