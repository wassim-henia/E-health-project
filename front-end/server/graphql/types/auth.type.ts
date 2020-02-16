import { GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./user.type";
export default new GraphQLObjectType({
  name: "auth",
  fields: () => {
    return {
      token: {
        type: GraphQLString,
      },
      user: {
        type: UserType,
      },
    };
  },
});
