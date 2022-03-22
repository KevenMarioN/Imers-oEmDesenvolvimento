class Heroi {

  constructor({nome,poder, id = Date.now()}){
    this.nome = nome,
    this.poder = poder,
    this.id = id
  }
}

module.exports = Heroi;