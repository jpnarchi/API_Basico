const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

// GET /api/items/:id - Obtener un item por ID
router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(item);
});

module.exports = router; 