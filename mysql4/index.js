// index.js
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import produtoRoutes from './routes/produtoRoutes.js'; // Import your product routes
import faleRoutes from './routes/faleRoutes.js'; // Import your faleConosco routes
const app = express();

// Configure Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {}
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- ROUTES ---
// Mount the routes under the /produtos ou /fale  path
app.use('/produtos', produtoRoutes);
app.use('/fale', faleRoutes);

// Simple home route (if you still want one)
app.get('/', (req, res) => {
    res.redirect('/produtos');
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});