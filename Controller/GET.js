'use strict';
const weatherService = require('../Services/WeatherService.js')

const headers = { 'Access-Control-Allow-Origin': `${process.env.ORIGIN_ALLOWED_1}` }

exports.handler = async (event) => {

  try {
    let { lat, lon, city, zip } = event.queryStringParameters;
    let queryParams;

    if (typeof lat == 'number' && typeof lon == 'number') {
      queryParams = { lat, lon }
    } else if (typeof zip == 'number' && zip < 100000 && zip > 0) { 
      queryParams = { zip }
    } else if (typeof city == 'string') {
      queryParams = { city }
    } else {
      return {
        statusCode: 400,
        headers,
        body: 'Invalid Input'
      }
    }

    let weatherResponse = await weatherService.getWeatherAsync(queryParams)

    if (weatherResponse && weatherResponse.weather) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(weatherResponse.weather),
      };
    }
  
    return {
      statusCode: weatherResponse.status,
      headers,
      body: JSON.stringify(weatherResponse.message),
    };
  } catch (err) {
    console.error(err.message)
    return {
      statusCode: 500,
      headers,
      body: 'The server encountered an error',
    };
  }

};
