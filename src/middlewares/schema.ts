import Joi from "joi";

const authSignup = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const authSignin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const productCreatial = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
});

const productUpdate = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
  description: Joi.string(),
});
const addProduct = Joi.object({
  quantity: Joi.number().integer().positive().required(),
  id: Joi.number().integer().required(),
});
export default {
  authSignin,
  authSignup,
  productCreatial,
  productUpdate,
  addProduct,
};
