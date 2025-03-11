import { customError } from '../utils/custom.error.js';
import client from '../config/db.js';

const getAllProducts = async (req, res, next) => {
  try {
    const result = await client.query('SELECT * FROM products');
    res.status(200).json({ success: true, products: result.rows });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      return next(customError(404, 'Product not found'));
    }
    res.status(200).json({ success: true, product: result.rows[0] });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO products (name, price, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, price, req.user.id]
    );
    res.status(201).json({ success: true, product: result.rows[0] });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    //check if product exist or not

    const product = await client.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (product.rows.length === 0) {
      return next(customError(404, 'Product not found'));
    }

    // Authorization check
    if (product.rows[0].user_id !== req.user.id) {
      return next(customError(403, 'Not Authorized'));
    }

    // Update product
    const updatedProduct = await client.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    return res
      .status(200)
      .json({ success: true, product: updatedProduct.rows[0] });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await client.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (product.rows.length === 0) {
      return next(customError(404, 'Product not found'));
    }

    // Authorization check
    if (product.rows[0].user_id !== req.user.id) {
      return next(customError(403, 'Not Authorized'));
    }

    // Delete product
    await client.query('DELETE FROM products WHERE id = $1', [id]);
    return res
      .status(200)
      .json({ success: true, message: 'Product Deleted Successfully' });
  } catch (error) {
    return next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
