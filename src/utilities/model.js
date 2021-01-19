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

  //GET BY ID METHOD
  async findById(id) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  //PUT METHOD
  async findByIdAndUpdate(id, body) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const entries = Object.entries(body);
    const query = `UPDATE ${this.name} SET ${entries.map(
      (entry) => `${entry[0]}='${entry[1]}'`
    )}  WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  //POST METHOD
  async save(body) {
    if (!body) {
      throw new Error("Oi! Give us a body, you scallywag!");
    }
    const entries = Object.entries(body);
    const query = `INSERT INTO ${this.name} (${entries.map(
      (entry) => entry[0]
    )}) VALUES(${entries.map((entry) => `'${entry[1]}'`)})`;
    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;
