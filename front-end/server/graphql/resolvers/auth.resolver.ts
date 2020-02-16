import UserType from "../types/user.type";
import user from "../../models/user.model";
import { GraphQLString, GraphQLNonNull } from "graphql";
import jwt from "jsonwebtoken";
import { isNullOrUndefined } from "util";
import Bcrypt from "bcryptjs";
import AuthType from "../types/auth.type";

export const Queries = {
  me: {
    type: UserType,
    args: {},
    resolve: async (obj: any, args: any, { user }: any) => user
  }
};

export const Mutations = {
  login: {
    type: AuthType,
    args: {
      email: { name: "email", type: new GraphQLNonNull(GraphQLString) },
      password: { name: "password", type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (obj: any, args: any) => {
      let foundUser = await user.findOne({ email: args.email });
      if (typeof foundUser === "undefined") throw 404;
      // @ts-ignore
      let verifyPassword = Bcrypt.compareSync(
        args.password,
        // @ts-ignore
        foundUser.password
      );

      if (verifyPassword === false) throw 400;
      // @ts-ignore
      console.log(foundUser.firstName + "wiw");
      // @ts-ignore
      let token = jwt.sign(
        // @ts-ignore
        { _id: foundUser._id },
        "A2E61E6E0BF2D714210272EF208FF6DA5E5B20A0895D7EDAF6F1D0865499C5D53E94A759E5A79F0D120EE12CF721CEE3B55092DB8B79EBB7A3DFDFDA42F89C42"
      );
      return { token, user: foundUser };
    }
  },
  register: {
    type: AuthType,
    args: {
      firstName: { name: "email", type: new GraphQLNonNull(GraphQLString) },
      lastName: { name: "lastname", type: new GraphQLNonNull(GraphQLString) },
      email: { name: "email", type: new GraphQLNonNull(GraphQLString) },
      password: { name: "password", type: new GraphQLNonNull(GraphQLString) },
      birthday: { name: "birthday", type: new GraphQLNonNull(GraphQLString) },
      gender: { name: "gender", type: new GraphQLNonNull(GraphQLString) },
      phone: { name: "phone", type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (obj: any, args: any) => {
      console.log(args.firstName);
      let isEmailUsed = !isNullOrUndefined(
        await user.findOne({ email: args.email })
      );
      if (isEmailUsed) throw 400;
      let salt = Bcrypt.genSaltSync(8);
      args.password = Bcrypt.hashSync(args.password, salt);
      args.salt = salt;

      let newUser = new user({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        birthday: args.birthday,
        gender: args.gender,
        phone: args.phone,
        role: "patient",
        patients: null,
        salt: args.salt
      });
      await newUser.save();
      // @ts-ignore
      newUser = await user.findOne({ email: args.email });

      let token = jwt.sign(
        { _id: newUser._id },
        "A2E61E6E0BF2D714210272EF208FF6DA5E5B20A0895D7EDAF6F1D0865499C5D53E94A759E5A79F0D120EE12CF721CEE3B55092DB8B79EBB7A3DFDFDA42F89C42"
      );
      return { token, user: newUser };
    }
  }
};
