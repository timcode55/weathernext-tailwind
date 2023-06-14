import { ApolloServer, gql } from "apollo-server-micro";
import { connectToDatabase } from "./db";
import axios from "axios";

// Import your GraphQL schema
import typeDefs from "./schema.graphql";

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    externalAPIs: () => {
      const { UNSPLASH_KEY } = process.env;
      const randomPage = Math.floor(Math.random() * 10);
      const location = "austin";
      const url = `https://api.unsplash.com/search/photos?page=${randomPage}&query=${location}&orientation=landscape&client_id=${"LyTILpYq9RlxI2Zefq96p9KRqORAkQyQ6cYqjngIUVg"}`;

      const response = axios.get(url);
      const { data } = response;
      // const randomImage = [random].urls.full
      res.status(200).json({ image: data.results[randomPage].urls.full });
      return [];
    },
  },
  Mutation: {
    saveExternalAPI: (_, { input }) => {
      // Implement logic to save data to MongoDB
      return null;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Connect to MongoDB before starting the Apollo Server
connectToDatabase()
  .then(() => {
    apolloServer.listen().then(({ url }) => {
      console.log(`GraphQL server running at ${url}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
