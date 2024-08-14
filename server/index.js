import express from "express";
import http from "http";
import cors from "cors";
import colors from "colors";

import session from "express-session";
import connectMongo from "connect-mongodb-session";
import passport from "passport";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";

import { config } from "./src/config/config.js";
import connectToDB from "./src/config/connectToDB.js";

import mergedResolvers from "./src/resolvers/index.js";
import mergedTypeDefs from "./src/typeDefs/index.js";

const startServer = async () => {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const MongoDBStore = connectMongo(session);
    const store = new MongoDBStore({
      uri: config.MONGODB_URI,
      collection: "sessions",
    });

    app.use(
      session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        },
        store,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    const server = new ApolloServer({
      typeDefs: mergedTypeDefs,
      resolvers: mergedResolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
      "/",
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
      }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
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
