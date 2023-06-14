const { ApolloServer, gql } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
import { RandomWeatherAPI } from "./datasources/weather-api";

// const typeDefs = require("./schema");
const typeDefs = gql`
  type Headline {
    Severity: String
    Text: String
    EndEpochDate: String
  }

  type Query {
    randomWeather: [Headline!]!
  }
`;
// const resolvers = require("./resolvers");
// const WeatherAPI = require("./datasources/weather-api");

const resolvers = {
  Query: {
    randomPerson: async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      return data.results;
    },
    randomWeather: (_, __, { dataSources }) => {
      return dataSources.currentWeatherAPI.getWeather();
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          currentWeatherAPI: new RandomWeatherAPI({ cache }),
        },
      };
    },
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
