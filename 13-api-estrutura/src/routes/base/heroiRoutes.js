const BaseRoute = require("./baseRoute");

class HeroRoute extends BaseRoute {
  constructor(db) {
    super();
    this.db = db
  }
  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, head) => {
        try {
          let query = {}
          const { nome, skip, limit } = request.query;
          if(nome){
            query.nome = nome
          }
          if(isNaN(limit)){
            throw Error('Type of limit not is Integer')
          }
          if(isNaN(skip)){
            throw Error('Type of skip not is Integer')
          }
          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          return `ERROR`;
        }
      }
    }
  }
}
module.exports = HeroRoute;