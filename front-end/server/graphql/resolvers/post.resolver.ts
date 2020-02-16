import PostType from "../types/post.type";
import post from "../../models/post.model";
import { GraphQLList, GraphQLString } from "graphql";
export const Queries = {
  allPosts: {
    type: new GraphQLList(PostType),
    args: { user: { type: GraphQLString } },
    resolve: async (obj: any, args: any) => {
      const query = Object.assign({}, args);
      const posts = JSON.parse(JSON.stringify(await post.find(query)));
      posts.reverse();
      return posts;
    }
  }
};

export const Mutations = {
  insertPost: {
    type: PostType,
    args: {
      user: { name: "user", type: GraphQLString },
      content: { name: "content", type: GraphQLString },
      createdAt: { name: "createdAt", type: GraphQLString }
    },
    resolve: async (obj: any, args: any) => {
      const newpost = new post({
        user: args.user,
        content: args.content,
        createdAt: args.createdAt
      });
      return JSON.parse(JSON.stringify(await newpost.save()));
    }
  }
};
