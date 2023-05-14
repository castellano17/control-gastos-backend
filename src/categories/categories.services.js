const { host } = require("../../config");
const categoryControllers = require("./categories.controller");

const getAllCategorie = (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  categoryControllers
    .findAllCategories(limit, offset)
    .then((data) => {
      const nextPageUrl =
        data.count - offset > limit
          ? `${host}/api/v1/users?limit=${limit}&offset=${offset + limit}`
          : null;
      const prevPageUrl =
        offset - limit >= 0
          ? `${host}/api/v1/users?limit=${limit}&offset=${offset - limit}`
          : null;

      res.status(200).json({
        count: data.count,
        next: nextPageUrl,
        prev: prevPageUrl,
        results: data.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getCategorieById = (req, res) => {
  const id = req.params.id;
  categoryControllers
    .findCategoriesById(id)
    .then((data) => {
      //? En caso de que data no exista (la categoría no exista)
      if (!data) {
        return res
          .status(404)
          .json({ message: `Category with id: ${id}, not found` });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const postNewCategorie = (req, res) => {
  const categorieObj = req.body;
  categoryControllers
    .createCategorie(categorieObj)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const patchCategorie = (req, res) => {
  const id = req.params.id;
  const categorieObj = req.body;

  categoryControllers
    .updateCategorie(id, categorieObj)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Invalid ID" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const deleteCategorie = (req, res) => {
  const id = req.params.id;
  categoryControllers
    .deleteCategorie(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Invalid ID" });
      }
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

module.exports = {
  getAllCategorie,
  getCategorieById,
  postNewCategorie,
  patchCategorie,
  deleteCategorie,
};
