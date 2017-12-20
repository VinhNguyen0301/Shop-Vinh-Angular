import Product from '../models/product';
import Category from '../models/category';
import BaseCtrl from './base';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

  // Override get all
  getAll = (req, res) => {
    Product.find().populate('category').exec(function (err, docs) {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  // Override insert
  insert = (req, res) => {
    Category.findOne({ _id: req.body.category_id }, (err, data) => {
      if (err) { return console.error(err); }
      const product = new Product(req.body)
      product.category = data;
      product.save((err, item) => {
        if (err && err.code === 11000) {
          res.sendStatus(400);
        }
        if (err) {
          return console.error(err);
        }
        res.status(200).json(item);
      });
    });
  }
}
