import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import moment from 'moment';

import { BadRequestError, NotFoundError } from "../errors/index.js";
import Product from "../models/Product.js";
import checkPermission from "../utils/checkPermission.js";

export const getAllProducts = async (req, res) => {
  const {search, productStatus, productType, sort} = req.query
  
  const queryOptions = {
    createdBy: req.user.userId 
  }

  if(search){
    queryOptions.name = {$regex: search , $options: 'i'}
  }

  if(productStatus && productStatus !== 'all'){
    queryOptions.status = productStatus;
  }

  if(productType && productType !== 'all'){
    queryOptions.type = productType;
  }
  
  let result = Product.find(queryOptions);

  if(sort === 'latest'){
    result = result.sort('-createdAt')
  }

  if(sort === 'oldest'){
    result = result.sort('createdAt')
  }

  if(sort === 'a-z'){
    result = result.sort('name')
  }

  if(sort === 'z-a'){
    result = result.sort('-name')
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit

  result.skip(skip).limit(limit);

  
  const products = await result;
  const totalProducts = await Product.countDocuments(queryOptions);
  const numOfPages = Math.ceil(totalProducts/limit)
  res
    .status(StatusCodes.OK)
    .json({ products, totalProducts, numOfPages });
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  const newProduct = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const { productName, productImage, productPrice, type, status } = req.body;

  if (!productName || !productImage || !productPrice) {
    throw new BadRequestError("Please provide all values");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new NotFoundError("Product not found with id:" + productId);
  }

  //   check permission

  checkPermission(req.user, product.createdBy);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    {
      name: productName,
      image: productImage,
      price: productPrice,
      type,
      status,
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new NotFoundError("Product not found with id:" + productId);
  }

  //   check permission

  checkPermission(req.user, product.createdBy);

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Product removed successfully" });
};

export const showStatus = async (req, res) => {
  let status = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  status = status.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStatus = {
    delivering: status.Delivering || 0,
    delivered: status.Delivered || 0,
    cancelled: status.Cancelled || 0,
  };

  let monthlyApplications = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 }
      },
    },{$sort: {'_id.year': -1, '_id.month': -1}},{$limit: 8}
  ]);

  monthlyApplications = monthlyApplications.map(item => {
    
    const {_id: {year, month}, count}= item;
    
    const date = moment().month(month - 1).year(year).format('MMM Y');

    return {date, count}

  }).reverse();

  res.status(StatusCodes.OK).json({ defaultStatus, monthlyApplications });
};
