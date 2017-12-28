import * as mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', index: true }],
  create_date: Date
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
