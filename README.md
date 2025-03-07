# Nearby Shops Service

This project provides a backend service to find nearby pizza and juice shops using Yelp API with both RESTful and GraphQL APIs.

## Table of Contents
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [GraphQL Queries](#graphql-queries)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Logging](#logging)
- [Error Handling](#error-handling)

## Tech Stack
- Node.js
- Express
- Apollo Server (GraphQL)
- Axios
- Winston (Logging)
- Joi (Validation)
- Jest (Testing)

## API Endpoints
### RESTful APIs
| Endpoint           | Method | Description                 | Query Params       |
|-----------------|-------|--------------------------|---------------|
| `/search/pizza` | GET   | List places offering pizza | `location` (required) |
| `/search/juice` | GET   | List places offering juice | `location` (required) |
| `/search/combo` | GET   | List places offering both pizza and juice | `location` (required) |

### Request Example
```bash
GET /search/pizza?location=New+York
