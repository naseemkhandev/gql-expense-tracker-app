import express from "express";
import http from "http";
import cors from "cors";
import colors from "colors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { config } from "./src/config/config.js";
import connectToDB from "./src/config/connectToDB.js";

import mergedResolvers from "./src/resolvers/index.js";
import mergedTypeDefs from "./src/typeDefs/index.js";

const startServer = async () => {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs: mergedTypeDefs,
      resolvers: mergedResolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
      "/",
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
      })
    );

    await connectToDB();

    await new Promise((resolve) =>
      httpServer.listen({ port: config.PORT }, resolve)
    );

    console.log(`🚀 Server ready at PORT ${config.PORT}`.bgWhite);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
