import { GraphQLObjectType } from "graphql";
import { Mutations as PostMutations } from "./resolvers/post.resolver";
import { Mutations as AuthMutations } from "./resolvers/auth.resolver";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => Object.assign({}, PostMutations, AuthMutations),
});

export default MutationType;
