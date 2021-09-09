const { VacinasModel } = require("../models");
const {UsuarioModel} = require("../models")
const { Token } = require("../utils");
const { generateToken } = Token;
const { getToken } = require("../middlewares");

class VacinasController {
    async create(req, res) {
      if (UsuarioModel.perfil == "admin"){
        let { nomevacina } = req.body;
        nomevacina = (nomevacina || "").toString().trim();
        if (nomevacina === "") {
            return res
              .status(400)
              .json({ error: ["Forneça o nome da vacina para a realização do cadastro"] });
        }
      }
      else{
        return res
        .status(400)
        .json({ error: ["Você não tem permisão para essa solicitação"] });
      }
      
    return await VacinasModel.create({ nomevacina })
      .then(async (r) => {
        const { idvacina, nomevacina} = r.get();
        return res.status(200).json({ idvacina, nomevacina});
      })
      .catch((err) => {
        try {
          return res.status(400).json({
            error: err.errors.map((item) => item.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });
    }
}
module.exports = VacinasController;