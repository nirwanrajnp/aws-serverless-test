import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import { returnResponse } from './return';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

interface WeatherResponse {
  lon: number;
  lat: number;
  main: string;
  description: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export const myhandler: APIGatewayProxyHandler = async (event) => {
  const { queryStringParameters } = event;
  const { postcode, countryCode } = queryStringParameters;

  if (!postcode || !countryCode) {
    return returnResponse({ statusCode: 400, body: 'Missing postcode or country code' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postcode},${countryCode}&appid=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;

    const weatherData: WeatherResponse = {
      lon: data.coord.lon,
      lat: data.coord.lat,
      main: data.weather[0].main,
      description: data.weather[0].description,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    };

    return returnResponse({ statusCode: 200, body: JSON.stringify(weatherData) });
  } catch (error) {
    return returnResponse({ statusCode: error.response.status, body: error.message });
  }
};

export const handler = myhandler;
