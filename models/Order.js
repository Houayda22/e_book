// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ book: { type: Schema.Types.ObjectId, ref: 'Book' }, quantity: Number }],
  totalPrice: Number,
  status: { type: String, default: 'Pending' }
});


module.exports = mongoose.model('Order', orderSchema);
