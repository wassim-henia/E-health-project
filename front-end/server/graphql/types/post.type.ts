import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const PostType = new GraphQLObjectType({
  name: "post",
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
      },
      user: {
        type: GraphQLString,
      },
      content: {
        type: GraphQLString,
      },
      createdAt: {
        type: GraphQLString,
      },
    };
  },
});

export default PostType;
