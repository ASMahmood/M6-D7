const express = require("express");
const Model = require("../../utilities/model");
const Articles = new Model("articles");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const singleArticle = await Articles.findById(req.params.id);
    res.send(singleArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
