const Category = require("../models/category.models");
const uuid = require("uuid");
const data = [
  {
    id: uuid.v4(),
    nameCategory: "Educación",
  },
  {
    id: uuid.v4(),
    nameCategory: "Salud",
  },
  {
    id: uuid.v4(),
    nameCategory: "Ocio",
  },
  {
    id: uuid.v4(),
    nameCategory: "Casa",
  },
  {
    id: uuid.v4(),
    nameCategory: "comida",
  },
  {
    id: uuid.v4(),
    nameCategory: "Ahorro",
  },
  {
    id: uuid.v4(),
    nameCategory: "Suscripciones",
  },
];
const generateCategorySeed = async () => {
  await Category.bulkCreate(data);
};
generateCategorySeed()
  .then(() => console.log("Category seeders executed succesfully!"))
  .catch((err) => console.log(err));
