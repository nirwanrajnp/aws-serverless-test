# Serverless Weather API

## Introduction

The solution provided in this document depicts the design and implementation of AWS Lambda function using Serverless Framework.

Input: Lambda function takes a postcode and country code.
Output: Current weather information using OpenWeatherMap API.

## Implementation

### Lambda Function

I have used the boilerplate provided, therefore, the Lambda function's main entry point is in the src/handlers/weather.ts file, where the handler function is exported. The handler function makes use of the axios library to fetch weather data from the OpenWeatherMap API. The input is validated to ensure that the required parameters (postcode and country code) are provided.
The API key for the OpenWeatherMap API is stored in the .env file.
The Lambda function returns the weather data in the specified format, fetching only the required fields from the OpenWeatherMap API response.

### Error Handling

The solution includes input validation, which checks if the required input parameters are provided. If the input validation fails, the Lambda function returns a 400 error with a relevant error message.
Additionally, if there's an issue with the OpenWeatherMap API request for eg: an invalid API key, the Lambda function returns a 401 Unauthorized error. Other unexpected errors are caught and returned with a 500 Internal Server Error.

### API Gateway

The AWS API Gateway is used to expose the Lambda function as a RESTful API. The API Gateway is configured in the serverless.yml file, along with the Lambda function. The API Gateway is set up with a GET method that maps to the Lambda function and takes the required query parameters.

### Security

To secure the API, an API key is required for access is configured in the serverless.yml file and passed as a header (x-api-key) when making requests. The API key provides a basic level of security by ensuring only authorized clients with the correct key can access the API. On deploying the function, it will provide the generated api key that will be used to access the api.

## Future Improvements

- Monitoring and logging: Set up monitoring and logging using AWS services like Amazon CloudWatch, AWS X-Ray, and AWS Lambda insights to gain insights into the performance and usage of the Lambda function and API Gateway.

- Unit and integration testing: Write more comprehensive tests using Jest to cover various edge cases and ensure that the Lambda function works as expected.

- Caching: Implement caching using AWS services like API Gateway caching or AWS ElastiCache to cache responses and reduce the number of requests made to the OpenWeatherMap API, improving performance and reducing costs.
