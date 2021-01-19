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
    if (!body || Object.values(search).length === 0) {
      throw new Error("Oi! Give us a body, you scallywag!");
    }
    const entries = Object.entries(body);
    const query = `INSERT INTO ${this.name} (${entries.map(
      (entry) => entry[0]
    )}) VALUES(${entries.map((entry) => `'${entry[1]}'`)})`;
    const response = await this.run(query);
    return response;
  }

  //DELETE METHOD
  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const query = `DELETE FROM ${this.name} WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  //GET ALL METHOD
  async findOne(search) {
    if (!search || Object.values(search).length === 0) {
      //BASIC GET ALL
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response.rows;
    } else {
      const entries = Object.entries(search);
      const query = `SELECT * FROM ${this.name} WHERE ${entries
        .map((entry) => `${entry[0]}='${entry[1]}'`)
        .join(" AND ")}`;
      const response = await this.run(query);
      return response.rows;
    }
  }
}

module.exports = Model;
