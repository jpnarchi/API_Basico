const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
const getAllItemsRouter = require('./routes/getAllItems');
const getItemByIdRouter = require('./routes/getItemById');
const createItemRouter = require('./routes/createItem');
const updateItemRouter = require('./routes/updateItem');
const deleteItemRouter = require('./routes/deleteItem');

app.use('/api/items', getAllItemsRouter);
app.use('/api/items', getItemByIdRouter);
app.use('/api/items', createItemRouter);
app.use('/api/items', updateItemRouter);
app.use('/api/items', deleteItemRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});