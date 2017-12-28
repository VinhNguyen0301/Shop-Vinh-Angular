import Product from '../models/product';
import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
  model = Order;

  // Override get all
  getAll = (req, res) => {
    Order.find().populate('products').exec(function (err, docs) {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  // Override insert
  insert = (req, res) => {
    var datetime = new Date();
    const order = new Order();
    order.create_date = datetime;
    order.products = req.body.products;
    order.save((err, item) => {
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }
}
