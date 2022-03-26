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
            nome: Joi.string().min(3).max(100).default('')
          })
        }
      },
      handler: (request, head) => {
        try {
          const { nome, skip, limit } = request.query;
          const query = { 
            nome: { 
              '$regex': `.*${nome}*.`
             } };
          return this.db.read({query},skip,limit);
        } catch (error) {
          console.log('DEU MERDA',error)
          return `ERROR`;
        }
      }
    }
  }
}
module.exports = HeroRoute;