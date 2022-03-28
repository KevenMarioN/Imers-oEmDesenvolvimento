const BaseRoute = require("./base/baseRoute");
const Joi = require('joi');
class HeroRoute extends BaseRoute {
  constructor(db) {
    super();
    this.db = db
  }
  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        validate: {
          failAction: (request, headers, erro) => {
            throw erro
          },
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100)
          })
        }
      },
      handler: async (request, head) => {
        try {
          const { nome, skip, limit } = request.query;
          const query = {
            nome: {
              '$regex': nome ? `.*${nome}*.` : ``
            }
          };
          return await this.db.read(query, skip, limit);
        } catch (error) {
          console.log('DEU MERDA', error)
          return `ERROR`;
        }
      }
    }
  }
  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        validate: {
          failAction: (request, headers, erro) => {
            throw erro
          },
          payload: Joi.object({
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(3).max(100)
          })
        }
      },
      handler: async (request) => {
        const { nome,poder } = request.payload;
        const result = await this.db.create({nome,poder});
        return {
          message : "Heroi cadastrado com sucesso!",
          _id : result._id
        }
      }
    }
  }
}
module.exports = HeroRoute;