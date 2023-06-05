const { RESTDataSource } = require("@apollo/datasource-rest");

class WeatherAPI extends RESTDataSource {
  // the Catstronauts catalog is hosted on this server
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  //   try {
  ACCU_KEY = "GJKGfMXiYFeHPUV3p3oHc28uvCAEvLTY";
  locationKey = 347936;
  url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${ACCU_KEY}&details=true`;

  // const response = await axios.get(url);
  // const { data } = response;

  // res.status(200).json({ name: data });
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     res.status(500).json({ error: "Error accessing the weather data" });
  //   }

  async getMovie(id) {
    return this.get(`movies/${encodeURIComponent(id)}`);
  }
}

module.exports = WeatherAPI;
