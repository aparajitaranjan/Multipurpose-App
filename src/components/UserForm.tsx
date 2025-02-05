import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
    });
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [generatedId, setGeneratedId] = useState<string | null>(null);

    // Load saved user data from localStorage when component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('user_data');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData(parsedData);
            setGeneratedId(parsedData.id); // Keep track of stored ID
        }
    }, []);

    // Handle unsaved changes on window close or refresh
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (unsavedChanges) {
                e.preventDefault();
                e.returnValue = ''; // Required for Chrome
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [unsavedChanges]);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'phone' && !/^\d*$/.test(value)) return; // Restrict non-numeric input for phone
        setFormData({ ...formData, [name]: value });
        setUnsavedChanges(true);
    };

    // Handle form submission
    const handleSubmit = () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address
        ) {
            alert('Please fill out all fields.');
            return;
        }

        // Generate a unique ID if one doesn't exist
        const userId =
            generatedId ?? `user_${Math.random().toString(36).substr(2, 9)}`;

        // Create a JSON object with user data
        const userData = { id: userId, ...formData };

        // Save the JSON object to local storage
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUnsavedChanges(false);
        setGeneratedId(userId);

        // Log the saved data
        console.log('Saved Data:', userData);

        alert('Your data has been saved successfully!');
    };

    // Handle navigation away from the page
    const handleNavigationAway = () => {
        if (unsavedChanges) setShowDialog(true);
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                User Data Form
            </Typography>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>

            {/* Display Saved ID (if exists) */}
            {generatedId && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    ✅ Your data is saved. You can update it anytime.
                </Typography>
            )}

            {/* Unsaved Changes Warning Dialog */}
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>Unsaved Changes</DialogTitle>
                <DialogContent>
                    You have unsaved changes. Are you sure you want to leave?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setShowDialog(false);
                            window.location.href = '/'; // Can be replaced with React Router navigation
                        }}
                    >
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserForm;
