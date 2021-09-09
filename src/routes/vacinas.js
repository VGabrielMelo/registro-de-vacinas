const router = require("express").Router();
const {VacinasController} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { create } = new VacinasController();

// curl -X POST -d "nome=Pfizer" http://localhost:1234/atv1/vacinas/create-vacina
router.post("/create-vacina", create);

module.exports = router;