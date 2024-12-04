export const createNotification = async (message) => {
    try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/seller/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create notification');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
}; 