const database = require("./database");

class Model {
  constructor(name) {
    this.name = name;
  }

  async run(query) {
    //WE ARE GONNA USE THIS EVERYTIME WE SEND A QUERY TO THE DATABASE
    try {
      const response = await database.query(query);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //GET METHOD
  async findById(id) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;
