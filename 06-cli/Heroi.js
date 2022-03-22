class Heroi {

  constructor({nome,poder, id = Date.now()}){
    this.nome = nome,
    this.poder = poder,
    this.id = parseInt(id)
  }
}

module.exports = Heroi;