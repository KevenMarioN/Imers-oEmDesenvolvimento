const BaseRoute = require('./base/baseRoute');
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, head) => {
        try {
          const { skip, limit, nome,poder } = request.query;
          if (isNaN(skip) && typeof skip !== 'undefined') {
            throw Error('O tipo do skip deve ser somente número!');
          }
          if (isNaN(limit) && typeof limit !== 'undefined') {
            throw Error('O tipo do limit deve ser somente número!');
          }
          let query = {}
          if(nome){
            query.nome = nome;
          }
          if(poder){
            query.poder = poder;
          }
          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.error('deu ruim', error);
          throw Error("Erro interno no servidor");
        }
      }
    }
  }
  create() {
    return {
      path: '/herois',
      method: 'POST',
      handler: (request, head) => {
        return this.db.create()
      }
    }
  }
}

module.exports = HeroRoutes;