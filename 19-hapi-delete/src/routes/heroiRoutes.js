const BaseRoute = require("./base/baseRoute");
const Joi = require('joi');
const Boom = require('boom');

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
          return Boom.internal();
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
            nome: Joi.string().min(3).max(100).required(),
            poder: Joi.string().min(3).max(100).required()
          })
        }
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id
          }
        } catch (error) {
          return Boom.internal();
        }
      }
    }
  }
  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        validate: {
          params: Joi.object({
            id: Joi.string().required()
          }),
          payload: Joi.object({
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(3).max(100)
          })

        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dataString = JSON.stringify(payload);
          const data = JSON.parse(dataString);
          const result = await this.db.update(id, data);
          if (result.modifiedCount !== 1) return Boom.preconditionFailed('Não encontrado no banco!');
          return {
            message: 'Heroi atualizado com sucesso!'
          };
        } catch (error) {
          return Boom.internal();
        }
      }
    }
  }
  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      config: {
        validate: {
          params: Joi.object({
            id: Joi.string().required()
          })
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          if (result.deletedCount !== 1) return Boom.preconditionFailed('ID Não encontrado no banco!');
          return {
            message: 'Heroi removido com sucesso!'
          }
        } catch (error) {
          return Boom.internal();
        }
      }
    }
  }
}
module.exports = HeroRoute;