// routes/faleRoutes.js
import express from 'express';
import faleController from '../controllers/faleController.js'; // Import the controller

const router = express.Router();

// Route for displaying the "Fale Conosco" form
// This will be accessible at /faleconosco/new
router.get('/new', faleController.showFormFaleConosco);

// Route for handling the submission of the "Fale Conosco" form
// This will handle POST requests to /faleconosco/new
router.post('/new', faleController.addNewMensagem);

export default router;