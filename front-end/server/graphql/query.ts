import { GraphQLObjectType } from "graphql";
import { Queries as PostQueries } from "./resolvers/post.resolver";
import { Queries as AuthQueries } from "./resolvers/auth.resolver";
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => Object.assign({}, PostQueries, AuthQueries),
});

export default QueryType;
