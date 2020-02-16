import { IUser } from "@/models/User.model";

const state = { user: {}, token: null, isAuthenticated: false };
const getters = {
  // @ts-ignore
  getUser: state => state.user,
  // @ts-ignore
  getToken: state => state.token,
  // @ts-ignore
  isAuthenticated: state => state.isAuthenticated
};

const mutations = {
  // @ts-ignore
  setUser(state, user: IUser) {
    state.user = user;
  },
  // @ts-ignore
  setToken(state, token: string) {
    state.token = token;
  },
  // @ts-ignore
  authenticate(state, auth: boolean) {
    state.isAuthenticated = auth;
  }
};

const actions = {};

export default { state, getters, mutations, actions };
