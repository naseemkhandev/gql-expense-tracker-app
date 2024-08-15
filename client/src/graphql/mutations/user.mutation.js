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
