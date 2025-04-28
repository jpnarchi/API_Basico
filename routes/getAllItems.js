const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

// GET /api/items - Obtener todos los items
router.get('/', (req, res) => {
    res.json(items);
});

module.exports = router; 