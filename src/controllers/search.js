require("dotenv").config();
const axios = require("axios");
const Joi = require("joi");
const { logger } = require("../utils/logger.util");

const locationSchema = Joi.object({
  location: Joi.string().required(),
  term: Joi.string().valid("pizza", "juice").required(),
});

const API_KEY = process.env.YELP_API_KEY;
const YELP_API_URL = "https://api.yelp.com/v3/businesses/search";

const fetchPlaces = async (term, location) => {
  try {
    const { error } = locationSchema.validate({ location, term });
    if (error) {
      logger.error(`Validation Error: ${error.message}`);
      throw new Error(`Validation Error: ${error.message}`);
    }

    const response = await axios.get(YELP_API_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { term, location, limit: 10 },
    });

    return response.data.businesses.map((b) => ({
      name: b.name,
      address: b.location.address1,
      rating: b.rating,
      phone: b.phone,
    }));
  } catch (error) {
    console.log(error)
    logger.error(`Error fetching ${term} in ${location}: ${error.message}`);
    return [];
  }
};

const searchPizza = async (req, res) => {
  const data = await fetchPlaces("pizza", req.query.location);
  res.json(data);
};

const searchJuice = async (req, res) => {
  const data = await fetchPlaces("juice", req.query.location);
  res.json(data);
};

const searchCombo = async (req, res) => {
  const [pizza, juice] = await Promise.all([fetchPlaces("pizza", req.query.location), fetchPlaces("juice", req.query.location)]);
  res.json([...pizza, ...juice]);
};

module.exports = { fetchPlaces, searchPizza, searchJuice, searchCombo };
