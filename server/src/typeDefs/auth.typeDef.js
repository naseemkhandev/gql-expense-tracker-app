const authTypeDef = `#graphql
   type User {
      _id: ID!
      name: String!
      username: String!
      password: String!
      gender: String!
      profilePic: String
   }

   type Mutation {
      register(input: RegisterInput!): User
      login(input: LoginInput!): User
      logout: LogoutResponse
   }

   input RegisterInput {
      name: String!
      username: String!
      password: String!
      gender: String!
   }

   input LoginInput {
      username: String!
      password: String!
   }

   type LogoutResponse {
      message: String!
   }
`;

export default authTypeDef;
