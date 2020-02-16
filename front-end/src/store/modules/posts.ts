import { IPost } from "@/models/Post.model";

const state = { posts: [] };
const getters = {
  // @ts-ignore
  getPosts: state => state.posts,
};

const mutations = {
  // @ts-ignore
  addPost(state, post: IPost) {
    state.posts.push(post);
  },
};

const actions = {};

export default { state, getters, mutations, actions };
