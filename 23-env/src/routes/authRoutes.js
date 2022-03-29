const BaseRoute = require("./base/baseRoute");
const Joi = require('joi');
const PasswordHelper = require('./../helpers/passwordHelper');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');
const failAction = (request, headers, erro) => {
  throw erro;
}

class AuthRoutes extends BaseRoute {
  constructor(secret,db) {
    super();
    this.secret = secret
    this.db = db;
  }
  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth : false,
        tags: ['api'],
        description: 'Obter token',
        notes: 'Faz login com user e senha do banco',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
          })
        }
      },
      handler: async (request) => {
        try {
          const { username, password } = request.payload;
          const [usuario] = await this.db.read({
            username : username
          });
          if(!usuario){
            return Boom.unauthorized('O Usuário não existe!');
          }
          const match = await PasswordHelper.comparePassword(password,usuario.password);
          if(!match){
            return Boom.unauthorized('O usuario ou senha invalidos!');
          }
          const token = Jwt.sign({
            username : username,
            id : usuario.id
          },this.secret);

          return {
            token
          }
        } catch (error) {
          return Boom.internal();
        }
      }
    }
  }
}

module.exports = AuthRoutes;