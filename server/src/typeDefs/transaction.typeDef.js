const transactionTypeDef = `#graphql
   type Transaction {
      id: ID!
      userId: ID!
      description: String!
      paymentType: String!
      category: String!
      amount: Float!
      location: String!
      date: String!
   }

   type Query {
      transactions: [Transaction!]
      transaction(id: ID!): Transaction 
   }

   type Mutation {
      createTransaction(input: CreateTransactionInput!): Transaction!
      updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!
      deleteTransaction(id: ID!): Transaction
   }

   input CreateTransactionInput {
      userId: ID!
      description: String!
      paymentType: String!
      category: String!
      amount: Float!
      location: String!
      date: String!
   }

   input UpdateTransactionInput {
      transactionId: ID! 
      description: String
      paymentType: String
      category: String
      amount: Float
      location: String
      date: String
   } 
`;

export default transactionTypeDef;
