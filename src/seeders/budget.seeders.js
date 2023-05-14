const Budget = require("../models/budget.models");
const uuid = require("uuid");
const data = [
  {
    id: uuid.v4(),
    total: Number(5000),
    userId: "0120e619-3901-440b-a4f9-1e1424fc7e9d",
  },
  {
    id: uuid.v4(),
    total: Number(1000),
    userId: "60852707-7741-4492-b34a-14c25b01af9b",
  },
  {
    id: uuid.v4(),
    total: Number(35500),
    userId: "093f85e8-1e84-4e06-967b-714be18ec5b3",
  },
  {
    id: uuid.v4(),
    total: Number(20000),
    userId: "89c7c7f5-f279-4946-ba79-3dd04f819663",
  },
  {
    id: uuid.v4(),
    total: Number(60000),
    userId: "7a9e8130-1623-40ba-9f41-edf0d4ad2c75",
  },
  {
    id: uuid.v4(),
    total: Number(1250),
    userId: "13b4db9c-3f8d-49ed-b77d-b26743c42053",
  },
];
const generateBudgetSeed = async () => {
  await Budget.bulkCreate(data);
};
generateBudgetSeed()
  .then(() => console.log("Budget seeders executed succesfully!"))
  .catch((err) => console.log(err));
