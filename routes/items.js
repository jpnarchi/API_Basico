const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

// GET /api/items - Obtener todos los items
router.get('/', (req, res) => {
    res.json(items);
});

// GET /api/items/:id - Obtener un item por ID
router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(item);
});

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

// DELETE /api/items/:id - Eliminar un item
router.delete('/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }

    items.splice(itemIndex, 1);
    res.status(204).send();
});

module.exports = router; 