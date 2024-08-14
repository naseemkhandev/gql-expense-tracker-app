const userTypeDef = `#graphql
   type User {
      _id: ID!
      name: String!
      username: String!
      password: String!
      gender: String!
      profilePicture: String
   }

   type Query {
      users: [User!]
      user(id: ID!): User
      authUser: User
   }
`;

export default userTypeDef;
