const Order = require('../models/Order');

const orderQueries = {
    ordersGetAll: async () => {
      const orders = await Order.find().populate('user').populate('books.book');
      return orders;
    },
    orderGetOne: async ({ id }) => {
      const order = await Order.findById(id).populate('user').populate('books.book');
      if (!order) throw new Error('Order not found');
      return order;
    }
  };
  
  const orderMutations = {
        orderCreate: async ({ input }) => {
          const { userId, books, totalPrice } = input;
          const orderCreated = new Order({ user: userId, books, totalPrice });
          
          // Sauvegarde le document dans la base de données
          await orderCreated.save();
      
          // Puis récupère le document et fais les opérations de populate
          const populatedOrder = await Order.findById(orderCreated._id)
            .populate('user')
            .populate('books.book');
          
          return populatedOrder;
        },
    orderUpdate: async ({ id, status }) => {
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('user').populate('books.book');
      if (!order) throw new Error('Order not found');
      return order;
    }
  };
  
  module.exports = { orderQueries, orderMutations };
  