const express = require('express');
const router = express.Router();

// Almacenamiento temporal de items
let items = [];

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