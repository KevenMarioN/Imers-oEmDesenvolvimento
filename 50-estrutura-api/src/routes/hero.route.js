const express = require('express');
const asyncHandler = require('express-async-handler');
const { query, validationResult, matchedData } = require('express-validator');

const ContextStrategy = require('../db/strategies/base/contextStrategy');
const MongoDb = require('../db/strategies/mongodb');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroiShema');

const route = express.Router();
const connection = MongoDb.connect();
const context = new ContextStrategy(new MongoDb(connection, HeroiSchema));
route.get('/herois',
  query('nome').isString().isLength({ min: 3, max: 100 }).optional(),
  query('skip').isInt().isLength({ min: 0, max: 100 }).default(0).optional(),
  query('limit').isInt().isLength({ min: 1, max: 1000 }).default(10).optional(),
  asyncHandler(async (request, response) => {
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
      return response.status(400).send({ errors: erros.array() });
    }
    let query = {}
    const { nome, skip, limit } = matchedData(request, { locations: ['query'], includeOptionals: true });
    if(nome){
      query.nome = {
        $regex : `.*${nome}*.`
      }
    }
    const data = await context.read(query,skip,limit);
    response.send(data);
  }));

module.exports = route;