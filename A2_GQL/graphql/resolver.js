const db = require("../models");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const NEW_REVIEW = "NEW_REVIEW";

var resolver = {
  // Query Operations
  users: async () => {
    return await db.Users.findAll({ include: [{ model: db.Reviews, as: "Reviews" }, { model: db.Orders, as: "Orders" }] });
  },
  user: async (args) => {
    return await db.Users.findOne({
      where: { email: args.email },
      include: [{ model: db.Reviews, as: "Reviews" }, { model: db.Orders, as: "Orders" }]
    });
  },
  reviews: async () => {
    return await db.Reviews.findAll({ include: [{ model: db.Users, as: "User" }, { model: db.Products, as: "Product" }] });
  },
  review: async (args) => {
    return await db.Reviews.findOne({
      where: { id: args.id },
      include: [{ model: db.Users, as: "User" }, { model: db.Products, as: "Product" }]
    });
  },
  products: async () => {
    return await db.Products.findAll({ include: { model: db.Reviews, as: "Reviews" } });
  },
  product: async (args) => {
    return await db.Products.findOne({
      where: { id: args.id },
      include: { model: db.Reviews, as: "Reviews" }
    });
  },
  orders: async () => {
    return await db.Orders.findAll({ include: [{ model: db.Users, as: "User" }, { model: db.OrderProducts, as: "OrderProducts" }] });
  },
  order: async (args) => {
    return await db.Orders.findOne({
      where: { OrderId: args.id },
      include: [{ model: db.OrderProducts, as: "OrderProducts" }, { model: db.Users, as: "User" }]
    });
  },
  orderProducts: async () => {
    return await db.OrderProducts.findAll({ include: [{ model: db.Orders, as: "Order" }, { model: db.Products, as: "Product" }] });
  },
  orderProduct: async (args) => {
    return await db.OrderProducts.findOne({
      where: { id: args.id },
      include: [{ model: db.Orders, as: "Order" }, { model: db.Products, as: "Product" }]
    });
  },


  // Mutations
  toggle_block_user: async (args) => {
    const user = await db.Users.findByPk(args.email);

    if (user === null)
      return false;

    user.blocked = !user.blocked;
    await user.save();

    return true;
  },
  create_product: async (args) => {
    try {
      const newProduct = await db.Products.create(args.input);
      return newProduct;
    } catch (error) {
      return error;
    }
  },
  update_product: async (args) => {
    try {
      const productId = args.id;
      const product = await db.Products.findByPk(productId);
      product.name = args.input.name;
      product.img = args.input.img;
      product.price = args.input.price;
      product.qty = args.input.qty;
      product.special = args.input.special;

      await product.save();
      return product;
    } catch (error) {
      return error;
    }
  },
  delete_product: async (args) => {
    const product = await db.Products.findByPk(args.id);
    if (product) {
      await product.destroy();
      return true;
    } else {
      return false;
    }
  },
  toggle_review_state: async (args) => {
    const review = await db.Reviews.findByPk(args.id);

    if (review === null)
      return false;

    review.deleted = !review.deleted;
    await review.save();

    return true;
  },
  // Subscription Resolvers
  newReview: {
    subscribe: () => pubsub.asyncIterator([NEW_REVIEW])
  }
};

// Publish new review when created
const createReview = async (args) => {
  const newReview = await db.Reviews.create(args.input);
  pubsub.publish(NEW_REVIEW, { reviewAdded: newReview });
  return newReview;
};

module.exports = resolver;