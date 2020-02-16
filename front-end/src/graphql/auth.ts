import gql from "graphql-tag";
import { IUser } from "@/models/User.model";

export const register = (user: IUser) => {
  return gql`
    mutation {
      register(
        email: "${user.email}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}",
        password: "${user.password}",
        birthday: "${user.birthday}",
        gender: "${user.gender}",
        phone: "${user.phone}"){

 token,user{
      _id
    firstName
    lastName
    email
    birthday
    gender
    phone
    role
            }
        }
    }
`;
};

export const login = (user: IUser) => {
  return gql`
      mutation {
        login(
          email: "${user.email}",
          password: "${user.password}"){
            token,user{   _id
            firstName
            lastName
            email
            birthday
            phone
            role
            }
          }
      }
  `;
};
export const me = () => {
  return gql`
    {
      me {
        _id
        firstName
        lastName
        email
      }
    }
  `;
};
