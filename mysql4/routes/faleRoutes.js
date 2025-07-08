// routes/faleRoutes.js
import express from 'express';
import faleController from '../controllers/faleController.js'; // Import the controller

const router = express.Router();

router.get('/new', faleController.showFormFaleConosco);

router.post('/new', faleController.addNewMensagem);

export default router;