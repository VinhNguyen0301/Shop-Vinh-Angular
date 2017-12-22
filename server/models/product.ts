import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  quantity:String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
