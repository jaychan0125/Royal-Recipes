const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  recipe: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
