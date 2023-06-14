import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default client;

// export const { getClient } = registerApolloClient(() => {
//   //   const ACCU_KEY = "GJKGfMXiYFeHPUV3p3oHc28uvCAEvLTY";
//   //   const locationKey = 347936;
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: "https://main--tim-petrvalskys-team-jz4ew.apollographos.net/graphql",
//       //   uri: `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${ACCU_KEY}&details=true`,
//       //   uri: `https://api.spacex.land/graphql/`,
//     }),
//   });
// });
