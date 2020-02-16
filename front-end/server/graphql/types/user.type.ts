import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from "graphql";

const UserType: any = new GraphQLObjectType({
  name: "user",
  fields: () => {
    return {
      _id: {
        type: GraphQLID
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      birthday: {
        type: GraphQLString
      },
      gender: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      role: {
        type: GraphQLString
      },
      patients: {
        type: new GraphQLList(UserType)
      },
      salt: {
        type: GraphQLString
      }
    };
  }
});

export default UserType;
