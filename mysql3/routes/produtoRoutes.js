// routes/produtoRoutes.js
import express from 'express';
import produtoController from '../controllers/produtoController.js'; // Import the controller

const router = express.Router();

// Product List
router.get('/', produtoController.listAllProducts);

// Add Product Form
router.get('/new', produtoController.showAddForm);

// Add Product Submission
router.post('/new', produtoController.addNewProduct);

// Edit Product Form
router.get('/edit/:id', produtoController.showEditForm);

// Edit Product Submission
router.post('/edit/:id', produtoController.updateProduct);

// Delete Product
router.post('/delete/:id', produtoController.deleteProduct);

export default router;