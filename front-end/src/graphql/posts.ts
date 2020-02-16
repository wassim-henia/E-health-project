import gql from "graphql-tag";
import { IPost } from "@/models/Post.model";

export const allPosts = () => {
  return gql`
    query allPosts($user: String) {
      allPosts(user: $user) {
        user
        content
        createdAt
      }
    }
  `;
};
export const insertPost = (post: IPost) => {
  return gql`mutation {insertPost(user:"${post.user}",content:"${post.content}",
  createdAt:"${post.createdAt}"){
    ${`user
    content
    createdAt`}
  }}`;
};
