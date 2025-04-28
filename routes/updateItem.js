const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

// PUT /api/items/:id - Actualizar un item
router.put('/:id', (req, res) => {
    const { name, description, rarity, type } = req.body;
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }

    items[itemIndex] = {
        ...items[itemIndex],
        name: name || items[itemIndex].name,
        description: description || items[itemIndex].description,
        rarity: rarity || items[itemIndex].rarity,
        type: type || items[itemIndex].type,
        updatedAt: new Date()
    };

    res.json(items[itemIndex]);
});

module.exports = router; 