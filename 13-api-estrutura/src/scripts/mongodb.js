// docker ps
// docker exec -it  mongodb mongo -u keven -p 123456 --authenticationDatabase herois

//Mostrar databases
showdbs
// mudando o contexto para uma database
use herois
//Mostra coleções
show collections 

db.herois.insert({
  nome : 'Flash',
  poder : 'Velocidade',
  dataNascimento : '1998-01-01'
})

for(let i = 0; i<= 20000; i++){
  db.herois.insert({
    nome : `Clone-${i}`,
    poder : 'Velocidade',
    dataNascimento : '1998-01-01'
  })
}
db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome : -1})
db.herois.find({}, {poder : 1, _id :0})

//create
db.herois.insert({
  nome : `Clone-${i}`,
  poder : 'Velocidade',
  dataNascimento : '1998-01-01'
})
//read
db.herois.find()

// uppdate
db.herois.update({_id : ObjectId("623b4acc53f846e32d697bb6")},{
  nome : 'Mulher Maravilha'
})

db.herois.update({_id : ObjectId("623b4b4253f846e32d697bc0")},{
  $set : {nome : 'Mulher Maravilha'}
})
