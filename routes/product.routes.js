import { Router } from "express";
import { verifyToken } from "../middlewares/verify.token.js";
import { deleteProduct, createProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', verifyToken, createProduct);
router.put('/update/:id', verifyToken, updateProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);


export default router;