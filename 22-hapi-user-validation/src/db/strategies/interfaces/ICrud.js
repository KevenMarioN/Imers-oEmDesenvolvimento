class NotImplementedException extends Error {
  constructor() {
    super("Not implemented Exception")
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedException()
  }
  read(query) {
    throw new NotImplementedException()
  }
  update(id, item,upsert) {
    throw new NotImplementedException()
  }
  delete(id) {
    throw new NotImplementedException()
  }
  IsConnected() {
    throw new NotImplementedException()
  }
  connect() {
    throw new NotImplementedException()
  }
  disconnect() {
    throw new NotImplementedException()
  }
}

module.exports = ICrud 