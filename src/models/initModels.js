const Users = require("./users.models");
const Budget = require("./budget.models");
const Expenses = require("./expenses.models");
const Category = require("./category.models");

const initModels = () => {
  //? hasOne // un usuario tiene un post (esos son ejemplos)
  //? hasMany
  //? belongsTo // un usuario pertenece a una publicación
  //? belongsToMany // muchos usuarios pertenecen a muchas publicaciones

  //* Users 1:1 budget

  Users.hasMany(Budget);
  Budget.belongsTo(Users);

  //* gastos 1:M presupuesto
  // cada presupuesto tiene muchos gastos
  Budget.hasMany(Expenses);
  // cada gasto pertenece a un presupuesto
  Expenses.belongsTo(Budget);

  //* gastos 1:M categorias
  Expenses.belongsTo(Category);
  Category.hasMany(Expenses);
};

module.exports = initModels;
