import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data structures
const items = [];
const users = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/html/index.html'));
});

// Items routes
app.post('/items', (req, res) => {
    const newItems = Array.isArray(req.body) ? req.body : [req.body];
    
    for (const item of newItems) {
        if (!item.id || !item.name || !item.type || !item.effect) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Item must have id, name, type, and effect'
            });
        }
        
        if (items.some(existingItem => existingItem.id === item.id)) {
            return res.status(400).json({
                error: 'Item already exists',
                message: `Item with ID ${item.id} already exists`
            });
        }
        
        items.push(item);
    }
    
    res.status(201).json({
        message: 'Items added successfully',
        items: newItems
    });
});

app.get('/items', (req, res) => {
    if (items.length === 0) {
        return res.status(404).json({
            message: 'No items found'
        });
    }
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    items.splice(index, 1);
    res.json({
        message: 'Item deleted successfully'
    });
});

app.put('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    
    const updatedItem = { ...items[index], ...req.body };
    items[index] = updatedItem;
    
    res.json({
        message: 'Item updated successfully',
        item: updatedItem
    });
});

// Users routes
app.post('/users', (req, res) => {
    const newUsers = Array.isArray(req.body) ? req.body : [req.body];
    
    for (const user of newUsers) {
        if (!user.id || !user.name || !user.email) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'User must have id, name, and email'
            });
        }
        
        if (users.some(existingUser => existingUser.id === user.id)) {
            return res.status(400).json({
                error: 'User already exists',
                message: `User with ID ${user.id} already exists`
            });
        }
        
        if (user.items) {
            for (const itemId of user.items) {
                if (!items.some(item => item.id === itemId)) {
                    return res.status(400).json({
                        error: 'Invalid item ID',
                        message: `Item with ID ${itemId} does not exist in catalog`
                    });
                }
            }
        }
        
        users.push(user);
    }
    
    res.status(201).json({
        message: 'Users added successfully',
        users: newUsers
    });
});

app.get('/users', (req, res) => {
    if (users.length === 0) {
        return res.status(404).json({
            message: 'No users found'
        });
    }
    
    const usersWithItems = users.map(user => ({
        ...user,
        items: user.items ? user.items.map(itemId => 
            items.find(item => item.id === itemId)
        ).filter(Boolean) : []
    }));
    
    res.json(usersWithItems);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    
    const userWithItems = {
        ...user,
        items: user.items ? user.items.map(itemId => 
            items.find(item => item.id === itemId)
        ).filter(Boolean) : []
    };
    
    res.json(userWithItems);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(user => user.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    users.splice(index, 1);
    res.json({
        message: 'User deleted successfully'
    });
});

app.put('/users/:id', (req, res) => {
    const index = users.findIndex(user => user.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    
    if (req.body.items) {
        for (const itemId of req.body.items) {
            if (!items.some(item => item.id === itemId)) {
                return res.status(400).json({
                    error: 'Invalid item ID',
                    message: `Item with ID ${itemId} does not exist in catalog`
                });
            }
        }
    }
    
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    
    res.json({
        message: 'User updated successfully',
        user: updatedUser
    });
});

// Server startup
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 