const { buildSchema } = require("graphql")

var schema = buildSchema(`#graphql
    type User {
      name: String,
      email: String,
      password: String,
      blocked: Boolean,
      createdAt: String,
      Reviews: [Review]
      Orders: [Order]
    }

    type Review {
      id: ID,
      rating: Float,
      review: String,
      deleted: Boolean,
      productId: Int,
      userId: String,
      User: User,
      Product: Product
    }

    type Order {
      OrderId: ID,
      userId: String,
      createdAt: String,
      User: User,
      OrderProducts: [OrderProduct]
    }
    
    input ProductInput {
      name: String!,
      img: String!,
      price: Float!,
      qty: Int!,
      special: Boolean!
    }

    type Product {
      id: ID,
      name: String,
      img: String,
      price: Float,
      qty: Int,
      special: Boolean,
      Reviews: [Review]
    }

    type OrderProduct {
      id: ID,
      OrderId: Int,
      productId: Int,
      quantity: Int,
      price: Float,
      Order: Order
      Product: Product
    }
  
    type Query {
      users: [User],
      user(email: String): User,
      reviews: [Review],
      review(id: ID): Review,
      products: [Product],
      product(id: ID): Product,
      orders: [Order],
      order(id: ID): Order,
      orderProducts: [OrderProduct],
      orderProduct(id: ID): OrderProduct
    }
    
    type Mutation {
      toggle_block_user(email: String): Boolean,
      create_product(input: ProductInput): Product,
      update_product(id:ID, input: ProductInput): Product,
      delete_product(id: ID): Boolean,
      toggle_review_state(id: ID): Boolean
    }
  `)

module.exports = schema