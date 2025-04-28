const API_URL = 'http://localhost:3000';

// Utility function to log to the console output
function log(message, type = 'info') {
    const consoleOutput = document.getElementById('console-output');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Clear console output
function clearConsole() {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML = '';
}

// Test Items API
async function testItemsAPI() {
    log('Starting Items API tests...', 'info');
    
    // Test creating items
    try {
        const newItems = [
            {
                id: '1',
                name: 'Sword',
                type: 'Weapon',
                effect: 'Damage +10'
            },
            {
                id: '2',
                name: 'Shield',
                type: 'Armor',
                effect: 'Defense +5'
            }
        ];
        
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItems)
        });
        
        const data = await response.json();
        log(`Create items response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error creating items: ${error.message}`, 'error');
    }
    
    // Test getting all items
    try {
        const response = await fetch(`${API_URL}/items`);
        const data = await response.json();
        log(`Get all items response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error getting items: ${error.message}`, 'error');
    }
    
    // Test getting single item
    try {
        const response = await fetch(`${API_URL}/items/1`);
        const data = await response.json();
        log(`Get single item response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error getting single item: ${error.message}`, 'error');
    }
    
    // Test updating item
    try {
        const updateData = {
            name: 'Enhanced Sword',
            effect: 'Damage +15'
        };
        
        const response = await fetch(`${API_URL}/items/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        const data = await response.json();
        log(`Update item response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error updating item: ${error.message}`, 'error');
    }
    
    // Test deleting item
    try {
        const response = await fetch(`${API_URL}/items/2`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        log(`Delete item response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error deleting item: ${error.message}`, 'error');
    }
}

// Test Users API
async function testUsersAPI() {
    log('Starting Users API tests...', 'info');
    
    // Test creating users
    try {
        const newUsers = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                items: ['1']
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                items: []
            }
        ];
        
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUsers)
        });
        
        const data = await response.json();
        log(`Create users response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error creating users: ${error.message}`, 'error');
    }
    
    // Test getting all users
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        log(`Get all users response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error getting users: ${error.message}`, 'error');
    }
    
    // Test getting single user
    try {
        const response = await fetch(`${API_URL}/users/1`);
        const data = await response.json();
        log(`Get single user response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error getting single user: ${error.message}`, 'error');
    }
    
    // Test updating user
    try {
        const updateData = {
            name: 'John Updated',
            items: ['1']
        };
        
        const response = await fetch(`${API_URL}/users/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        const data = await response.json();
        log(`Update user response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error updating user: ${error.message}`, 'error');
    }
    
    // Test deleting user
    try {
        const response = await fetch(`${API_URL}/users/2`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        log(`Delete user response: ${JSON.stringify(data, null, 2)}`, 'success');
    } catch (error) {
        log(`Error deleting user: ${error.message}`, 'error');
    }
}

// Run all tests
async function runAllTests() {
    clearConsole();
    log('Starting API tests...', 'info');
    await testItemsAPI();
    await testUsersAPI();
    log('All tests completed!', 'success');
} 