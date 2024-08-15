import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      _id
      name
      username
      password
      gender
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      username
      password
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
