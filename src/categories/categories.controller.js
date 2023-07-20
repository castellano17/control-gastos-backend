const Category = require("../models/category.models");

const uuid = require("uuid");

const findAllCategories = async (limit, offset) => {
  const categories = await Category.findAndCountAll({
    limit: limit,
    offset: offset,
    attributes: {
      exclude: ["updatedAt"],
    },
  });
  return categories;
};

const findCategoriesById = async (id) => {
  const data = await Category.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return data;
};

const createCategorie = async (categorieObject) => {
  const newCategorie = {
    id: uuid.v4(),
    nameCategory: categorieObject.nameCategory,
  };
  const data = await Category.create(newCategorie);
  return data;
};

const updateCategorie = async (id, categorieObj) => {
  const selectedCategorie = await Category.findOne({
    where: {
      id: id,
    },
  });

  if (!selectedCategorie) return null;

  const modifiedCategorie = await selectedCategorie.update(categorieObj);
  return modifiedCategorie;
};

const deleteCategorie = async (id) => {
  const categorie = await Category.destroy({
    where: {
      id: id,
    },
  });
  return categorie; // 1 || 0
};

module.exports = {
  findAllCategories,
  findCategoriesById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
};
