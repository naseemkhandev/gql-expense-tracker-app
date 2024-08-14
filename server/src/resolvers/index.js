import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";
import authResolver from "./auth.resolver.js";

const mergedResolvers = mergeResolvers([
  userResolver,
  transactionResolver,
  authResolver,
]);

export default mergedResolvers;
