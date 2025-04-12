import express from 'express';
import CataUniversal from '../models/CataUniversalModel.js';

const router = express.Router();

router.get("/", (req, res) => {
  CataUniversal.getAllUCatalog((error, data) => {
    if (error) {
      res.status(500).json({ msg: "Error en la consulta", error });
    } else if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "Registro no existe" });
    };
  });
});

// Mostrar registros pr el tipo de catalogo
router.get("/:typeUCat", (req, res) => {
  CataUniversal.getAllUCatalog((error, data) => {
    if (error) {
      res.status(500).json({ msg: "Error en la consulta", error });
    } else if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "Registro no existe" });
    };
  });
});

router.get("/:typeUCat/id", (req, res) => {
  CataUniversal.getAllUCatalog((error, data) => {
    if (error) {
      res.status(500).json({ msg: "Error en la consulta", error });
    } else if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "Registro no existe" });
    };
  });
});

// router.post("/", (req, res) => {
  // let data = {
  //   idCatalogo: null,
  //   tipoCatalogo: req.body.tipoCatalogo,
  //   denominacionCatalogo: req.body.denominacionCatalogo
  // };

//   CataUniversal.updateUCatalog((error, data) => {
//     if (error) {
//       res.status(500).json({ msg: "Error en la consulta", error });
//     } else if (data.length > 0) {
//       res.status(200).json(data);
//     } else {
//       res.status(404).json({ msg: "Registro no existe" });
//     };
//   });
// });

router.put("/", (req, res) => {
  let dataUCatag = {
    idCatalogo: req.body.idCatalogo,
    tipoCatalogo: req.body.tipoCatalogo,
    denominacionCatalogo: req.body.denominacionCatalogo
  };

  CataUniversal.updateUCatalog(dataUCatag, (error, data) => {
    if (data & data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boot: (" });
    };
  });
});

export default router;