const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

// POST /api/items - Crear un nuevo item
router.post('/', (req, res) => {
    const { name, description, rarity, type } = req.body;
    
    if (!name || !description || !rarity || !type) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newItem = {
        id: items.length + 1,
        name,
        description,
        rarity,
        type,
        createdAt: new Date()
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router; 