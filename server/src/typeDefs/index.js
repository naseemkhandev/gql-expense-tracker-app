import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";
import authTypeDef from "./auth.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([
  userTypeDef,
  transactionTypeDef,
  authTypeDef,
]);

export default mergedTypeDefs;
